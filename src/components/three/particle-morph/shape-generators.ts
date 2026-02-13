import * as THREE from 'three';
import { getParticleCount } from './constants';

/** Distribute points on/in a geometry using surface sampling with volume jitter */
function surfaceSample(geometry: THREE.BufferGeometry, count: number, jitter = 0.4): Float32Array {
  const positions = new Float32Array(count * 3);
  const posAttr = geometry.getAttribute('position');
  const faceCount = Math.floor(posAttr.count / 3);

  for (let i = 0; i < count; i++) {
    const faceIdx = Math.floor(Math.random() * faceCount) * 3;
    const a = new THREE.Vector3().fromBufferAttribute(posAttr, faceIdx);
    const b = new THREE.Vector3().fromBufferAttribute(posAttr, faceIdx + 1);
    const c = new THREE.Vector3().fromBufferAttribute(posAttr, faceIdx + 2);

    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }

    const point = a.clone()
      .add(b.clone().sub(a).multiplyScalar(u))
      .add(c.clone().sub(a).multiplyScalar(v));

    point.x += (Math.random() - 0.5) * jitter;
    point.y += (Math.random() - 0.5) * jitter;
    point.z += (Math.random() - 0.5) * jitter;

    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;
  }

  geometry.dispose();
  return positions;
}

/** Default: Sphere */
export function generateSphere(count = getParticleCount()): Float32Array {
  const geo = new THREE.SphereGeometry(5, 32, 32);
  return surfaceSample(geo, count, 0.6);
}

/** Service 0: Web Development - Code brackets </> */
export function generateCodeBrackets(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);
  const perPart = Math.floor(count / 3);

  // Left bracket <
  for (let i = 0; i < perPart; i++) {
    const t = Math.random();
    const half = t < 0.5;
    const progress = half ? t * 2 : (t - 0.5) * 2;

    positions[i * 3] = half
      ? THREE.MathUtils.lerp(-2, -4.5, progress)
      : THREE.MathUtils.lerp(-4.5, -2, progress);
    positions[i * 3 + 1] = half
      ? THREE.MathUtils.lerp(4, 0, progress)
      : THREE.MathUtils.lerp(0, -4, progress);
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

    // Add thickness
    positions[i * 3] += (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] += (Math.random() - 0.5) * 0.5;
  }

  // Slash /
  for (let i = 0; i < perPart; i++) {
    const idx = (perPart + i) * 3;
    const t = Math.random();

    positions[idx] = THREE.MathUtils.lerp(1.2, -1.2, t);
    positions[idx + 1] = THREE.MathUtils.lerp(4, -4, t);
    positions[idx + 2] = (Math.random() - 0.5) * 1.5;

    positions[idx] += (Math.random() - 0.5) * 0.4;
    positions[idx + 1] += (Math.random() - 0.5) * 0.4;
  }

  // Right bracket >
  const remaining = count - perPart * 2;
  for (let i = 0; i < remaining; i++) {
    const idx = (perPart * 2 + i) * 3;
    const t = Math.random();
    const half = t < 0.5;
    const progress = half ? t * 2 : (t - 0.5) * 2;

    positions[idx] = half
      ? THREE.MathUtils.lerp(2, 4.5, progress)
      : THREE.MathUtils.lerp(4.5, 2, progress);
    positions[idx + 1] = half
      ? THREE.MathUtils.lerp(4, 0, progress)
      : THREE.MathUtils.lerp(0, -4, progress);
    positions[idx + 2] = (Math.random() - 0.5) * 1.5;

    positions[idx] += (Math.random() - 0.5) * 0.5;
    positions[idx + 1] += (Math.random() - 0.5) * 0.5;
  }

  return positions;
}

/** Service 1: Database - Stacked cylinders */
export function generateDatabase(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);
  const perCylinder = Math.floor(count / 3);

  for (let c = 0; c < 3; c++) {
    const yOffset = (1 - c) * 3.2; // Stack vertically
    const startIdx = c * perCylinder;
    const thisCount = c < 2 ? perCylinder : count - perCylinder * 2;

    const geo = new THREE.CylinderGeometry(3.5, 3.5, 2, 24, 1, false);
    const pts = surfaceSample(geo, thisCount, 0.3);

    for (let i = 0; i < thisCount; i++) {
      positions[(startIdx + i) * 3] = pts[i * 3];
      positions[(startIdx + i) * 3 + 1] = pts[i * 3 + 1] + yOffset;
      positions[(startIdx + i) * 3 + 2] = pts[i * 3 + 2];
    }
  }

  return positions;
}

/** Service 2: Mobile Development - Phone outline */
export function generatePhone(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);
  const width = 4;
  const height = 7;
  const radius = 0.8;
  const depth = 1;

  for (let i = 0; i < count; i++) {
    const section = Math.random();

    if (section < 0.7) {
      // Body (rounded rectangle)
      const edge = Math.random();
      let x: number, y: number;

      if (edge < 0.25) {
        // Left edge
        x = -width / 2;
        y = THREE.MathUtils.lerp(-height / 2 + radius, height / 2 - radius, Math.random());
      } else if (edge < 0.5) {
        // Right edge
        x = width / 2;
        y = THREE.MathUtils.lerp(-height / 2 + radius, height / 2 - radius, Math.random());
      } else if (edge < 0.75) {
        // Top edge
        x = THREE.MathUtils.lerp(-width / 2 + radius, width / 2 - radius, Math.random());
        y = height / 2;
      } else {
        // Bottom edge
        x = THREE.MathUtils.lerp(-width / 2 + radius, width / 2 - radius, Math.random());
        y = -height / 2;
      }

      positions[i * 3] = x + (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth;
    } else if (section < 0.85) {
      // Screen area (inner rectangle, filled)
      positions[i * 3] = (Math.random() - 0.5) * (width - 0.8);
      positions[i * 3 + 1] = (Math.random() - 0.5) * (height - 2);
      positions[i * 3 + 2] = depth / 2 + (Math.random() - 0.5) * 0.2;
    } else if (section < 0.92) {
      // Top notch
      const angle = Math.random() * Math.PI;
      const r = Math.random() * 0.5;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height / 2 - 0.5 + Math.sin(angle) * r * 0.3;
      positions[i * 3 + 2] = depth / 2 + 0.1;
    } else {
      // Home button / bottom bar
      positions[i * 3] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = -height / 2 + 0.5 + (Math.random() - 0.5) * 0.15;
      positions[i * 3 + 2] = depth / 2 + 0.1;
    }
  }

  return positions;
}

/** Service 3: UI/UX Design - Pen tool / Bezier curve */
export function generatePenTool(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);
  const perPart = Math.floor(count / 4);

  // Bezier curve (main path)
  for (let i = 0; i < perPart * 2; i++) {
    const t = Math.random();
    // Cubic bezier: P0(-5,-3), P1(-2,5), P2(2,-5), P3(5,3)
    const mt = 1 - t;
    const x = mt * mt * mt * (-5) + 3 * mt * mt * t * (-2) + 3 * mt * t * t * 2 + t * t * t * 5;
    const y = mt * mt * mt * (-3) + 3 * mt * mt * t * 5 + 3 * mt * t * t * (-5) + t * t * t * 3;

    positions[i * 3] = x + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
  }

  // Control point handles (dashed lines)
  for (let i = 0; i < perPart; i++) {
    const idx = (perPart * 2 + i) * 3;
    const t = Math.random();

    if (Math.random() < 0.5) {
      // Handle 1: P0 to P1
      positions[idx] = THREE.MathUtils.lerp(-5, -2, t);
      positions[idx + 1] = THREE.MathUtils.lerp(-3, 5, t);
    } else {
      // Handle 2: P2 to P3
      positions[idx] = THREE.MathUtils.lerp(2, 5, t);
      positions[idx + 1] = THREE.MathUtils.lerp(-5, 3, t);
    }
    positions[idx + 2] = (Math.random() - 0.5) * 0.5;
    positions[idx] += (Math.random() - 0.5) * 0.2;
    positions[idx + 1] += (Math.random() - 0.5) * 0.2;
  }

  // Control point diamonds
  const remaining = count - perPart * 3;
  const controlPoints = [
    [-5, -3], [-2, 5], [2, -5], [5, 3]
  ];

  for (let i = 0; i < remaining; i++) {
    const idx = (perPart * 3 + i) * 3;
    const cp = controlPoints[i % 4];
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.6;

    positions[idx] = cp[0] + Math.cos(angle) * r;
    positions[idx + 1] = cp[1] + Math.sin(angle) * r;
    positions[idx + 2] = (Math.random() - 0.5) * 0.8;
  }

  return positions;
}

/** Service 4: AI Integration - Neural network / Brain */
export function generateNeuralNetwork(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);

  // Define network layers
  const layers = [
    { x: -5, nodes: 3 },
    { x: -2, nodes: 5 },
    { x: 0.5, nodes: 6 },
    { x: 3, nodes: 5 },
    { x: 5.5, nodes: 3 },
  ];

  const nodeRadius = 0.7;
  const nodesPerLayer: Array<{ x: number; y: number }[]> = [];

  // Calculate node positions
  for (const layer of layers) {
    const nodes: { x: number; y: number }[] = [];
    for (let n = 0; n < layer.nodes; n++) {
      const y = (n - (layer.nodes - 1) / 2) * 2.2;
      nodes.push({ x: layer.x, y });
    }
    nodesPerLayer.push(nodes);
  }

  const perNode = Math.floor(count * 0.5 / nodesPerLayer.flat().length);
  const connectionCount = Math.floor(count * 0.5);
  let filled = 0;

  // Node spheres
  for (const nodes of nodesPerLayer) {
    for (const node of nodes) {
      for (let i = 0; i < perNode && filled < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.random() * nodeRadius;

        positions[filled * 3] = node.x + r * Math.sin(phi) * Math.cos(theta);
        positions[filled * 3 + 1] = node.y + r * Math.sin(phi) * Math.sin(theta);
        positions[filled * 3 + 2] = r * Math.cos(phi);
        filled++;
      }
    }
  }

  // Connection lines between layers
  let connections = 0;
  while (filled < count && connections < connectionCount) {
    const layerIdx = Math.floor(Math.random() * (nodesPerLayer.length - 1));
    const fromNodes = nodesPerLayer[layerIdx];
    const toNodes = nodesPerLayer[layerIdx + 1];

    const from = fromNodes[Math.floor(Math.random() * fromNodes.length)];
    const to = toNodes[Math.floor(Math.random() * toNodes.length)];

    const t = Math.random();
    positions[filled * 3] = THREE.MathUtils.lerp(from.x, to.x, t);
    positions[filled * 3 + 1] = THREE.MathUtils.lerp(from.y, to.y, t);
    positions[filled * 3 + 2] = (Math.random() - 0.5) * 0.3;

    positions[filled * 3] += (Math.random() - 0.5) * 0.15;
    positions[filled * 3 + 1] += (Math.random() - 0.5) * 0.15;
    filled++;
    connections++;
  }

  return positions;
}

/** Service 5: Digital Marketing - Bar chart with trend line */
export function generateBarChart(count = getParticleCount()): Float32Array {
  const positions = new Float32Array(count * 3);

  const bars = [
    { x: -4.5, height: 3 },
    { x: -2.5, height: 5 },
    { x: -0.5, height: 4 },
    { x: 1.5, height: 7 },
    { x: 3.5, height: 6 },
  ];

  const barWidth = 1.5;
  const depth = 1.5;
  const perBar = Math.floor(count * 0.7 / bars.length);
  const axisCount = Math.floor(count * 0.1);
  const trendCount = count - perBar * bars.length - axisCount;
  let filled = 0;

  // Bars
  for (const bar of bars) {
    for (let i = 0; i < perBar && filled < count; i++) {
      positions[filled * 3] = bar.x + (Math.random() - 0.5) * barWidth;
      positions[filled * 3 + 1] = -4 + Math.random() * bar.height;
      positions[filled * 3 + 2] = (Math.random() - 0.5) * depth;
      filled++;
    }
  }

  // X and Y axes
  for (let i = 0; i < axisCount && filled < count; i++) {
    if (Math.random() < 0.5) {
      // X axis
      positions[filled * 3] = THREE.MathUtils.lerp(-6, 5.5, Math.random());
      positions[filled * 3 + 1] = -4 + (Math.random() - 0.5) * 0.2;
      positions[filled * 3 + 2] = (Math.random() - 0.5) * 0.3;
    } else {
      // Y axis
      positions[filled * 3] = -6 + (Math.random() - 0.5) * 0.2;
      positions[filled * 3 + 1] = THREE.MathUtils.lerp(-4, 5, Math.random());
      positions[filled * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    filled++;
  }

  // Trend line (ascending curve)
  for (let i = 0; i < trendCount && filled < count; i++) {
    const t = Math.random();
    const x = THREE.MathUtils.lerp(-4.5, 3.5, t);
    const y = -4 + 2 + t * 4 + Math.sin(t * Math.PI) * 1.5;

    positions[filled * 3] = x + (Math.random() - 0.5) * 0.3;
    positions[filled * 3 + 1] = y + (Math.random() - 0.5) * 0.3;
    positions[filled * 3 + 2] = depth / 2 + 0.3 + (Math.random() - 0.5) * 0.2;
    filled++;
  }

  return positions;
}

/** Get shape generator by service index */
export function getShapeGenerator(index: number | null): (count?: number) => Float32Array {
  switch (index) {
    case 0: return generateCodeBrackets;
    case 1: return generateDatabase;
    case 2: return generatePhone;
    case 3: return generatePenTool;
    case 4: return generateNeuralNetwork;
    case 5: return generateBarChart;
    default: return generateSphere;
  }
}
