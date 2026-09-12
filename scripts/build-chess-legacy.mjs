// Builds ES5 fallbacks of the chess vendor libs for Safari <= 10.
// three r128 UMD + OrbitControls ship ES6 classes; Babel downlevels them.
// Output is only loaded when window.THREE is missing (see index.html).
// Non-fatal: failures leave the modern files untouched.
import { transformFileSync } from '@babel/core';
import presetEnv from '@babel/preset-env';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

function buildOne(input, output) {
  console.log('[build-chess-legacy] transpiling ' + input + ' ...');
  var res = transformFileSync(input, {
    presets: [[presetEnv, { targets: { ie: '10' }, modules: false }]],
    compact: true,
    comments: false,
    babelrc: false,
    configFile: false
  });
  writeFileSync(output + '.babel.js', res.code);
  execSync('npx esbuild ' + output + '.babel.js --minify --outfile=' + output, { stdio: 'inherit' });
  console.log('[build-chess-legacy] wrote ' + output);
}

try {
  buildOne('public/chess/vendor/three.min.js', 'public/chess/vendor/three.es5.js');
  buildOne('public/chess/vendor/OrbitControls.js', 'public/chess/vendor/orbit.es5.js');
  console.log('[build-chess-legacy] done');
} catch (e) {
  console.log('[build-chess-legacy] FAILED (non-fatal): ' + (e && e.message));
}
