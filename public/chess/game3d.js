/* Chess3D: procedural Staunton set + board + picking (ES5, three r128). */
var Chess3D = (function() {

var SQ = 1;
function sqToWorld(sq) {
  var f = 'abcdefgh'.indexOf(sq.charAt(0));
  var r = parseInt(sq.charAt(1), 10) - 1;
  return { x: (f - 3.5) * SQ, z: (3.5 - r) * SQ };
}

function lathe(points, mat) {
  var v2 = [];
  for (var i = 0; i < points.length; i++) v2.push(new THREE.Vector2(points[i][0], points[i][1]));
  var g = new THREE.LatheGeometry(v2, 28);
  return new THREE.Mesh(g, mat);
}

function baseProfile(top) {
  return [[0.001, 0], [0.30, 0], [0.30, 0.045], [0.20, 0.09], [0.15, 0.12]].concat(top);
}

function buildPieceMesh(type, mat) {
  var grp = new THREE.Group();
  var m;
  if (type === 'p') {
    m = lathe(baseProfile([[0.11, 0.28], [0.09, 0.33], [0.13, 0.36], [0.12, 0.40], [0.115, 0.44], [0.09, 0.50], [0.001, 0.54]]), mat);
    grp.add(m);
  } else if (type === 'r') {
    m = lathe(baseProfile([[0.13, 0.30], [0.12, 0.45], [0.17, 0.50], [0.19, 0.54], [0.19, 0.66], [0.001, 0.66]]), mat);
    grp.add(m);
  } else if (type === 'n') {
    m = lathe(baseProfile([[0.14, 0.26], [0.12, 0.32]]), mat);
    grp.add(m);
    var shape = new THREE.Shape();
    var pts = [[0.26, 0.0], [0.33, 0.16], [0.24, 0.38], [0.13, 0.52], [0.10, 0.68], [0.03, 0.60], [-0.05, 0.68], [-0.10, 0.55], [-0.20, 0.42], [-0.24, 0.22], [-0.20, 0.06], [-0.06, 0.0]];
    shape.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    shape.closePath();
    var hg = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
    hg.translate(0, 0, -0.1);
    var head = new THREE.Mesh(hg, mat);
    head.position.y = 0.28;
    head.rotation.y = Math.PI / 2;
    grp.add(head);
  } else if (type === 'b') {
    m = lathe(baseProfile([[0.12, 0.30], [0.10, 0.46], [0.15, 0.54], [0.15, 0.60], [0.08, 0.64], [0.10, 0.70], [0.10, 0.75], [0.001, 0.79]]), mat);
    grp.add(m);
    var ball = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 12), mat);
    ball.position.y = 0.83;
    grp.add(ball);
  } else if (type === 'q') {
    m = lathe(baseProfile([[0.13, 0.34], [0.11, 0.55], [0.17, 0.62], [0.19, 0.68], [0.15, 0.74], [0.17, 0.80], [0.001, 0.82]]), mat);
    grp.add(m);
    for (var k = 0; k < 6; k++) {
      var orb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat);
      var a = k / 6 * Math.PI * 2;
      orb.position.set(Math.cos(a) * 0.15, 0.86, Math.sin(a) * 0.15);
      grp.add(orb);
    }
    var qb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10), mat);
    qb.position.y = 0.9;
    grp.add(qb);
  } else if (type === 'k') {
    m = lathe(baseProfile([[0.14, 0.36], [0.12, 0.58], [0.18, 0.66], [0.18, 0.72], [0.12, 0.76], [0.001, 0.78]]), mat);
    grp.add(m);
    var c1 = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.20, 0.055), mat);
    c1.position.y = 0.90;
    grp.add(c1);
    var c2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.055, 0.055), mat);
    c2.position.y = 0.90;
    grp.add(c2);
  }
  grp.traverse(function(o) { if (o.isMesh) { o.castShadow = true; } });
  return grp;
}

function create(container, opts) {
  opts = opts || {};
  var W = container.clientWidth || 320;
  var H = container.clientHeight || 320;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !opts.lowQ });
  } catch (e) {
    container.innerHTML = '<div style="color:#fff;font:13px monospace;padding:20px">3D unavailable on this device.</div>';
    return null;
  }
  renderer.setPixelRatio(opts.lowQ ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H);
  if (!opts.lowQ) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d18);
  scene.fog = new THREE.Fog(0x0d0d18, 18, 34);

  var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  var camAngle = 0;
  var camDist = 9.5, camHeight = 8.2;
  function placeCam() {
    camera.position.set(Math.sin(camAngle) * camDist, camHeight, Math.cos(camAngle) * camDist);
    camera.lookAt(0, 0, 0);
  }
  placeCam();

  var controls = null;
  try {
    if (THREE.OrbitControls && !opts.lowQ) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 5;
      controls.maxDistance = 16;
      controls.maxPolarAngle = Math.PI * 0.46;
      controls.enablePan = false;
    }
  } catch (e) { controls = null; }

  var hemi = new THREE.HemisphereLight(0xdde4ff, 0x332211, 0.75);
  scene.add(hemi);
  var dir = new THREE.DirectionalLight(0xfff2dd, 0.95);
  dir.position.set(5, 10, 4);
  if (!opts.lowQ) {
    dir.castShadow = true;
    dir.shadow.mapSize.width = 1024;
    dir.shadow.mapSize.height = 1024;
    dir.shadow.camera.left = -6; dir.shadow.camera.right = 6;
    dir.shadow.camera.top = 6; dir.shadow.camera.bottom = -6;
  }
  scene.add(dir);

  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: 0.35 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.13;
  ground.receiveShadow = true;
  scene.add(ground);

  var matLight = new THREE.MeshStandardMaterial({ color: 0xf0d9b5, roughness: 0.65, metalness: 0.02 });
  var matDark = new THREE.MeshStandardMaterial({ color: 0xa06838, roughness: 0.7, metalness: 0.02 });
  var matFrame = new THREE.MeshStandardMaterial({ color: 0x4a2f1a, roughness: 0.6 });
  var matWhite = new THREE.MeshStandardMaterial({ color: 0xefe6d2, roughness: 0.32, metalness: 0.05 });
  var matBlack = new THREE.MeshStandardMaterial({ color: 0x2e2622, roughness: 0.32, metalness: 0.08 });

  var sqGeo = new THREE.BoxGeometry(SQ, 0.12, SQ);
  var squares = {};
  var files = 'abcdefgh';
  for (var f = 0; f < 8; f++) {
    for (var r = 0; r < 8; r++) {
      var sq = files.charAt(f) + (r + 1);
      var mesh = new THREE.Mesh(sqGeo, ((f + r) % 2 === 0) ? matDark : matLight);
      var w = sqToWorld(sq);
      mesh.position.set(w.x, -0.06, w.z);
      mesh.receiveShadow = true;
      mesh.userData.square = sq;
      scene.add(mesh);
      squares[sq] = mesh;
    }
  }
  /* frame */
  var framePieces = [
    [0, 4.55, 9.6, 0.5], [0, -4.55, 9.6, 0.5],
    [4.55, 0, 0.5, 9.6], [-4.55, 0, 0.5, 9.6]
  ];
  for (var fi = 0; fi < framePieces.length; fi++) {
    var fp = framePieces[fi];
    var fm = new THREE.Mesh(new THREE.BoxGeometry(fp[2], 0.2, fp[3]), matFrame);
    fm.position.set(fp[0], -0.05, fp[1]);
    fm.receiveShadow = true;
    scene.add(fm);
  }

  /* highlight overlays */
  var hlGroup = new THREE.Group();
  scene.add(hlGroup);
  var dotGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.03, 18);
  var ringGeo = new THREE.RingGeometry(0.32, 0.44, 26);
  var planeGeo = new THREE.PlaneGeometry(1, 1);
  var dotMat = new THREE.MeshBasicMaterial({ color: 0x35d05a, transparent: true, opacity: 0.85 });
  var greenRingMat = new THREE.MeshBasicMaterial({ color: 0x35d05a, transparent: true, opacity: 0.95, side: THREE.DoubleSide });
  var redRingMat = new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.95, side: THREE.DoubleSide });
  function clearHL() {
    for (var i = hlGroup.children.length - 1; i >= 0; i--) {
      var c = hlGroup.children[i];
      hlGroup.remove(c);
      if (c.material && c.material !== dotMat && c.material !== greenRingMat && c.material !== redRingMat) {
        try { c.material.dispose(); } catch (e) {}
      }
    }
  }
  function addDot(sq) {
    var m = new THREE.Mesh(dotGeo, dotMat);
    var w = sqToWorld(sq);
    m.position.set(w.x, 0.02, w.z);
    hlGroup.add(m);
  }
  var lastPlaneMat = null;
  function addPlane(sq, color, opacity) {
    var m = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity == null ? 0.45 : opacity }));
    var w = sqToWorld(sq);
    m.rotation.x = -Math.PI / 2;
    m.position.set(w.x, 0.015, w.z);
    hlGroup.add(m);
  }
  function addRing(sq, color) {
    var m = new THREE.Mesh(ringGeo, color === 0xff2222 ? redRingMat : greenRingMat);
    var w = sqToWorld(sq);
    m.rotation.x = -Math.PI / 2;
    m.position.set(w.x, 0.02, w.z);
    hlGroup.add(m);
  }

  var pieces = {};
  var anims = [];

  function removePieceMesh(sq, animate) {
    var mesh = pieces[sq];
    if (!mesh) return;
    delete pieces[sq];
    if (!animate) { scene.remove(mesh); return; }
    anims.push({ mesh: mesh, t: 0, dur: 0.25, kind: 'shrink' });
  }

  function setSquare(sq, type, color) {
    removePieceMesh(sq, false);
    if (!type) return;
    var mesh = buildPieceMesh(type, color === 'w' ? matWhite : matBlack);
    var w = sqToWorld(sq);
    mesh.position.set(w.x, 0, w.z);
    if (color === 'b') mesh.rotation.y = Math.PI;
    mesh.userData.square = sq;
    mesh.userData.piece = type;
    mesh.userData.color = color;
    scene.add(mesh);
    pieces[sq] = mesh;
  }

  var raycaster = new THREE.Raycaster();
  var mouseV = new THREE.Vector2();
  var onPick = null;
  var downPos = null;
  var lastPickT = 0;
  function pointFromEvent(e) {
    if (e && e.clientX !== undefined && e.clientX !== null) return [e.clientX, e.clientY];
    var t = (e && e.changedTouches && e.changedTouches[0]) || (e && e.touches && e.touches[0]);
    if (t) return [t.clientX, t.clientY];
    return null;
  }
  function onDown(e) {
    var p = pointFromEvent(e);
    if (p) downPos = p;
  }
  function onUp(e) {
    if (!downPos) return;
    var p = pointFromEvent(e);
    var d = downPos;
    downPos = null;
    if (!p || !onPick) return;
    var dx = p[0] - d[0], dy = p[1] - d[1];
    if (dx * dx + dy * dy > 36) return;
    var now = Date.now();
    if (now - lastPickT < 400) return;
    lastPickT = now;
    var rect = renderer.domElement.getBoundingClientRect();
    mouseV.x = ((p[0] - rect.left) / rect.width) * 2 - 1;
    mouseV.y = -((p[1] - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouseV, camera);
    var targets = [];
    for (var sq in pieces) targets.push(pieces[sq]);
    for (var s2 in squares) targets.push(squares[s2]);
    var hits = raycaster.intersectObjects(targets, true);
    if (!hits.length) return;
    var o = hits[0].object;
    while (o && !o.userData.square) o = o.parent;
    if (o && o.userData.square) onPick(o.userData.square);
  }
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('touchstart', onDown);
  renderer.domElement.addEventListener('touchend', onUp);
  renderer.domElement.addEventListener('mousedown', onDown);
  renderer.domElement.addEventListener('mouseup', onUp);

  var flipTarget = null;
  var clockT = Date.now();
  function animate() {
    requestAnimationFrame(animate);
    var now = Date.now();
    var dt = Math.min(0.05, (now - clockT) / 1000);
    clockT = now;
    if (flipTarget !== null) {
      var diff = flipTarget - camAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      camAngle += diff * Math.min(1, dt * 5);
      if (Math.abs(diff) < 0.01) { camAngle = flipTarget; flipTarget = null; }
      if (!controls) placeCam();
    }
    for (var i = anims.length - 1; i >= 0; i--) {
      var a = anims[i];
      a.t += dt / a.dur;
      if (a.kind === 'move') {
        var t = Math.min(1, a.t);
        a.mesh.position.x = a.from.x + (a.to.x - a.from.x) * t;
        a.mesh.position.z = a.from.z + (a.to.z - a.from.z) * t;
        a.mesh.position.y = Math.sin(t * Math.PI) * 0.45;
        if (t >= 1) {
          a.mesh.position.set(a.to.x, 0, a.to.z);
          a.mesh.userData.square = a.sq;
          anims.splice(i, 1);
        }
      } else if (a.kind === 'shrink') {
        var k = Math.max(0.001, 1 - a.t);
        a.mesh.scale.set(k, k, k);
        if (a.t >= 1) { scene.remove(a.mesh); anims.splice(i, 1); }
      }
    }
    if (controls) controls.update();
    else if (flipTarget !== null) placeCam();
    renderer.render(scene, camera);
  }
  animate();

  return {
    setPosition: function(board) {
      for (var sq in pieces) scene.remove(pieces[sq]);
      pieces = {};
      anims.length = 0;
      clearHL();
      for (var r = 0; r < 8; r++) {
        for (var f = 0; f < 8; f++) {
          var p = board[r][f];
          if (p) setSquare(files.charAt(f) + (8 - r), p.type, p.color);
        }
      }
    },
    movePiece: function(from, to, captured) {
      clearHL();
      if (captured) removePieceMesh(to, true);
      var mesh = pieces[from];
      if (!mesh) return;
      delete pieces[from];
      pieces[to] = mesh;
      var a = sqToWorld(from), b = sqToWorld(to);
      anims.push({ mesh: mesh, t: 0, dur: 0.28, kind: 'move', from: { x: a.x, z: a.z }, to: { x: b.x, z: b.z }, sq: to });
    },
    showHints: function(squares) {
      clearHL();
      for (var i = 0; i < squares.length; i++) addDot(squares[i]);
    },
    markSelected: function(sq) { addRing(sq, 0x35d05a); },
    markLastMove: function(from, to) { addPlane(from, 0xf5e642, 0.35); addPlane(to, 0xf5e642, 0.45); },
    markCheck: function(kingSq) { addRing(kingSq, 0xff2222); addPlane(kingSq, 0xff2222, 0.35); },
    clearHL: clearHL,
    onPick: function(fn) { onPick = fn; },
    flip: function(whiteBottom) { flipTarget = whiteBottom ? 0 : Math.PI; },
    resize: function() {
      var w = container.clientWidth || 320, h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  };
}

return { create: create, sqToWorld: sqToWorld };
})();
