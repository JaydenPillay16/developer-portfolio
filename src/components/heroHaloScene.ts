import { gsap } from "gsap";
import { Camera, Mesh, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from "three";

export function playHaloSweep(container: HTMLElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!context) return;

  const renderer = new WebGLRenderer({ canvas, context });
  renderer.setSize(360, 360, false);
  const scene = new Scene();
  const camera = new Camera();
  const geometry = new PlaneGeometry(2, 2);
  const uniforms = {
    angle: { value: 1.8 },
    strength: { value: 0 },
  };
  const material = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec2 point;
      void main() {
        point = uv * 2.0 - 1.0;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 point;
      uniform float angle;
      uniform float strength;
      void main() {
        float radius = length(point);
        float direction = atan(point.y, point.x);
        float lobe = pow(max(0.0, cos(direction - angle)), 3.0);
        float distance = (radius - 0.72) / 0.27;
        float light = exp(-distance * distance);
        float edge = 1.0 - smoothstep(0.79, 1.0, radius);
        gl_FragColor = vec4(0.19, 0.61, 1.0, strength * lobe * light * edge);
      }
    `,
  });
  scene.add(new Mesh(geometry, material));

  let lastFrame = -Infinity;
  let disposed = false;
  const timeline = gsap.timeline({ paused: true });

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    timeline.kill();
    canvas.removeEventListener("webglcontextlost", dispose);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };

  canvas.addEventListener("webglcontextlost", dispose);
  container.append(canvas);

  timeline
    .to(uniforms.angle, { value: -0.65, duration: 1.35, ease: "sine.inOut" }, 0)
    .to(uniforms.strength, { value: 0.47, duration: 0.36, ease: "power2.out" }, 0)
    .to(uniforms.strength, { value: 0, duration: 0.62, ease: "sine.inOut" }, 0.73)
    .eventCallback("onUpdate", () => {
      const now = performance.now();
      if (now - lastFrame < 1000 / 30) return;
      lastFrame = now;
      renderer.render(scene, camera);
    })
    .eventCallback("onComplete", dispose)
    .play();

  return dispose;
}
