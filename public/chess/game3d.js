/* Chess3D: procedural Staunton set + board + picking (ES5, three r128).
   v2: improved realism — wood materials, board labels, multi-light, shadows. */
var Chess3D = (function() {

var SQ = 1;
function sqToWorld(sq) {
  var f = 'abcdefgh'.indexOf(sq.charAt(0));
  var r = parseInt(sq.charAt(1), 10) - 1;
  return { x: (f - 3.5) * SQ, z: (3.5 - r) * SQ };
}

function lathe(points, mat, segs) {
  var v2 = [];
  for (var i = 0; i < points.length; i++) v2.push(new THREE.Vector2(points[i][0], points[i][1]));
  return new THREE.Mesh(new THREE.LatheGeometry(v2, segs || 24), mat);
}

function baseProfile(top) {
  return [[0.001, 0], [0.30, 0], [0.30, 0.045], [0.20, 0.09], [0.15, 0.12]].concat(top);
}

function buildPieceMesh(type, mat, accentMat) {
  var grp = new THREE.Group();
  var m, seg = 24;
  if (type === 'p') {
    m = lathe(baseProfile([
      [0.11, 0.28], [0.09, 0.33], [0.13, 0.36], [0.12, 0.40],
      [0.115, 0.44], [0.09, 0.50], [0.001, 0.54]
    ]), mat, seg);
    grp.add(m);
  } else if (type === 'r') {
    m = lathe(baseProfile([
      [0.13, 0.30], [0.12, 0.45], [0.17, 0.50], [0.19, 0.54],
      [0.19, 0.66], [0.001, 0.66]
    ]), mat, seg);
    grp.add(m);
    // battlements (4 small crenellations)
    for (var ci = 0; ci < 4; ci++) {
      var cb = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.04), accentMat || mat);
      var ca = ci / 4 * Math.PI * 2;
      cb.position.set(Math.cos(ca) * 0.14, 0.69, Math.sin(ca) * 0.14);
      grp.add(cb);
    }
  } else if (type === 'n') {
    m = lathe(baseProfile([[0.14, 0.26], [0.12, 0.32]]), mat, seg);
    grp.add(m);
    var shape = new THREE.Shape();
    var pts = [
      [0.26, 0.0], [0.33, 0.16], [0.24, 0.38], [0.13, 0.52],
      [0.10, 0.68], [0.03, 0.60], [-0.05, 0.68], [-0.10, 0.55],
      [-0.20, 0.42], [-0.24, 0.22], [-0.20, 0.06], [-0.06, 0.0]
    ];
    shape.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    shape.closePath();
    var hg = new THREE.ExtrudeGeometry(shape, {
      depth: 0.2, bevelEnabled: true,
      bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2
    });
    hg.translate(0, 0, -0.1);
    var head = new THREE.Mesh(hg, mat);
    head.position.y = 0.28;
    head.rotation.y = Math.PI / 2;
    head.castShadow = true;
    grp.add(head);
    // ear
    var ear = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8), mat);
    ear.position.set(0, 0.68, 0);
    ear.rotation.z = 0.3;
    grp.add(ear);
  } else if (type === 'b') {
    m = lathe(baseProfile([
      [0.12, 0.30], [0.10, 0.46], [0.15, 0.54], [0.15, 0.60],
      [0.08, 0.64], [0.10, 0.70], [0.10, 0.75], [0.001, 0.79]
    ]), mat, seg);
    grp.add(m);
    // mitre slit
    var slit = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.10, 0.15), accentMat || mat);
    slit.position.y = 0.72;
    slit.rotation.y = Math.PI / 4;
    grp.add(slit);
    var ball = new THREE.Mesh(new THREE.SphereGeometry(0.050, 12, 10), accentMat || mat);
    ball.position.y = 0.84;
    ball.castShadow = true;
    grp.add(ball);
  } else if (type === 'q') {
    m = lathe(baseProfile([
      [0.13, 0.34], [0.11, 0.55], [0.17, 0.62], [0.19, 0.68],
      [0.15, 0.74], [0.17, 0.80], [0.001, 0.82]
    ]), mat, seg);
    grp.add(m);
    for (var k = 0; k < 8; k++) {
      var orb = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), accentMat || mat);
      var a = k / 8 * Math.PI * 2;
      orb.position.set(Math.cos(a) * 0.13, 0.86, Math.sin(a) * 0.13);
      orb.castShadow = true;
      grp.add(orb);
    }
    var qb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), accentMat || mat);
    qb.position.y = 0.92;
    qb.castShadow = true;
    grp.add(qb);
  } else if (type === 'k') {
    m = lathe(baseProfile([
      [0.14, 0.36], [0.12, 0.58], [0.18, 0.66], [0.18, 0.72],
      [0.12, 0.76], [0.001, 0.78]
    ]), mat, seg);
    grp.add(m);
    var c1 = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.22, 0.045), accentMat || mat);
    c1.position.y = 0.92;
    c1.castShadow = true;
    grp.add(c1);
    var c2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.045, 0.045), accentMat || mat);
    c2.position.y = 0.92;
    c2.castShadow = true;
    grp.add(c2);
  }
  grp.traverse(function(o) { if (o.isMesh) o.castShadow = true; });
  return grp;
}

/* Canvas texture for board labels */
function makeLabelTexture() {
  var c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  var ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 512, 512);
  var files = 'abcdefgh';
  var sq = 64;
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (var f = 0; f < 8; f++) {
    // file labels (bottom)
    ctx.fillStyle = (f % 2 === 1) ? 'rgba(240,217,181,0.9)' : 'rgba(160,104,56,0.9)';
    ctx.fillText(files.charAt(f), f * sq + sq / 2, 7 * sq + sq - 10);
    // rank labels (left)
    ctx.fillStyle = (f % 2 === 0) ? 'rgba(240,217,181,0.9)' : 'rgba(160,104,56,0.9)';
    ctx.fillText(String(8 - f), 8, f * sq + sq / 2);
  }
  var tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/* Wood-grain-like procedural texture */
function makeWoodTexture(baseR, baseG, baseB, w, h) {
  var c = document.createElement('canvas');
  c.width = w || 128; c.height = h || 128;
  var ctx = c.getContext('2d');
  var img = ctx.createImageData(c.width, c.height);
  var d = img.data;
  for (var y = 0; y < c.height; y++) {
    for (var x = 0; x < c.width; x++) {
      var i = (y * c.width + x) * 4;
      var grain = Math.sin(x * 0.15 + Math.sin(y * 0.08) * 3) * 0.5 + 0.5;
      var noise = (Math.random() - 0.5) * 12;
      d[i]     = Math.max(0, Math.min(255, baseR + grain * 15 + noise));
      d[i + 1] = Math.max(0, Math.min(255, baseG + grain * 12 + noise));
      d[i + 2] = Math.max(0, Math.min(255, baseB + grain * 8 + noise));
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  var tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function create(container, opts) {
  opts = opts || {};
  var W = container.clientWidth || 320;
  var H = container.clientHeight || 320;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !opts.lowQ, alpha: false });
  } catch (e) {
    container.innerHTML = '<div style="color:#fff;font:13px monospace;padding:20px">3D unavailable on this device.</div>';
    return null;
  }
  var pr = opts.lowQ ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr);
  renderer.setSize(W, H);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  if (!opts.lowQ) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111118);
  scene.fog = new THREE.Fog(0x111118, 20, 38);

  var camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
  var camAngle = 0;
  var camDist = 10.5, camHeight = 9.0;
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
      controls.dampingFactor = 0.1;
      controls.minDistance = 5;
      controls.maxDistance = 18;
      controls.maxPolarAngle = Math.PI * 0.48;
      controls.enablePan = false;
      controls.rotateSpeed = 0.7;
    }
  } catch (e) { controls = null; }

  /* Lighting: hemisphere + ambient + two directional */
  var hemi = new THREE.HemisphereLight(0xc8d8ff, 0x443322, 0.6);
  scene.add(hemi);
  var amb = new THREE.AmbientLight(0x222233, 0.3);
  scene.add(amb);
  var dir = new THREE.DirectionalLight(0xfff4e0, 1.0);
  dir.position.set(6, 12, 5);
  if (!opts.lowQ) {
    dir.castShadow = true;
    dir.shadow.mapSize.width = 2048;
    dir.shadow.mapSize.height = 2048;
    dir.shadow.camera.left = -7; dir.shadow.camera.right = 7;
    dir.shadow.camera.top = 7; dir.shadow.camera.bottom = -7;
    dir.shadow.camera.near = 0.5; dir.shadow.camera.far = 30;
    dir.shadow.bias = -0.0005;
    dir.shadow.normalBias = 0.02;
  }
  scene.add(dir);
  /* fill light (opposite side, softer) */
  var fill = new THREE.DirectionalLight(0xd0d8ff, 0.3);
  fill.position.set(-5, 8, -4);
  scene.add(fill);
  /* subtle rim from behind */
  var rim = new THREE.PointLight(0xffeedd, 0.4, 25);
  rim.position.set(0, 6, -8);
  scene.add(rim);

  /* Table surface (felt) */
  var feltTex = makeWoodTexture(30, 45, 30, 64, 64);
  feltTex.repeat.set(4, 4);
  var feltMat = new THREE.MeshStandardMaterial({
    color: 0x1a3a1a, roughness: 0.95, metalness: 0,
    map: feltTex
  });
  var ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), feltMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.16;
  ground.receiveShadow = true;
  scene.add(ground);

  /* Board materials with wood grain */
  var lightTex = makeWoodTexture(235, 210, 170, 128, 128);
  var darkTex = makeWoodTexture(155, 95, 50, 128, 128);
  var matLight = new THREE.MeshStandardMaterial({ map: lightTex, roughness: 0.55, metalness: 0.02 });
  var matDark = new THREE.MeshStandardMaterial({ map: darkTex, roughness: 0.6, metalness: 0.02 });
  var frameTex = makeWoodTexture(65, 40, 22, 128, 128);
  var matFrame = new THREE.MeshStandardMaterial({ map: frameTex, roughness: 0.4, metalness: 0.05 });
  /* Piece materials: warm ivory / polished obsidian */
  var matWhite = new THREE.MeshStandardMaterial({ color: 0xf5edd8, roughness: 0.28, metalness: 0.06 });
  var matBlack = new THREE.MeshStandardMaterial({ color: 0x1a1614, roughness: 0.22, metalness: 0.12 });
  var matAccent = new THREE.MeshStandardMaterial({ color: 0xc8a840, roughness: 0.3, metalness: 0.35 });

  var sqGeo = new THREE.BoxGeometry(SQ, 0.13, SQ);
  var squares = {};
  var files = 'abcdefgh';
  for (var f = 0; f < 8; f++) {
    for (var r = 0; r < 8; r++) {
      var sq = files.charAt(f) + (r + 1);
      var mesh = new THREE.Mesh(sqGeo, ((f + r) % 2 === 0) ? matDark : matLight);
      var w = sqToWorld(sq);
      mesh.position.set(w.x, -0.065, w.z);
      mesh.receiveShadow = true;
      mesh.userData.square = sq;
      scene.add(mesh);
      squares[sq] = mesh;
    }
  }

  /* Board labels */
  var labelTex = makeLabelTexture();
  var labelMat = new THREE.MeshBasicMaterial({ map: labelTex, transparent: true, depthWrite: false });
  var labelPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), labelMat);
  labelPlane.rotation.x = -Math.PI / 2;
  labelPlane.position.set(0, 0.001, 0);
  scene.add(labelPlane);

  /* Frame: thicker, with slight bevel look */
  var fpData = [
    [0, 4.6, 9.8, 0.55], [0, -4.6, 9.8, 0.55],
    [4.6, 0, 0.55, 9.8], [-4.6, 0, 0.55, 9.8]
  ];
  for (var fi = 0; fi < fpData.length; fi++) {
    var fp = fpData[fi];
    var fm = new THREE.Mesh(new THREE.BoxGeometry(fp[2], 0.22, fp[3]), matFrame);
    fm.position.set(fp[0], -0.055, fp[1]);
    fm.receiveShadow = true;
    fm.castShadow = true;
    scene.add(fm);
  }
  /* corner accents */
  var corners = [[4.1, 4.1], [4.1, -4.1], [-4.1, 4.1], [-4.1, -4.1]];
  for (var ci = 0; ci < corners.length; ci++) {
    var cb = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.24, 12), matFrame);
    cb.position.set(corners[ci][0], -0.04, corners[ci][1]);
    cb.castShadow = true;
    scene.add(cb);
  }

  /* Highlight overlays */
  var hlGroup = new THREE.Group();
  scene.add(hlGroup);
  var dotGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.025, 18);
  var ringGeo = new THREE.RingGeometry(0.34, 0.46, 28);
  var planeGeo = new THREE.PlaneGeometry(1, 1);
  var dotMat = new THREE.MeshBasicMaterial({ color: 0x2ed060, transparent: true, opacity: 0.8 });
  var greenRingMat = new THREE.MeshBasicMaterial({ color: 0x2ed060, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  var redRingMat = new THREE.MeshBasicMaterial({ color: 0xff3333, transparent: true, opacity: 0.9, side: THREE.DoubleSide });

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
    m.position.set(w.x, 0.015, w.z);
    hlGroup.add(m);
  }
  function addPlane(sq, color, opacity) {
    var mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity == null ? 0.4 : opacity });
    var m = new THREE.Mesh(planeGeo, mat);
    var w = sqToWorld(sq);
    m.rotation.x = -Math.PI / 2;
    m.position.set(w.x, 0.012, w.z);
    hlGroup.add(m);
  }
  function addRing(sq, color) {
    var m = new THREE.Mesh(ringGeo, color === 0xff3333 ? redRingMat : greenRingMat);
    var w = sqToWorld(sq);
    m.rotation.x = -Math.PI / 2;
    m.position.set(w.x, 0.018, w.z);
    hlGroup.add(m);
  }

  var pieces = {};
  var anims = [];

  function removePieceMesh(sq, animate) {
    var mesh = pieces[sq];
    if (!mesh) return;
    delete pieces[sq];
    if (!animate) { scene.remove(mesh); return; }
    anims.push({ mesh: mesh, t: 0, dur: 0.3, kind: 'shrink' });
  }

  function setSquare(sq, type, color) {
    removePieceMesh(sq, false);
    if (!type) return;
    var mesh = buildPieceMesh(type, color === 'w' ? matWhite : matBlack, color === 'w' ? matAccent : matBlack);
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
    if (dx * dx + dy * dy > 49) return;
    var now = Date.now();
    if (now - lastPickT < 350) return;
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
  renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
  renderer.domElement.addEventListener('touchend', onUp, { passive: true });
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
        /* ease-in-out */
        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        a.mesh.position.x = a.from.x + (a.to.x - a.from.x) * ease;
        a.mesh.position.z = a.from.z + (a.to.z - a.from.z) * ease;
        a.mesh.position.y = Math.sin(t * Math.PI) * 0.5;
        /* slight tilt during move */
        a.mesh.rotation.x = Math.sin(t * Math.PI) * 0.12;
        if (t >= 1) {
          a.mesh.position.set(a.to.x, 0, a.to.z);
          a.mesh.rotation.x = 0;
          a.mesh.userData.square = a.sq;
          anims.splice(i, 1);
        }
      } else if (a.kind === 'shrink') {
        var k = Math.max(0.001, 1 - a.t * a.t);
        a.mesh.scale.set(k, k, k);
        a.mesh.position.y = a.t * 0.3;
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
      anims.push({ mesh: mesh, t: 0, dur: 0.32, kind: 'move', from: { x: a.x, z: a.z }, to: { x: b.x, z: b.z }, sq: to });
    },
    showHints: function(squares) {
      clearHL();
      for (var i = 0; i < squares.length; i++) addDot(squares[i]);
    },
    markSelected: function(sq) { addRing(sq, 0x2ed060); },
    markLastMove: function(from, to) { addPlane(from, 0xf5e642, 0.35); addPlane(to, 0xf5e642, 0.45); },
    markCheck: function(kingSq) { addRing(kingSq, 0xff3333); addPlane(kingSq, 0xff3333, 0.4); },
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
