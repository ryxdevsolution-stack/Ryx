import * as THREE from 'three';
import {
  getParticleCount,
  PARTICLE_SIZE,
  CAMERA_POSITION,
  CAMERA_FOV,
  SPRING_STIFFNESS,
  SPRING_DAMPING,
  ROTATION_NORMAL,
  ROTATION_MORPH,
  ROTATION_SETTLE_DURATION,
  MOUSE_REPULSION_RADIUS,
  MOUSE_REPULSION_FORCE,
  MOUSE_OFF_SCREEN,
  NOISE_SCALE,
  NOISE_AMPLITUDE,
  COLOR_LERP_SPEED,
  ROTATION_LERP_SPEED,
  SERVICE_GRADIENT_PAIRS,
  DEFAULT_GRADIENT_PAIR,
} from './constants';
import { generateSphere, getShapeGenerator } from './shape-generators';

function noise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

export class MorphEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;

  private particleCount: number;
  private positions: Float32Array;
  private velocities: Float32Array;
  private targets: Float32Array;

  // Per-particle colors
  private colors: Float32Array;
  private targetColors: Float32Array;

  private rotationSpeed: number = ROTATION_NORMAL;
  private targetRotationSpeed: number = ROTATION_NORMAL;
  private rotationSettleTime: number = 0;

  private mouse: THREE.Vector2 = new THREE.Vector2(MOUSE_OFF_SCREEN, MOUSE_OFF_SCREEN);
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mousePlane: THREE.Plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private mouse3D: THREE.Vector3 = new THREE.Vector3(MOUSE_OFF_SCREEN, MOUSE_OFF_SCREEN, MOUSE_OFF_SCREEN);
  private _intersectTemp: THREE.Vector3 = new THREE.Vector3();

  private animationId: number = 0;
  private isRunning: boolean = false;
  private time: number = 0;
  private lastTimestamp: number = 0;
  private activeShape: number | null = null;

  private particleTexture: THREE.Texture;

  constructor(canvas: HTMLCanvasElement) {
    this.particleCount = getParticleCount();

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setClearColor(0x000000, 0); // Fully transparent

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);

    this.particleTexture = this.createParticleTexture();

    // Init position arrays
    this.positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    this.targets = generateSphere(this.particleCount);
    this.positions.set(this.targets);

    // Init per-particle color arrays
    this.colors = new Float32Array(this.particleCount * 3);
    this.targetColors = new Float32Array(this.particleCount * 3);
    this.setGradientColors(DEFAULT_GRADIENT_PAIR[0], DEFAULT_GRADIENT_PAIR[1], true);

    // Geometry with position + color attributes
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    // Material: vertexColors for per-particle coloring, no additive blending
    this.material = new THREE.PointsMaterial({
      size: PARTICLE_SIZE,
      map: this.particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  private createParticleTexture(): THREE.Texture {
    const size = 64;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d')!;

    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(offscreen);
    texture.needsUpdate = true;
    return texture;
  }

  /** Set gradient target colors for all particles (interpolate between two hex colors) */
  private setGradientColors(hex1: string, hex2: string, immediate = false): void {
    const c1 = new THREE.Color(hex1);
    const c2 = new THREE.Color(hex2);
    const tempColor = new THREE.Color();

    for (let i = 0; i < this.particleCount; i++) {
      const t = Math.random(); // Each particle gets a random spot in the gradient
      tempColor.copy(c1).lerp(c2, t);

      // Slight random brightness variation for depth
      const brightness = 0.85 + Math.random() * 0.3;
      this.targetColors[i * 3] = tempColor.r * brightness;
      this.targetColors[i * 3 + 1] = tempColor.g * brightness;
      this.targetColors[i * 3 + 2] = tempColor.b * brightness;

      if (immediate) {
        this.colors[i * 3] = this.targetColors[i * 3];
        this.colors[i * 3 + 1] = this.targetColors[i * 3 + 1];
        this.colors[i * 3 + 2] = this.targetColors[i * 3 + 2];
      }
    }
  }

  morphTo(serviceIndex: number | null): void {
    if (serviceIndex === this.activeShape) return;
    this.activeShape = serviceIndex;

    const generator = getShapeGenerator(serviceIndex);
    this.targets = generator(this.particleCount);

    // Set target colors from gradient pair
    if (serviceIndex !== null && serviceIndex >= 0 && serviceIndex < SERVICE_GRADIENT_PAIRS.length) {
      const [c1, c2] = SERVICE_GRADIENT_PAIRS[serviceIndex];
      this.setGradientColors(c1, c2);
    } else {
      this.setGradientColors(DEFAULT_GRADIENT_PAIR[0], DEFAULT_GRADIENT_PAIR[1]);
    }

    this.targetRotationSpeed = ROTATION_MORPH;
    this.rotationSettleTime = ROTATION_SETTLE_DURATION;
  }

  updateMouse(x: number, y: number): void {
    this.mouse.set(x, y);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hit = this.raycaster.ray.intersectPlane(this.mousePlane, this._intersectTemp);
    if (hit) {
      this.mouse3D.copy(this._intersectTemp);
    }
  }

  private update(deltaTime: number): void {
    this.time += deltaTime;

    // Rotation speed settle
    if (this.rotationSettleTime > 0) {
      this.rotationSettleTime -= deltaTime;
      if (this.rotationSettleTime <= 0) {
        this.targetRotationSpeed = ROTATION_NORMAL;
      }
    }
    this.rotationSpeed += (this.targetRotationSpeed - this.rotationSpeed) * ROTATION_LERP_SPEED;
    this.points.rotation.y += this.rotationSpeed;

    // Per-particle update
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Spring toward target
      const dx = this.targets[i3] - this.positions[i3];
      const dy = this.targets[i3 + 1] - this.positions[i3 + 1];
      const dz = this.targets[i3 + 2] - this.positions[i3 + 2];

      this.velocities[i3] += dx * SPRING_STIFFNESS;
      this.velocities[i3 + 1] += dy * SPRING_STIFFNESS;
      this.velocities[i3 + 2] += dz * SPRING_STIFFNESS;

      // Noise drift
      const nx = noise3D(
        this.positions[i3] * NOISE_SCALE + this.time * 0.3,
        this.positions[i3 + 1] * NOISE_SCALE,
        this.positions[i3 + 2] * NOISE_SCALE
      );
      const ny = noise3D(
        this.positions[i3] * NOISE_SCALE,
        this.positions[i3 + 1] * NOISE_SCALE + this.time * 0.3,
        this.positions[i3 + 2] * NOISE_SCALE + 100
      );
      const nz = noise3D(
        this.positions[i3] * NOISE_SCALE + 200,
        this.positions[i3 + 1] * NOISE_SCALE,
        this.positions[i3 + 2] * NOISE_SCALE + this.time * 0.3
      );

      this.velocities[i3] += nx * NOISE_AMPLITUDE;
      this.velocities[i3 + 1] += ny * NOISE_AMPLITUDE;
      this.velocities[i3 + 2] += nz * NOISE_AMPLITUDE;

      // Mouse repulsion
      const mx = this.positions[i3] - this.mouse3D.x;
      const my = this.positions[i3 + 1] - this.mouse3D.y;
      const mz = this.positions[i3 + 2] - this.mouse3D.z;
      const mouseDist = Math.sqrt(mx * mx + my * my + mz * mz);

      if (mouseDist < MOUSE_REPULSION_RADIUS && mouseDist > 0.01) {
        const force = MOUSE_REPULSION_FORCE * (1 - mouseDist / MOUSE_REPULSION_RADIUS);
        const invDist = 1 / mouseDist;
        this.velocities[i3] += mx * invDist * force;
        this.velocities[i3 + 1] += my * invDist * force;
        this.velocities[i3 + 2] += mz * invDist * force;
      }

      // Damping
      this.velocities[i3] *= SPRING_DAMPING;
      this.velocities[i3 + 1] *= SPRING_DAMPING;
      this.velocities[i3 + 2] *= SPRING_DAMPING;

      // Apply velocity
      this.positions[i3] += this.velocities[i3];
      this.positions[i3 + 1] += this.velocities[i3 + 1];
      this.positions[i3 + 2] += this.velocities[i3 + 2];

      // Smooth color transition per particle
      this.colors[i3] += (this.targetColors[i3] - this.colors[i3]) * COLOR_LERP_SPEED;
      this.colors[i3 + 1] += (this.targetColors[i3 + 1] - this.colors[i3 + 1]) * COLOR_LERP_SPEED;
      this.colors[i3 + 2] += (this.targetColors[i3 + 2] - this.colors[i3 + 2]) * COLOR_LERP_SPEED;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }

  private animate = (timestamp: number): void => {
    if (!this.isRunning) return;

    const delta = this.lastTimestamp
      ? Math.min((timestamp - this.lastTimestamp) / 1000, 0.05)
      : 1 / 60;
    this.lastTimestamp = timestamp;

    this.update(delta);
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = 0;
    this.animationId = requestAnimationFrame(this.animate);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose(): void {
    this.stop();
    this.geometry.dispose();
    this.material.dispose();
    this.particleTexture.dispose();
    this.renderer.dispose();
  }
}
