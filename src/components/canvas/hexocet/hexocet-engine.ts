interface Seed {
  xLast: number;
  x: number;
  xSpeed: number;
  yLast: number;
  y: number;
  ySpeed: number;
  targetHx: number;
  targetHy: number;
  targetX: number;
  targetY: number;
  age: number;
  hue: number;
}

// Pre-computed trig for 30-degree rotation (only angles used)
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
const INV_SQRT3 = 1 / Math.sqrt(3);

// Reusable output buffer to avoid allocations in hot path
const _out = { x: 0, y: 0 };

function rotate30(x: number, y: number): void {
  _out.x = x * COS30 - y * SIN30;
  _out.y = x * SIN30 + y * COS30;
}

function rotateNeg30(x: number, y: number): void {
  _out.x = x * COS30 + y * SIN30;
  _out.y = -x * SIN30 + y * COS30;
}

export class HexocetEngine {
  private ctx: CanvasRenderingContext2D;
  private seeds: Seed[] = [];
  private seedIndex = 0;
  private stepCount = 0;
  private animationId = 0;
  private isRunning = false;

  private canvasBase: number;
  private xC: number;
  private yC: number;

  // Tunable constants
  private readonly birthPeriod = 10;
  private readonly hexSize = 30;
  private readonly targetBounceChance = 0.1;
  private readonly springStiffness = 0.02;
  private readonly viscosity = 0.5;
  private readonly particleOpacity = 0.05;
  private readonly maxSeeds = 600;

  // Color range adapted to site palette (violet-purple hues)
  private readonly hueMin = 250;
  private readonly hueRange = 40;

  // Pre-computed color strings (indexed by integer hue)
  private trailColors: string[] = [];
  private targetColors: string[] = [];

  constructor(canvas: HTMLCanvasElement, cssWidth: number, cssHeight: number) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get 2D context');
    this.ctx = ctx;

    this.canvasBase = Math.min(cssWidth, cssHeight);
    this.xC = cssWidth / 2;
    this.yC = cssHeight / 2;

    // Pre-compute color strings to avoid template literal allocations in draw loop
    for (let h = 0; h <= this.hueRange; h++) {
      const hue = this.hueMin + h;
      this.trailColors[h] = `hsla(${hue}, 80%, 55%, ${this.particleOpacity})`;
      this.targetColors[h] = `hsla(${hue}, 70%, 40%, 0.01)`;
    }
  }

  private hexCoordsToXY(hx: number, hy: number): void {
    const isSumEven = (Math.floor(hx) + Math.floor(hy)) % 2 === 0 ? 1 : 0;
    const xPrime = hx * this.hexSize;
    const yPrime = INV_SQRT3 * (3 * hy + 1 + isSumEven) * this.hexSize;
    rotate30(xPrime, yPrime);
  }

  private xyToHexCoords(x: number, y: number): void {
    rotateNeg30(x / this.hexSize, y / this.hexSize);
    _out.x = Math.floor(_out.x);
    _out.y = Math.floor((Math.sqrt(3) * _out.y) / 3);
  }

  birth(xBirth?: number, yBirth?: number): void {
    const bx = xBirth ?? this.xC;
    const by = yBirth ?? this.yC;
    this.xyToHexCoords(bx, by);
    let hx = _out.x;
    let hy = _out.y;

    // Spread around target
    hx += Math.floor((-0.5 + Math.random()));
    hy += Math.floor((-0.5 + Math.random()));

    this.hexCoordsToXY(hx, hy);
    const tx = _out.x;
    const ty = _out.y;

    const seed: Seed = {
      xLast: tx,
      x: tx,
      xSpeed: 0,
      yLast: ty,
      y: ty,
      ySpeed: 0,
      targetHx: hx,
      targetHy: hy,
      targetX: tx,
      targetY: ty,
      age: 0,
      hue: this.hueMin + this.hueRange * Math.random(),
    };

    // Circular buffer: overwrite oldest when at capacity
    if (this.seeds.length < this.maxSeeds) {
      this.seeds.push(seed);
    } else {
      this.seeds[this.seedIndex % this.maxSeeds] = seed;
    }
    this.seedIndex++;
  }

  private move(): void {
    const K = this.springStiffness;
    const visc = this.viscosity;
    const scale = 0.01 * this.canvasBase;

    for (let i = 0; i < this.seeds.length; i++) {
      const seed = this.seeds[i];
      seed.age++;
      seed.xLast = seed.x;
      seed.yLast = seed.y;

      // Randomly change target hex vertex
      if (Math.random() < this.targetBounceChance) {
        if (Math.random() > 0.33) {
          seed.targetHx += Math.random() > 0.5 ? 1 : -1;
        } else {
          if ((seed.targetHx + seed.targetHy) % 2 === 0) {
            seed.targetHy += 1;
          } else {
            seed.targetHy -= 1;
          }
        }
        // Recompute cached target position
        this.hexCoordsToXY(seed.targetHx, seed.targetHy);
        seed.targetX = _out.x;
        seed.targetY = _out.y;
      }

      // Spring acceleration toward cached target
      let accX = -K * (seed.x - seed.targetX);
      let accY = -K * (seed.y - seed.targetY);

      // Viscosity damping
      accX -= visc * seed.xSpeed;
      accY -= visc * seed.ySpeed;

      seed.xSpeed += accX;
      seed.ySpeed += accY;

      // Position update scaled by canvas size
      seed.x += seed.xSpeed * scale;
      seed.y += seed.ySpeed * scale;
    }
  }

  private draw(): void {
    const ctx = this.ctx;

    // Set shared state once outside loop
    ctx.lineCap = 'round';

    // Trail lines
    ctx.lineWidth = 2;
    for (let i = 0; i < this.seeds.length; i++) {
      const seed = this.seeds[i];
      const hueIdx = Math.round(seed.hue - this.hueMin);
      ctx.strokeStyle = this.trailColors[hueIdx] || this.trailColors[0];
      ctx.beginPath();
      ctx.moveTo(seed.xLast, seed.yLast);
      ctx.lineTo(seed.x, seed.y);
      ctx.stroke();
    }

    // Faint target markers
    ctx.lineWidth = 7;
    for (let i = 0; i < this.seeds.length; i++) {
      const seed = this.seeds[i];
      const hueIdx = Math.round(seed.hue - this.hueMin);
      ctx.fillStyle = this.targetColors[hueIdx] || this.targetColors[0];
      ctx.fillRect(seed.targetX - 3, seed.targetY - 3, 7, 7);
    }
  }

  private update(): void {
    this.stepCount++;

    // Stop auto-birthing after ~16 minutes; mouse interactions still spawn particles
    if (this.stepCount % this.birthPeriod === 0 && this.stepCount < 60000) {
      this.birth();
    }

    this.move();
    this.draw();
  }

  private loop = (): void => {
    if (!this.isRunning) return;
    this.update();
    this.animationId = requestAnimationFrame(this.loop);
  };

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.loop);
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resize(cssWidth: number, cssHeight: number): void {
    this.canvasBase = Math.min(cssWidth, cssHeight);
    this.xC = cssWidth / 2;
    this.yC = cssHeight / 2;
  }

  dispose(): void {
    this.stop();
    this.seeds = [];
  }
}
