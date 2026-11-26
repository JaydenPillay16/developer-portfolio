import {
  BufferGeometry, Group, Line, LineBasicMaterial, OrthographicCamera,
  Points, PointsMaterial, Scene, Vector3, WebGLRenderer,
} from "three";

export type OrbitScene = { render: (progress: number) => void; dispose: () => void };

const turn = Math.PI * 2;

function arc(radius: number, start: number, length: number, segments: number) {
  const vertices = Array.from({ length: segments + 1 }, (_, index) => {
    const angle = start + (index / segments) * length;
    return new Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  });
  return new BufferGeometry().setFromPoints(vertices);
}

export function createOrbit(mount: HTMLElement): OrbitScene | undefined {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true, antialias: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: true,
  });
  if (!context) return;
  const renderer = new WebGLRenderer({ canvas, context, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setSize(540, 540, false);
  const scene = new Scene();
  const camera = new OrthographicCamera(-1.25, 1.25, 1.25, -1.25, 0.1, 10);
  camera.position.z = 4;
  const rig = new Group();
  scene.add(rig);

  const mainRing = new Group();
  mainRing.rotation.set(0.94, 0.30, -0.36);
  rig.add(mainRing);
  const ringGeometry = arc(1.03, 0, turn, 100);
  const ringMaterial = new LineBasicMaterial({ color: 0x73acff, transparent: true, opacity: 0.65 });
  mainRing.add(new Line(ringGeometry, ringMaterial));

  const secondRing = new Line(ringGeometry, new LineBasicMaterial({ color: 0x5396f5, transparent: true, opacity: 0.34 }));
  secondRing.rotation.set(-0.48, 0.77, 0.42);
  rig.add(secondRing);

  const sweepGeometry = arc(1.03, -0.63, 0.63, 28);
  const sweepMaterial = new LineBasicMaterial({ color: 0xe7f6ff, transparent: true, opacity: 0.96 });
  const sweep = new Line(sweepGeometry, sweepMaterial);
  mainRing.add(sweep);

  const pointGeometry = new BufferGeometry().setFromPoints([new Vector3()]);
  const pointMaterial = new PointsMaterial({ color: 0xcbeaff, size: 4, sizeAttenuation: false });
  const marker = new Points(pointGeometry, pointMaterial);
  mainRing.add(marker);

  mount.append(canvas);
  mount.dataset.webgl = "";
  let disposed = false;
  let lastProgress = -1;
  const render = (progress: number) => {
    if (disposed || document.hidden || progress === lastProgress) return;
    lastProgress = progress;
    const angle = -1.15 + progress * turn * 0.95;
    rig.rotation.set(-0.36 + progress * 0.67, -0.24 + progress * 0.37, 0.06 - progress * 0.32);
    sweep.rotation.z = angle;
    marker.position.set(Math.cos(angle) * 1.03, Math.sin(angle) * 1.03, 0);
    renderer.render(scene, camera);
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    canvas.removeEventListener("webglcontextlost", dispose);
    canvas.remove();
    delete mount.dataset.webgl;
    ringGeometry.dispose();
    sweepGeometry.dispose();
    pointGeometry.dispose();
    ringMaterial.dispose();
    secondRing.material.dispose();
    sweepMaterial.dispose();
    pointMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
  canvas.addEventListener("webglcontextlost", dispose);
  render(0);
  return { render, dispose };
}
