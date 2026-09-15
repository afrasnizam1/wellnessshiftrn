import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { USDLoader } from 'three/examples/jsm/loaders/USDLoader.js';

type Preset =
  | 'brain'
  | 'lung'
  | 'stomach'
  | 'anatomy'
  | 'skeleton'
  | 'ecorche'
  | 'beatingHeart'
  | 'heartLungs'
  | 'heartBronchial';

const params = new URLSearchParams(window.location.search);
const modelFile = params.get('model') || 'Beating-heart';
const preset = (params.get('preset') || 'beatingHeart') as Preset;
let autoRotateRequested = params.get('autoRotate') === '1';

const canvas = document.getElementById('c') as HTMLCanvasElement;
const statusEl = document.getElementById('status') as HTMLDivElement;
const hintEl = document.getElementById('hint');
if (hintEl && autoRotateRequested) {
  hintEl.textContent = 'Rotates slowly · Pinch & drag to explore';
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setClearColor(0x000000, 1);
// Emulator / high-DPI WebViews struggle above 1.5× — big win for dense USDZ/point clouds.
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
camera.position.set(0, 0, 3);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.12;
controls.enablePan = false;
controls.target.set(0, 0, 0);
controls.minDistance = 0.4;
controls.maxDistance = 18;
controls.autoRotate = autoRotateRequested;
controls.autoRotateSpeed = 1.85;

let needsRender = true;
let resumeTimer: number | undefined;
const markDirty = () => {
  needsRender = true;
};
controls.addEventListener('change', markDirty);
controls.addEventListener('start', () => {
  controls.autoRotate = false;
  markDirty();
  if (resumeTimer) window.clearTimeout(resumeTimer);
});
controls.addEventListener('end', () => {
  markDirty();
  if (!autoRotateRequested) return;
  resumeTimer = window.setTimeout(() => {
    controls.autoRotate = true;
    markDirty();
  }, 2200);
});

let mixer: THREE.AnimationMixer | null = null;
let modelRoot: THREE.Object3D | null = null;
let pulse = false;
const clock = new THREE.Clock();

function resize() {
  const w = Math.max(1, window.innerWidth);
  const h = Math.max(1, window.innerHeight);
  renderer.setSize(w, h, true);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  needsRender = true;
}
window.addEventListener('resize', resize);
resize();

canvas.addEventListener('dblclick', () => {
  if (modelRoot) {
    const fill = (modelRoot.userData.fill as number) || 1.22;
    const fov = (modelRoot.userData.fieldOfView as number) || camera.fov;
    fitCamera(modelRoot, fov, fill);
  } else {
    controls.reset();
  }
});

let lightsReady = false;

function addLights(accentHex: number, accentIntensity: number, naturalColor: boolean) {
  if (lightsReady) return;
  lightsReady = true;
  const directional = new THREE.DirectionalLight(naturalColor ? 0xfff7f0 : 0xffffff, naturalColor ? 1.35 : 2.0);
  directional.position.set(3.2, 4.5, 3.8);
  scene.add(directional);

  const fill = new THREE.DirectionalLight(0xffffff, naturalColor ? 0.55 : 0.35);
  fill.position.set(-2.4, 1.8, 2.2);
  scene.add(fill);

  const ambient = new THREE.AmbientLight(0xffffff, naturalColor ? 0.55 : 0.8);
  scene.add(ambient);

  const accent = new THREE.DirectionalLight(accentHex, accentIntensity);
  accent.position.set(-1.6, 0.4, -2.4);
  scene.add(accent);
}

function worldBox(object: THREE.Object3D) {
  object.updateWorldMatrix(true, true);
  return new THREE.Box3().setFromObject(object);
}

/** Bounds from renderable meshes only — ignores empty nodes / bones that skew the center. */
function meshWorldBox(object: THREE.Object3D) {
  object.updateWorldMatrix(true, true);
  const box = new THREE.Box3();
  let found = false;
  object.traverse((child) => {
    const mesh = child as THREE.Mesh & THREE.SkinnedMesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    if (mesh.isSkinnedMesh && mesh.skeleton) {
      mesh.skeleton.update();
      mesh.updateMatrixWorld(true);
    }
    const part = new THREE.Box3().setFromObject(mesh);
    if (part.isEmpty()) return;
    box.union(part);
    found = true;
  });
  return found ? box : worldBox(object);
}

function recenterChild(object: THREE.Object3D) {
  const worldCenter = meshWorldBox(object).getCenter(new THREE.Vector3());
  if (!Number.isFinite(worldCenter.x)) return;
  const parent = object.parent;
  if (!parent) {
    object.position.sub(worldCenter);
    object.updateWorldMatrix(true, true);
    return;
  }
  object.position.sub(parent.worldToLocal(worldCenter.clone()));
  object.updateWorldMatrix(true, true);
}

function presetFraming(kind: Preset) {
  let targetSize = 2.15;
  let fieldOfView = 50;
  let fill = 1.26;
  let accent = 0x00ffff;
  let accentIntensity = 0.9;
  let naturalColor = false;
  switch (kind) {
    case 'brain':
      targetSize = 2.2;
      fieldOfView = 50;
      // Padding so the hologram sits fully inside the black frame.
      fill = 1.35;
      break;
    case 'anatomy':
      targetSize = 2.2;
      fill = 1.22;
      accent = 0xffd1bd;
      accentIntensity = 0.35;
      naturalColor = true;
      break;
    case 'lung':
      targetSize = 2.25;
      fill = 1.4;
      break;
    case 'stomach':
      targetSize = 2.1;
      fieldOfView = 48;
      fill = 1.2;
      break;
    case 'skeleton':
      targetSize = 2.35;
      fill = 1.3;
      break;
    case 'ecorche':
      targetSize = 2.35;
      fill = 1.3;
      accent = 0xffd1bd;
      accentIntensity = 0.35;
      naturalColor = true;
      break;
    case 'beatingHeart':
      // Skinned USDZ — mesh-centered; lower fill = closer / larger on screen.
      targetSize = 1.45;
      fieldOfView = 52;
      fill = 1.75;
      accent = 0xff0000;
      accentIntensity = 1.0;
      pulse = true;
      break;
    case 'heartLungs':
      targetSize = 2.3;
      fieldOfView = 52;
      fill = 1.32;
      accent = 0xffffff;
      break;
    case 'heartBronchial':
      targetSize = 2.25;
      fill = 1.28;
      accent = 0xffffff;
      break;
    default:
      break;
  }
  return { targetSize, fieldOfView, fill, accent, accentIntensity, naturalColor };
}

function stripCameras(object: THREE.Object3D) {
  const remove: THREE.Object3D[] = [];
  object.traverse((child) => {
    if ((child as THREE.Camera).isCamera) remove.push(child);
  });
  remove.forEach((child) => child.parent?.remove(child));
}

/** Cut GPU cost for dense holograms (esp. brain point clouds) in Android WebView. */
function optimizeForMobile(root: THREE.Object3D) {
  root.traverse((child) => {
    child.frustumCulled = true;

    const points = child as THREE.Points;
    if (points.isPoints && points.geometry) {
      const pos = points.geometry.getAttribute('position');
      const count = pos?.count ?? 0;
      // Subsample very dense clouds — keeps silhouette, halves/triples draw cost.
      if (count > 40000 && pos) {
        const stride = count > 120000 ? 3 : 2;
        const nextCount = Math.floor(count / stride);
        const src = pos.array as ArrayLike<number>;
        const dst = new Float32Array(nextCount * 3);
        for (let i = 0, j = 0; i < nextCount; i++, j += stride) {
          const o = j * 3;
          dst[i * 3] = src[o];
          dst[i * 3 + 1] = src[o + 1];
          dst[i * 3 + 2] = src[o + 2];
        }
        points.geometry.setAttribute('position', new THREE.BufferAttribute(dst, 3));
        points.geometry.computeBoundingSphere();
      }
      const mats = Array.isArray(points.material) ? points.material : [points.material];
      mats.forEach((mat) => {
        const pm = mat as THREE.PointsMaterial;
        if (pm.isPointsMaterial) {
          pm.size = Math.min(pm.size || 0.02, 0.035);
          pm.sizeAttenuation = true;
          pm.transparent = false;
          pm.depthWrite = true;
          pm.needsUpdate = true;
        }
      });
      return;
    }

    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    list.forEach((mat) => {
      mat.precision = 'mediump';
      if ('envMap' in mat) (mat as THREE.MeshStandardMaterial).envMap = null;
      if ('flatShading' in mat) (mat as THREE.MeshStandardMaterial).flatShading = false;
      mat.needsUpdate = true;
    });
  });
}

function fitCamera(object: THREE.Object3D, fieldOfView: number, fill: number) {
  const box = meshWorldBox(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  if (!Number.isFinite(center.x) || !Number.isFinite(center.y) || !Number.isFinite(center.z)) {
    return;
  }
  // Fit to visible width/height (ignore depth) so organs fill the black frame.
  const fitHeight = Math.max(size.y, 0.01);
  const fitWidth = Math.max(size.x, 0.01);
  const framed = Math.max(fitWidth, fitHeight, size.z * 0.35, 0.8);
  const fov = (fieldOfView * Math.PI) / 180;
  const aspect = Math.max(camera.aspect, 0.2);
  const distVertical = fitHeight / 2 / Math.tan(fov / 2);
  const hFov = 2 * Math.atan(Math.tan(fov / 2) * aspect);
  const distHorizontal = fitWidth / 2 / Math.tan(hFov / 2);
  const cameraDistance = Math.max(distVertical, distHorizontal) * fill;
  // Aggressive floor is only for skinned heart (high fill); others may fill the screen.
  const minFloor = fill >= 1.6 ? Math.max(framed * 1.25, 1.9) : framed * 0.4;
  const safeDistance = Math.max(cameraDistance, minFloor);

  camera.fov = fieldOfView;
  camera.near = Math.max(0.05, safeDistance / 80);
  camera.far = Math.max(100, safeDistance * 20);
  camera.up.set(0, 1, 0);
  camera.position.set(center.x, center.y, center.z + safeDistance);
  camera.lookAt(center.x, center.y, center.z);
  camera.updateProjectionMatrix();

  controls.target.set(center.x, center.y, center.z);
  controls.minDistance = safeDistance * 0.55;
  controls.maxDistance = safeDistance * 5;
  controls.update();
  controls.saveState();
  needsRender = true;
}

function isNearWhite(color: THREE.Color) {
  const maxC = Math.max(color.r, color.g, color.b);
  const minC = Math.min(color.r, color.g, color.b);
  const sat = maxC > 0.001 ? (maxC - minC) / maxC : 0;
  return sat < 0.18 && maxC > 0.4;
}

function toStandardMaterial(mat: THREE.Material): THREE.MeshStandardMaterial {
  if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
    return mat as THREE.MeshStandardMaterial;
  }
  const anyMat = mat as THREE.MeshPhongMaterial & THREE.MeshBasicMaterial;
  return new THREE.MeshStandardMaterial({
    color: anyMat.color?.clone?.() ?? new THREE.Color(0xffffff),
    map: anyMat.map ?? null,
    roughness: 0.52,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });
}

function applyNaturalAnatomyMaterials(root: THREE.Object3D, splitSkeleton: boolean) {
  const muscle = new THREE.Color('#C45A48');
  const bone = new THREE.Color('#F3EEE8');
  root.updateWorldMatrix(true, true);

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material || !mesh.geometry) return;
    const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const box = worldBox(mesh);
    const minX = box.min.x;
    const maxX = box.max.x;
    const centerX = (minX + maxX) / 2;
    const straddles = splitSkeleton && minX < -0.02 && maxX > 0.02 && maxX - minX > 0.08;
    if (splitSkeleton && straddles) {
      paintSplitVertexColors(mesh, root, muscle, bone);
    }

    const next = list.map((mat) => {
      const std = toStandardMaterial(mat);
      if (splitSkeleton && straddles) {
        std.vertexColors = true;
        std.color.set('#ffffff');
      } else if (splitSkeleton) {
        std.vertexColors = false;
        std.color.copy(centerX >= 0 ? bone : muscle);
        std.metalness = centerX >= 0 ? 0.12 : 0.08;
        std.roughness = centerX >= 0 ? 0.42 : 0.52;
      } else {
        const hasVertex = Boolean(mesh.geometry.getAttribute('color'));
        if (hasVertex) std.vertexColors = true;
        if (!std.map && !hasVertex && isNearWhite(std.color)) {
          std.color.copy(muscle);
        }
      }
      std.side = THREE.DoubleSide;
      std.needsUpdate = true;
      return std;
    });
    mesh.material = next.length === 1 ? next[0] : next;
  });
}

function paintSplitVertexColors(
  mesh: THREE.Mesh,
  root: THREE.Object3D,
  muscle: THREE.Color,
  bone: THREE.Color,
) {
  const geom = mesh.geometry.clone();
  const pos = geom.getAttribute('position');
  if (!pos) return;
  mesh.geometry = geom;
  const colors = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3();
  const mixed = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    mesh.localToWorld(v);
    root.worldToLocal(v);
    const t = Math.min(1, Math.max(0, (v.x + 0.015) / 0.03));
    mixed.copy(muscle).lerp(bone, t);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function applyPreset(root: THREE.Object3D, kind: Preset) {
  const framing = presetFraming(kind);
  const scaler = new THREE.Group();
  scene.add(scaler);
  scaler.add(root);

  recenterChild(root);
  const size = meshWorldBox(root).getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z) || 1;
  const appliedScale = Math.min(Math.max(framing.targetSize / maxDimension, 0.02), 25);
  scaler.scale.setScalar(appliedScale);
  scaler.userData.baseScale = appliedScale;
  scaler.userData.fill = framing.fill;
  scaler.userData.fieldOfView = framing.fieldOfView;
  recenterChild(root);

  if (framing.naturalColor) {
    applyNaturalAnatomyMaterials(root, kind === 'anatomy');
    renderer.toneMappingExposure = 1.18;
  }
  addLights(framing.accent, framing.accentIntensity, framing.naturalColor);
  fitCamera(scaler, framing.fieldOfView, framing.fill);
  modelRoot = scaler;
}

async function load() {
  statusEl.textContent = 'Loading 3D model…';
  const loader = new USDLoader();
  const url = `./models/${encodeURIComponent(modelFile)}.usdz`;
  try {
    const loaded: any = await loader.loadAsync(url);
    const root: THREE.Object3D = loaded?.scene ?? loaded;
    if (!root) throw new Error('Empty model');
    stripCameras(root);
    optimizeForMobile(root);
    applyPreset(root, preset);

    const found = (loaded?.animations as THREE.AnimationClip[] | undefined) ?? [];
    if (found.length > 0) {
      mixer = new THREE.AnimationMixer(root);
      found.forEach((clip) => mixer!.clipAction(clip).play());
      pulse = false;
    }

    const refit = () => {
      if (!modelRoot) return;
      // Advance skinned pose once so mesh bounds match what the user sees.
      mixer?.update(0);
      const inner = modelRoot.children[0];
      if (inner) recenterChild(inner);
      const fill = (modelRoot.userData.fill as number) || 1.22;
      const fov = (modelRoot.userData.fieldOfView as number) || camera.fov;
      fitCamera(modelRoot, fov, fill);
    };

    // Skinned/animated USDZ bounds settle after the first frames — re-frame like iOS.
    requestAnimationFrame(refit);
    window.setTimeout(refit, 350);
    window.setTimeout(refit, 900);

    statusEl.style.display = 'none';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Couldn’t load 3D model';
  }
}

function tick() {
  requestAnimationFrame(tick);
  const dt = clock.getDelta();
  let animating = false;
  if (mixer) {
    mixer.update(dt);
    animating = true;
  }
  if (pulse && modelRoot) {
    const base = (modelRoot.userData.baseScale as number) || 1;
    const s = base * (1 + Math.sin(clock.elapsedTime * 6.8) * 0.035);
    modelRoot.scale.setScalar(s);
    animating = true;
  }
  const damping = controls.update();
  if (animating || damping || controls.autoRotate || needsRender) {
    renderer.render(scene, camera);
    needsRender = Boolean(damping || controls.autoRotate || animating);
  }
}

load();
tick();
