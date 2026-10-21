import type * as Three from "three";

type T = typeof Three;

/**
 * La fotocamera 3D, una mirrorless con obiettivo zoom, costruita in codice (nessun file 3D
 * esterno) e condivisa da tutte le scene che la mostrano: la galleria di foto in "Chi sono"
 * (PhotoCamera) e gli oggetti che fluttuano in cima alla pagina (FloatingObjects). Arriva dallo
 * snippet "Mini Cam" di Giulia (three.js r128), portato su three.js recente.
 * Unità: circa 3 cm; +Z è il frontale, l'impugnatura sta a X negativa.
 */

export const PALETTES = {
  nero: {
    body: 0x18181a,
    leather: 0x0f0f10,
    lens: 0x121213,
    trim: 0x0c0c0d,
    swatch: "#0e0e0f",
  },
  antracite: {
    body: 0x303033,
    leather: 0x1f1f21,
    lens: 0x18181a,
    trim: 0x101011,
    swatch: "#2c2c2e",
  },
  grafite: {
    body: 0x58585c,
    leather: 0x38383b,
    lens: 0x1c1c1e,
    trim: 0x131314,
    swatch: "#55555a",
  },
  cenere: {
    body: 0x9e9ea2,
    leather: 0x66666a,
    lens: 0x202022,
    trim: 0x161617,
    swatch: "#9a9a9e",
  },
} as const;
export type PaletteName = keyof typeof PALETTES;

/** Il display posteriore, dove PhotoCamera mostra le foto */
export const SCREEN_W = 2.08;
export const SCREEN_H = 1.14;

/**
 * Luci e riflessi: uno studio con softbox, trasformato in mappa d'ambiente, più una luce
 * principale che proietta ombra e un controluce. Va chiamato una volta per scena; `dispose`
 * libera la mappa. Le intensità sono quelle dello snippet moltiplicate per π, perché three.js
 * recente non usa più la vecchia scala delle luci
 */
export function createStudio(
  THREE: T,
  renderer: Three.WebGLRenderer,
  scene: Three.Scene,
) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x1c1c1c);
  const panels: [
    number,
    number,
    [number, number, number],
    [number, number, number],
    number,
  ][] = [
    [7, 4, [0, 7, 1], [Math.PI / 2, 0, 0], 3.2], // softbox dall'alto
    [2.2, 7, [-7, 2, 3], [0, Math.PI / 2, 0], 2.2], // strip sinistra
    [1.6, 7, [7, 2, -1], [0, -Math.PI / 2, 0], 1.6], // strip destra
    [6, 2.5, [0, 1.5, 8], [0, Math.PI, 0], 0.7], // fill frontale
    [5, 2, [0, 2, -8], [0, 0, 0], 0.9], // controluce
    [20, 20, [0, -4, 0], [-Math.PI / 2, 0, 0], 0.22], // pavimento chiaro
  ];
  const envGeos: Three.BufferGeometry[] = [];
  const envMats: Three.Material[] = [];
  for (const [w, h, p, r, k] of panels) {
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    mat.color.setScalar(k);
    const geo = new THREE.PlaneGeometry(w, h);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...p);
    m.rotation.set(...r);
    env.add(m);
    envGeos.push(geo);
    envMats.push(mat);
  }
  const envMap = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  for (const g of envGeos) g.dispose();
  for (const m of envMats) m.dispose();

  const key = new THREE.DirectionalLight(0xffffff, 1.5 * Math.PI);
  key.position.set(-4.5, 9, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, {
    left: -5,
    right: 5,
    top: 5,
    bottom: -5,
    near: 1,
    far: 25,
  });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 4;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9 * Math.PI);
  rim.position.set(5, 4, -6);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3a3a, 0.25 * Math.PI));

  scene.environment = envMap;
  return {
    dispose: () => {
      envMap.dispose();
      key.shadow.map?.dispose();
    },
  };
}

// Le mappe di rilievo (pelle, zigrinature, righe) costano qualche decina di millisecondi a
// calcolarle: si fanno una volta sola e si riusano in ogni scena che costruisce la fotocamera
const reliefCache = new Map<string, HTMLCanvasElement>();

export function reliefCanvas(
  id: string,
  w: number,
  h: number,
  height: (u: number, v: number) => number,
  strength: number,
) {
  const cached = reliefCache.get(id);
  if (cached) return cached;
  const H = new Float32Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) H[y * w + x] = height(x / w, y / h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const l = H[y * w + ((x - 1 + w) % w)];
      const r = H[y * w + ((x + 1) % w)];
      const u = H[((y - 1 + h) % h) * w + x];
      const d = H[((y + 1) % h) * w + x];
      let nx = (l - r) * strength;
      let ny = (d - u) * strength;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * w + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  reliefCache.set(id, c);
  return c;
}

// Similpelle: celle di Voronoi, la grana "a sassolini"
function leatherHeight() {
  const N = 40;
  const pts: [number, number][] = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++)
      pts.push([(i + 0.15 + rnd() * 0.7) / N, (j + 0.15 + rnd() * 0.7) / N]);
  return (u: number, v: number) => {
    const ci = Math.floor(u * N);
    const cj = Math.floor(v * N);
    let f1 = 9;
    let f2 = 9;
    for (let dj = -1; dj <= 1; dj++)
      for (let di = -1; di <= 1; di++) {
        const ii = (ci + di + N) % N;
        const jj = (cj + dj + N) % N;
        const p = pts[jj * N + ii];
        const px = p[0] + (ci + di < 0 ? -1 : ci + di >= N ? 1 : 0);
        const py = p[1] + (cj + dj < 0 ? -1 : cj + dj >= N ? 1 : 0);
        const d = Math.hypot(u - px, v - py);
        if (d < f1) {
          f2 = f1;
          f1 = d;
        } else if (d < f2) f2 = d;
      }
    const e = Math.min(1, (f2 - f1) * N * 2.2);
    return Math.sqrt(e) * 0.9 + (rnd() - 0.5) * 0.04;
  };
}

/**
 * Le forme di base con cui sono costruite le fotocamere: blocchi smussati, cilindri lungo Z,
 * profili a tornio. Condivise dai modelli in questo file e in instantCameraModel.ts
 */
export function geometryKit(THREE: T) {
  function roundedRectShape(w: number, h: number, r: number) {
    const s = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  // Blocco smussato: estrusione lungo Z, centrata
  function slab(shape: Three.Shape, depth: number, bevel: number, seg = 5) {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.001, depth - 2 * bevel),
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: seg,
      curveSegments: 18,
    });
    g.translate(0, 0, -(depth - 2 * bevel) / 2);
    g.computeVertexNormals();
    return g;
  }
  const box = (
    w: number,
    h: number,
    d: number,
    r: number,
    bevel: number,
    seg?: number,
  ) =>
    slab(
      roundedRectShape(w - 2 * bevel, h - 2 * bevel, Math.max(0.01, r - bevel)),
      d,
      bevel,
      seg,
    );
  function cylZ(r: number, len: number, seg = 72, open = false) {
    const g = new THREE.CylinderGeometry(r, r, len, seg, 1, open);
    g.rotateX(Math.PI / 2);
    return g;
  }
  function lathe(pts: [number, number][], seg = 96) {
    const g = new THREE.LatheGeometry(
      pts.map((p) => new THREE.Vector2(p[0], p[1])),
      seg,
    );
    g.rotateX(Math.PI / 2);
    return g;
  }

  return { roundedRectShape, slab, box, cylZ, lathe };
}
/**
 * Il modello: un gruppo già centrato, con il display posteriore (nascosto finché una scena
 * non lo accende) pronto a ricevere una texture. `setPalette` cambia i colori, `dispose`
 * libera geometrie, materiali e texture
 */
export function createCameraModel(THREE: T) {
  const textures: Three.Texture[] = [];
  const extraMats: Three.Material[] = [];
  // Le scritte usano il carattere del sito
  const font = getComputedStyle(document.body).fontFamily || "sans-serif";

  const relief = (
    id: string,
    w: number,
    h: number,
    fn: (u: number, v: number) => number,
    strength: number,
    rx = 1,
    ry = 1,
  ) => {
    const t = new THREE.CanvasTexture(reliefCanvas(id, w, h, fn, strength));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    t.anisotropy = 8;
    textures.push(t);
    return t;
  };
  const textCanvasTexture = (c: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 8;
    t.colorSpace = THREE.SRGBColorSpace;
    textures.push(t);
    return t;
  };

  // ---------- Texture di rilievo ----------
  const leatherN = relief("leather", 512, 512, leatherHeight(), 5, 0.55, 0.55);
  const knurlN = relief(
    "knurl",
    512,
    64,
    (u, v) => {
      const a = (u * 8 + v) % 1;
      const b = (u * 8 - v + 10) % 1;
      return Math.min(Math.abs(a - 0.5), Math.abs(b - 0.5)) * 2;
    },
    14,
    9,
    7,
  );
  const ribs = (count: number) =>
    relief("ribs", 256, 8, (u) => Math.abs(Math.sin(u * Math.PI)), 6, count, 1);
  const focusRibsN = ribs(110);
  const dialRibsN = ribs(48);
  const smallDialRibsN = ribs(36);
  // Plastica opaca: microgranulosità
  const plasticN = relief("plastic", 256, 256, () => Math.random(), 0.6, 4, 4);

  // ---------- Materiali ----------
  const M = {
    body: new THREE.MeshStandardMaterial({
      color: 0x18181a,
      roughness: 0.48,
      metalness: 0,
      normalMap: plasticN,
      normalScale: new THREE.Vector2(0.35, 0.35),
    }),
    leather: new THREE.MeshStandardMaterial({
      color: 0x0f0f10,
      roughness: 0.72,
      normalMap: leatherN,
      normalScale: new THREE.Vector2(0.9, 0.9),
    }),
    lens: new THREE.MeshStandardMaterial({
      color: 0x121213,
      roughness: 0.5,
      normalMap: plasticN,
      normalScale: new THREE.Vector2(0.25, 0.25),
    }),
    knurl: new THREE.MeshStandardMaterial({
      color: 0x0c0c0d,
      roughness: 0.82,
      normalMap: knurlN,
    }),
    focus: new THREE.MeshStandardMaterial({
      color: 0x0f0f10,
      roughness: 0.65,
      normalMap: focusRibsN,
    }),
    dial: new THREE.MeshStandardMaterial({
      color: 0x141415,
      roughness: 0.45,
      metalness: 0.2,
      normalMap: dialRibsN,
    }),
    dialS: new THREE.MeshStandardMaterial({
      color: 0x141415,
      roughness: 0.45,
      metalness: 0.2,
      normalMap: smallDialRibsN,
    }),
    button: new THREE.MeshStandardMaterial({
      color: 0x151516,
      roughness: 0.38,
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0xc4c4c6,
      roughness: 0.18,
      metalness: 1,
    }),
    metalD: new THREE.MeshStandardMaterial({
      color: 0x5a5a5d,
      roughness: 0.3,
      metalness: 1,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x050506,
      roughness: 0.02,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      reflectivity: 1,
      envMapIntensity: 3,
    }),
    coatA: new THREE.MeshStandardMaterial({
      color: 0x1d2b22,
      roughness: 0.06,
      metalness: 1,
      envMapIntensity: 1.4,
    }),
    coatB: new THREE.MeshStandardMaterial({
      color: 0x2a1d2c,
      roughness: 0.08,
      metalness: 1,
      envMapIntensity: 1.2,
    }),
    black: new THREE.MeshStandardMaterial({
      color: 0x030303,
      roughness: 0.95,
      side: THREE.DoubleSide,
    }),
    screen: new THREE.MeshPhysicalMaterial({
      color: 0x070708,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 1.6,
    }),
    lamp: new THREE.MeshPhysicalMaterial({
      color: 0xdedede,
      roughness: 0.1,
      clearcoat: 1,
      transparent: true,
      opacity: 0.9,
    }),
    white: new THREE.MeshStandardMaterial({ color: 0xeaeaea, roughness: 0.4 }),
  };

  const { slab, box, cylZ, lathe } = geometryKit(THREE);

  // Etichette incise: testo su un piano trasparente
  const labelMat = (tex: Three.Texture, op = 0.85) => {
    const m = new THREE.MeshStandardMaterial({
      map: tex,
      color: 0xd9d9d9,
      roughness: 0.6,
      transparent: true,
      opacity: op,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    });
    extraMats.push(m);
    return m;
  };

  // ---------- Modello ----------
  const model = new THREE.Group();
  const add = (
    geo: NonNullable<ConstructorParameters<typeof THREE.Mesh>[0]>,
    mat: NonNullable<ConstructorParameters<typeof THREE.Mesh>[1]>,
    x = 0,
    y = 0,
    z = 0,
    parent: Three.Group = model,
  ) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const label = (
    text: string,
    w: number,
    h: number,
    pos: [number, number, number],
    rotY = 0,
    px = 64,
  ) => {
    const c = document.createElement("canvas");
    c.width = Math.round(w * 400);
    c.height = Math.round(h * 400);
    const x = c.getContext("2d")!;
    x.fillStyle = "#fff";
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.font = `500 ${px}px ${font}`;
    x.fillText(text, c.width / 2, c.height / 2);
    const m = add(
      new THREE.PlaneGeometry(w, h),
      labelMat(textCanvasTexture(c)),
    );
    m.position.set(...pos);
    m.rotation.y = rotY;
    m.castShadow = false;
    return m;
  };

  const BODY_W = 4.1;
  const BODY_H = 2.1;
  const BODY_D = 1.2;
  const BODY_Y = -0.1;
  const FRONT = BODY_D / 2;
  const BACK = -BODY_D / 2;
  const TOP = BODY_Y + BODY_H / 2;
  const BOTTOM = BODY_Y - BODY_H / 2;

  // Corpo principale e pannello frontale in similpelle
  add(box(BODY_W, BODY_H, BODY_D, 0.32, 0.14), M.body, 0, BODY_Y, 0);
  add(
    box(BODY_W - 0.36, BODY_H - 0.5, 0.05, 0.12, 0.02, 3),
    M.leather,
    0.05,
    BODY_Y - 0.17,
    FRONT + 0.005,
  );

  // Torretta del mirino: trapezio estruso
  {
    const s = new THREE.Shape();
    const bw = 1.0;
    const tw = 0.62;
    const y1 = 0.78;
    const r = 0.1;
    s.moveTo(-bw, 0);
    s.lineTo(bw, 0);
    s.lineTo(tw + r * 0.6, y1 - r);
    s.quadraticCurveTo(tw, y1, tw - r, y1);
    s.lineTo(-tw + r, y1);
    s.quadraticCurveTo(-tw, y1, -tw - r * 0.6, y1 - r);
    s.lineTo(-bw, 0);
    add(slab(s, 1.08, 0.1, 5), M.body, 0.45, TOP - 0.12, -0.03);
  }
  const HUMP_TOP = TOP - 0.12 + 0.78 + 0.1;

  // Impugnatura: profilo in pianta estruso in verticale, molto smussato
  {
    const s = new THREE.Shape(); // coordinate (x, -z)
    s.moveTo(-1.83, -0.2);
    s.lineTo(-1.83, -0.95);
    s.bezierCurveTo(-1.83, -1.38, -1.55, -1.42, -1.3, -1.42);
    s.bezierCurveTo(-0.98, -1.42, -0.86, -1.22, -0.84, -0.95);
    s.bezierCurveTo(-0.82, -0.7, -0.86, -0.5, -0.86, -0.2);
    s.lineTo(-1.83, -0.2);
    const H = TOP - 0.25 - BOTTOM;
    const bev = 0.17;
    const g = new THREE.ExtrudeGeometry(s, {
      depth: H - 2 * bev,
      bevelEnabled: true,
      bevelThickness: bev,
      bevelSize: bev,
      bevelSegments: 6,
      curveSegments: 28,
    });
    g.rotateX(-Math.PI / 2);
    g.translate(0, BOTTOM + bev, 0);
    g.computeVertexNormals();
    add(g, M.leather);
    // Calotta superiore liscia
    const cap = new THREE.ExtrudeGeometry(s, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.17,
      bevelSegments: 4,
      curveSegments: 28,
    });
    cap.rotateX(-Math.PI / 2);
    cap.translate(0, TOP - 0.25, 0);
    cap.computeVertexNormals();
    add(cap, M.body);
  }
  const GRIP_TOP = TOP - 0.07;

  // Slitta del flash
  {
    const y = HUMP_TOP;
    add(box(1.0, 0.06, 0.78, 0.04, 0.015, 2), M.metal, 0.45, y + 0.02, -0.03);
    add(box(0.12, 0.08, 0.78, 0.02, 0.01, 2), M.metal, 0.05, y + 0.08, -0.03);
    add(box(0.12, 0.08, 0.78, 0.02, 0.01, 2), M.metal, 0.85, y + 0.08, -0.03);
    add(box(0.62, 0.03, 0.55, 0.03, 0.01, 2), M.black, 0.45, y + 0.06, -0.05);
    for (let i = -2; i <= 2; i++)
      add(
        new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12),
        M.metal,
        0.45 + i * 0.1,
        y + 0.08,
        -0.05,
      );
  }

  // Ghiera dei modi, con le incisioni sul tappo
  {
    const x = -1.08;
    const z = -0.12;
    const r = 0.37;
    const h = 0.26;
    const y = TOP + h / 2 - 0.02;
    add(
      new THREE.CylinderGeometry(r * 0.9, r * 0.9, 0.06, 48),
      M.body,
      x,
      TOP + 0.01,
      z,
    );
    add(new THREE.CylinderGeometry(r, r, h, 96, 1, true), M.dial, x, y, z);
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d")!;
    g.fillStyle = "#1a1a1b";
    g.fillRect(0, 0, 512, 512);
    g.fillStyle = "#e6e6e6";
    g.textAlign = "center";
    g.textBaseline = "middle";
    const marks = ["AUTO", "P", "S", "A", "M", "C1", "C2", "SCN", "◐", "▭"];
    marks.forEach((t, i) => {
      const a = -Math.PI / 2 + i * ((Math.PI * 2) / marks.length);
      g.save();
      g.translate(256 + Math.cos(a) * 196, 256 + Math.sin(a) * 196);
      g.rotate(a + Math.PI / 2);
      g.font = `500 ${t.length > 2 ? 34 : 44}px ${font}`;
      g.fillText(t, 0, 0);
      g.restore();
    });
    g.strokeStyle = "#2c2c2e";
    g.lineWidth = 3;
    g.beginPath();
    g.arc(256, 256, 140, 0, Math.PI * 2);
    g.stroke();
    const capMat = new THREE.MeshStandardMaterial({
      map: textCanvasTexture(c),
      roughness: 0.5,
      metalness: 0.1,
    });
    extraMats.push(capMat);
    add(
      new THREE.CylinderGeometry(r - 0.005, r - 0.005, 0.012, 96),
      [M.dial, capMat, M.dial],
      x,
      y + h / 2,
      z,
    );
    // Indice fisso
    add(
      box(0.05, 0.03, 0.1, 0.01, 0.005, 1),
      M.white,
      x,
      TOP + 0.005,
      z + r + 0.06,
    );
  }

  // Rotella anteriore e pulsante di scatto con il collare
  add(
    new THREE.CylinderGeometry(0.27, 0.27, 0.17, 72),
    M.dialS,
    -1.62,
    GRIP_TOP + 0.1,
    0.3,
  );
  {
    const x = -1.36;
    const z = 1.02;
    const y = GRIP_TOP + 0.03;
    add(new THREE.CylinderGeometry(0.27, 0.29, 0.08, 72), M.dialS, x, y, z);
    add(
      new THREE.CylinderGeometry(0.17, 0.17, 0.09, 64),
      M.metalD,
      x,
      y + 0.06,
      z,
    );
    add(
      new THREE.SphereGeometry(0.165, 48, 12, 0, Math.PI * 2, 0, 0.55),
      M.button,
      x,
      y + 0.02,
      z,
    );
  }
  // Leva di accensione e pulsanti superiori
  add(
    box(0.22, 0.12, 0.22, 0.05, 0.03, 2),
    M.button,
    -1.58,
    GRIP_TOP + 0.06,
    -0.38,
  );
  add(box(0.5, 0.07, 0.2, 0.05, 0.02, 2), M.button, 1.55, TOP + 0.03, -0.1);
  add(box(0.12, 0.1, 0.14, 0.03, 0.02, 2), M.button, 1.75, TOP + 0.07, -0.1);
  // Fori del microfono
  const micGeo = () => new THREE.CylinderGeometry(0.018, 0.018, 0.02, 10);
  for (let i = 0; i < 3; i++) {
    add(micGeo(), M.black, 1.0 + i * 0.07, HUMP_TOP - 0.01, 0.25);
    add(micGeo(), M.black, -0.1 + i * 0.07, HUMP_TOP - 0.01, 0.25);
  }

  // Frontale: luce AF, sblocco dell'obiettivo
  add(cylZ(0.085, 0.04, 32), M.lamp, -0.55, TOP - 0.28, FRONT + 0.01);
  add(cylZ(0.1, 0.03, 32), M.black, -0.55, TOP - 0.28, FRONT - 0.005);
  add(cylZ(0.15, 0.08, 48), M.button, 1.74, BODY_Y - 0.3, FRONT + 0.02);
  add(cylZ(0.1, 0.1, 48), M.button, 1.74, BODY_Y - 0.3, FRONT + 0.05);

  // Attacchi della tracolla
  for (const sx of [-1, 1]) {
    add(
      box(0.12, 0.34, 0.3, 0.05, 0.03, 2),
      M.body,
      sx * (BODY_W / 2 + 0.03),
      TOP - 0.3,
      -0.05,
    );
    const ring = add(
      new THREE.TorusGeometry(0.11, 0.022, 12, 32),
      M.metal,
      sx * (BODY_W / 2 + 0.11),
      TOP - 0.24,
      -0.05,
    );
    ring.rotation.set(0, Math.PI / 2, 0.5 * sx);
  }

  // Fianco destro: sportelli delle porte
  {
    const x = BODY_W / 2 + 0.005;
    add(
      box(0.04, 0.95, 0.42, 0.06, 0.015, 2),
      M.leather,
      x,
      BODY_Y - 0.25,
      0.2,
    );
    add(
      box(0.04, 0.5, 0.42, 0.06, 0.015, 2),
      M.leather,
      x,
      BODY_Y - 0.25,
      -0.28,
    );
    label("MIC", 0.3, 0.1, [x + 0.03, BODY_Y - 0.6, 0.2], Math.PI / 2, 60);
    label("HDMI", 0.34, 0.1, [x + 0.03, BODY_Y - 0.1, -0.28], Math.PI / 2, 60);
  }

  // Retro: display orientabile, mirino, comandi
  {
    add(
      box(0.16, 1.36, 0.12, 0.05, 0.03, 2),
      M.body,
      1.66,
      BODY_Y - 0.12,
      BACK - 0.06,
    );
    add(
      box(2.5, 1.5, 0.12, 0.1, 0.04, 3),
      M.body,
      0.3,
      BODY_Y - 0.12,
      BACK - 0.07,
    );
    add(
      box(2.3, 1.32, 0.02, 0.05, 0.008, 2),
      M.black,
      0.3,
      BODY_Y - 0.12,
      BACK - 0.135,
    );
    add(
      box(2.12, 1.18, 0.02, 0.03, 0.006, 2),
      M.screen,
      0.3,
      BODY_Y - 0.12,
      BACK - 0.145,
    );
    // Oculare in gomma
    const eyeZ = BACK - 0.2;
    add(box(1.2, 0.86, 0.36, 0.26, 0.1, 5), M.leather, 0.45, TOP + 0.28, eyeZ);
    add(
      box(0.82, 0.48, 0.05, 0.1, 0.02, 3),
      M.black,
      0.45,
      TOP + 0.28,
      eyeZ - 0.17,
    );
    add(
      box(0.6, 0.32, 0.03, 0.08, 0.01, 2),
      M.glass,
      0.45,
      TOP + 0.28,
      eyeZ - 0.175,
    );
    add(cylZ(0.05, 0.02, 24), M.black, 0.9, TOP + 0.28, eyeZ - 0.18);
    // Pulsanti
    const bz = BACK - 0.02;
    const btn = (x: number, y: number, r = 0.1) =>
      add(cylZ(r, 0.08, 40), M.button, x, y, bz);
    btn(1.6, TOP - 0.2, 0.11);
    label("MENU", 0.34, 0.08, [1.25, TOP - 0.2, BACK - 0.005], Math.PI, 50);
    // Joystick
    add(cylZ(0.13, 0.06, 40), M.body, -0.75, TOP - 0.3, bz);
    add(cylZ(0.1, 0.16, 40), M.dialS, -0.75, TOP - 0.3, bz - 0.06);
    btn(-1.25, TOP - 0.22, 0.12);
    label("AF ON", 0.3, 0.08, [-1.25, TOP - 0.42, BACK - 0.005], Math.PI, 46);
    btn(-1.7, TOP - 0.18);
    btn(-1.7, TOP - 0.55);
    btn(-1.3, BODY_Y + 0.15);
    label("INFO", 0.3, 0.08, [-1.3, BODY_Y - 0.03, BACK - 0.005], Math.PI, 50);
    // Ghiera posteriore e croce direzionale
    add(cylZ(0.36, 0.08, 72), M.dialS, -1.42, BODY_Y - 0.5, bz);
    add(cylZ(0.27, 0.1, 64), M.button, -1.42, BODY_Y - 0.5, bz - 0.01);
    add(cylZ(0.12, 0.12, 48), M.body, -1.42, BODY_Y - 0.5, bz - 0.02);
    label("SET", 0.2, 0.08, [-1.42, BODY_Y - 0.5, bz - 0.085], Math.PI, 50);
    btn(-1.8, BOTTOM + 0.2, 0.1);
  }

  // Fondo: attacco del treppiede
  add(
    new THREE.CylinderGeometry(0.16, 0.16, 0.02, 32),
    M.metalD,
    0.45,
    BOTTOM - 0.005,
    0,
  );

  // ---------- Obiettivo ----------
  const lens = new THREE.Group();
  lens.position.set(0.45, 0.02, FRONT);
  model.add(lens);
  const addL = (
    geo: NonNullable<ConstructorParameters<typeof THREE.Mesh>[0]>,
    mat: NonNullable<ConstructorParameters<typeof THREE.Mesh>[1]>,
    z = 0,
  ) => add(geo, mat, 0, 0, z, lens);

  // Baionetta metallica e puntino di allineamento
  addL(
    lathe([
      [0.95, 0],
      [1.14, 0],
      [1.16, 0.02],
      [1.16, 0.09],
      [1.12, 0.11],
      [1.05, 0.11],
    ]),
    M.metal,
  );
  add(new THREE.SphereGeometry(0.03, 16, 16), M.white, 0, 1.13, 0.13, lens);
  // Fusto a tornio: base, fascia indici, frontale con il labbro interno
  addL(
    lathe([
      [1.04, 0.1],
      [1.07, 0.13],
      [1.07, 0.42],
      [1.04, 0.46],
      [1.0, 0.46],
      [1.0, 1.36],
      [1.02, 1.37],
      [1.03, 1.4],
      [1.03, 1.6],
      [1.0, 1.62],
      [0.98, 1.62],
      [0.98, 1.92],
      [1.02, 1.93],
      [1.04, 1.96],
      [1.04, 2.1],
      [1.02, 2.14],
      [0.97, 2.16],
      [0.93, 2.14],
      [0.92, 2.1],
      [0.9, 2.07],
    ]),
    M.lens,
  );
  // Ghiera dello zoom in gomma zigrinata, con i bordi arrotondati
  addL(cylZ(1.075, 0.86, 128, true), M.knurl, 0.91);
  addL(
    lathe([
      [1.0, 0.46],
      [1.05, 0.47],
      [1.075, 0.49],
    ]),
    M.knurl,
  );
  addL(
    lathe([
      [1.075, 1.33],
      [1.05, 1.35],
      [1.0, 1.36],
    ]),
    M.knurl,
  );
  // Ghiera della messa a fuoco, a righe sottili
  addL(cylZ(1.0, 0.28, 128, true), M.focus, 1.77);
  // Scala delle focali incisa sulla fascia
  {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff";
    g.textBaseline = "middle";
    g.textAlign = "center";
    g.font = `500 36px ${font}`;
    ["18", "24", "35", "50", "70", "100", "150"].forEach((v, i) =>
      g.fillText(v, 1024 + (i - 3) * 72, 34),
    );
    const m = addL(
      cylZ(1.034, 0.12, 128, true),
      labelMat(textCanvasTexture(c), 0.9),
      1.5,
    );
    m.castShadow = false;
  }
  add(box(0.03, 0.03, 0.08, 0.01, 0.005, 1), M.white, 0, 1.035, 1.44, lens);
  // La scritta sul frontale: focali e diametro del filtro
  {
    const c = document.createElement("canvas");
    c.width = 2048;
    c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = "#fff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = `500 30px ${font}`;
    g.fillText("18–150 mm  1:3.5–6.3   ·   Ø 55 mm", 1024, 34);
    const m = addL(
      cylZ(1.044, 0.1, 128, true),
      labelMat(textCanvasTexture(c), 0.75),
      2.03,
    );
    m.castShadow = false;
    m.rotation.z = Math.PI * 0.12;
  }
  // Interno: tubo nero e lenti con il trattamento antiriflesso
  addL(cylZ(0.9, 1.0, 64, true), M.black, 1.58);
  addL(cylZ(0.88, 0.02, 64), M.black, 1.1);
  const glassCap = (
    R: number,
    rr: number,
    zApex: number,
    mat: Three.Material,
  ) => {
    const t = Math.asin(Math.min(0.999, rr / R));
    const g = new THREE.SphereGeometry(R, 72, 18, 0, Math.PI * 2, 0, t);
    g.rotateX(Math.PI / 2);
    const m = add(g, mat, 0, 0, zApex - R, lens);
    m.castShadow = false;
  };
  glassCap(2.4, 0.5, 1.28, M.coatB); // elemento posteriore
  glassCap(1.6, 0.68, 1.62, M.coatA); // elemento intermedio
  addL(new THREE.TorusGeometry(0.7, 0.03, 12, 64), M.black, 1.6);
  glassCap(2.0, 0.9, 2.05, M.glass); // lente frontale
  addL(new THREE.TorusGeometry(0.905, 0.025, 12, 96), M.lens, 2.07);

  // Il display: un piano appena dietro lo schermo lucido, rivolto all'indietro, dove si vedono
  // le foto. Il materiale non risente delle luci, come uno schermo acceso. È nascosto finché
  // una scena non lo accende: altrove resta lo schermo spento del modello
  const display = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    toneMapped: false,
  });
  const displayMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(SCREEN_W, SCREEN_H),
    display,
  );
  displayMesh.position.set(0.3, BODY_Y - 0.12, BACK - 0.158);
  displayMesh.rotation.y = Math.PI;
  displayMesh.visible = false;
  model.add(displayMesh);

  // Il centro di rotazione sta fra corpo e obiettivo
  model.position.set(-0.1, 0, -0.95);

  return {
    model,
    display,
    displayMesh,
    /** Il punto più basso del corpo, per appoggiare un'ombra sotto */
    bottom: BOTTOM,
    setPalette(name: PaletteName) {
      const p = PALETTES[name];
      M.body.color.setHex(p.body);
      M.leather.color.setHex(p.leather);
      M.lens.color.setHex(p.lens);
      M.knurl.color.setHex(p.trim);
      M.focus.color.setHex(p.trim);
      for (const m of [M.dial, M.dialS, M.button])
        m.color.setHex(p.trim + 0x080808);
    },
    dispose() {
      model.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      for (const m of Object.values(M)) m.dispose();
      for (const m of extraMats) m.dispose();
      for (const t of textures) t.dispose();
      display.map?.dispose();
      display.dispose();
    },
  };
}
