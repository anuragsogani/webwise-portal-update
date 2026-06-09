/**
 * Deterministic, allocation-free gradient noise.
 * Smooth and continuous — drives wave deformation and path drift with
 * zero random jitter. Pure functions, safe to call in a rAF loop.
 */

/** Seedable PRNG (mulberry32) — deterministic geometry across reloads. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Hash a 2D integer cell + seed to a pseudo-random gradient angle. */
function grad(ix: number, iy: number, seed: number): number {
  let h = ix * 374761393 + iy * 668265263 + seed * 1274126177;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return (h / 4294967296) * Math.PI * 2;
}

function dotGrid(ix: number, iy: number, x: number, y: number, seed: number): number {
  const angle = grad(ix, iy, seed);
  const gx = Math.cos(angle);
  const gy = Math.sin(angle);
  return gx * (x - ix) + gy * (y - iy);
}

/** 2D Perlin-style gradient noise, output in roughly [-1, 1]. */
export function noise2D(x: number, y: number, seed = 0): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const sx = fade(x - x0);
  const sy = fade(y - y0);

  const n00 = dotGrid(x0, y0, x, y, seed);
  const n10 = dotGrid(x1, y0, x, y, seed);
  const n01 = dotGrid(x0, y1, x, y, seed);
  const n11 = dotGrid(x1, y1, x, y, seed);

  const ix0 = lerp(n00, n10, sx);
  const ix1 = lerp(n01, n11, sx);
  return lerp(ix0, ix1, sy) * 1.4;
}

/** Smooth 1D noise via the 2D field — handy for time-based drift. */
export function noise1D(x: number, seed = 0): number {
  return noise2D(x, x * 0.37 + 11.7, seed);
}
