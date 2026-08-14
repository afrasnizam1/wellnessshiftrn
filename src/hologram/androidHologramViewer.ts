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

const canvas = document.getElementById('c') as HTMLCanvasElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
renderer.setClearColor(0x000000, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
camera.position.set(0, 0, 3);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = true;
controls.target.set(0, 0, 0);
controls.minDistance = 0.4;
controls.maxDistance = 18;

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
}
window.addEventListener('resize', resize);
resize();

canvas.addEventListener('dblclick', () => {
  controls.reset();
});

let lightsReady = false;

function addLights(accentHex: number, accentIntensity: number) {
  if (lightsReady) return;
  lightsReady = true;
  const directional = new THREE.DirectionalLight(0xffffff, 2.0);
  directional.position.set(2, 2, 2);
  scene.add(directional);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  const accent = new THREE.DirectionalLight(accentHex, accentIntensity);
  accent.position.set(-1, -1, -1);
  scene.add(accent);
}

function worldBox(object: THREE.Object3D) {
  object.updateWorldMatrix(true, true);
  return new THREE.Box3().setFromObject(object);
}

function recenterChild(object: THREE.Object3D) {
  const worldCenter = worldBox(object).getCenter(new THREE.Vector3());
  const parent = object.parent;
  if (!parent) {
    object.position.sub(worldCenter);
    return;
  }
  object.position.sub(parent.worldToLocal(worldCenter.clone()));
}

function presetFraming(kind: Preset) {
  let targetSize = 2.15;
  let fieldOfView = 50;
  let fill = 1.26;
  let accent = 0x00ffff;
  let accentIntensity = 1.5;
  switch (kind) {
    case 'brain':
    case 'anatomy':
      targetSize = 2.2;
      fill = 1.22;
      break;
    case 'lung':
      targetSize = 2.25;
      fill = 1.24;
      break;
    case 'stomach':
      targetSize = 2.1;
      fieldOfView = 48;
      fill = 1.2;
      break;
    case 'skeleton':
    case 'ecorche':
      targetSize = 2.35;
      fill = 1.3;
      break;
    case 'beatingHeart':
      targetSize = 2.05;
      fill = 1.18;
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
  return { targetSize, fieldOfView, fill, accent, accentIntensity };
}

function fitCamera(object: THREE.Object3D, fieldOfView: number, fill: number) {
  const box = worldBox(object);
  const size = box.getSize(new THREE.Vector3());
  const framed = Math.max(size.x, size.y, size.z) || 2;
  const fov = (fieldOfView * Math.PI) / 180;
  const cameraDistance = (framed / 2 / Math.tan(fov / 2)) * fill;
  camera.fov = fieldOfView;
  camera.near = Math.max(0.01, cameraDistance / 100);
  camera.far = Math.max(100, cameraDistance * 20);
  camera.position.set(0, 0, cameraDistance);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  controls.target.set(0, 0, 0);
  controls.minDistance = cameraDistance * 0.4;
  controls.maxDistance = cameraDistance * 3.5;
  controls.update();
  controls.saveState();
}

function applyPreset(root: THREE.Object3D, kind: Preset) {
  const framing = presetFraming(kind);
  const scaler = new THREE.Group();
  scene.add(scaler);
  scaler.add(root);

  recenterChild(root);
  const size = worldBox(root).getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z) || 1;
  const appliedScale = framing.targetSize / maxDimension;
  scaler.scale.setScalar(appliedScale);
  scaler.userData.baseScale = appliedScale;
  scaler.userData.fill = framing.fill;
  recenterChild(root);

  addLights(framing.accent, framing.accentIntensity);
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
    applyPreset(root, preset);
    requestAnimationFrame(() => {
      if (!modelRoot) return;
      const inner = modelRoot.children[0];
      if (inner) recenterChild(inner);
      const fill = (modelRoot.userData.fill as number) || 1.22;
      fitCamera(modelRoot, camera.fov, fill);
    });

    const found = (loaded?.animations as THREE.AnimationClip[] | undefined) ?? [];
    if (found.length > 0) {
      mixer = new THREE.AnimationMixer(root);
      found.forEach((clip) => mixer!.clipAction(clip).play());
      pulse = false;
    }

    statusEl.style.display = 'none';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Couldn’t load 3D model';
  }
}

function tick() {
  requestAnimationFrame(tick);
  const dt = clock.getDelta();
  mixer?.update(dt);
  if (pulse && modelRoot) {
    const base = (modelRoot.userData.baseScale as number) || 1;
    const s = base * (1 + Math.sin(clock.elapsedTime * 6.8) * 0.035);
    modelRoot.scale.setScalar(s);
  }
  controls.update();
  renderer.render(scene, camera);
}

load();
tick();
