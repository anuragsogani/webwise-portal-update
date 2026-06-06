import { useEffect, useMemo, useRef } from "react";
import { BRAND_BACKDROP_FILIGREE_DATA_URI } from "../content/brandBackdropFiligree";
import "../styles/brand-backdrop.css";

/** Tiffany-inspired teal accent (aligned with tokens --lime) */
const R = 118;
const G = 228;
const B = 223;

type Point = { x: number; y: number };

function distToSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const ab2 = abx * abx + aby * aby || 1;
  let t = (apx * abx + apy * aby) / ab2;
  t = Math.max(0, Math.min(1, t));
  const qx = ax + t * abx;
  const qy = ay + t * aby;
  const dx = px - qx;
  const dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}

function distToPolyline(px: number, py: number, pts: Point[]) {
  let d = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    d = Math.min(d, distToSegment(px, py, a.x, a.y, b.x, b.y));
  }
  return d;
}

function genManhattanPaths(w: number, h: number, count: number): Point[][] {
  const paths: Point[][] = [];
  for (let p = 0; p < count; p++) {
    const pts: Point[] = [];
    let x = Math.random() * w;
    let y = Math.random() * h;
    pts.push({ x, y });
    const steps = 7 + Math.floor(Math.random() * 9);
    for (let s = 0; s < steps; s++) {
      const horiz = Math.random() < 0.5;
      const len = 36 + Math.random() * 140;
      if (horiz) x += (Math.random() < 0.5 ? -1 : 1) * len;
      else y += (Math.random() < 0.5 ? -1 : 1) * len;
      x = Math.max(-40, Math.min(w + 40, x));
      y = Math.max(-40, Math.min(h + 40, y));
      pts.push({ x, y });
    }
    paths.push(pts);
  }
  return paths;
}

function runBackdrop(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  opts: { animated: boolean; surface: "dark" | "light" },
) {
  let W = 0;
  let H = 0;
  let paths: Point[][] = [];
  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let mx = 0;
  let my = 0;
  let scrollDrift = 0;

  const onPointer = (e: PointerEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;
  };
  const onScroll = () => {
    scrollDrift = window.scrollY * 0.12;
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.floor(window.innerWidth * dpr);
    H = Math.floor(window.innerHeight * dpr);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = window.innerWidth;
    H = window.innerHeight;
    mx = W * 0.5;
    my = H * 0.45;
    targetX = mx;
    targetY = my;
    paths = genManhattanPaths(W, H, 26);
  }

  function drawGrid(t: number) {
    const step = 52;
    const off = (opts.animated ? t * 0.012 : 0) + scrollDrift * 0.08;
    const gridA = opts.surface === "light" ? 0.14 : 0.048;
    const dg = Math.min(1, Math.hypot(mx - W * 0.5, my - H * 0.45) / (Math.min(W, H) * 0.55));
    const gridBoost = opts.surface === "light" ? 0.06 * (1 - dg) : 0.04 * (1 - dg);
    ctx.strokeStyle = `rgba(${R},${G},${B},${gridA + gridBoost})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -step; x < W + step; x += step) {
      const sx = x + (off % step);
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, H);
    }
    for (let y = -step; y < H + step; y += step) {
      const sy = y - (off % step) * 0.3;
      ctx.moveTo(0, sy);
      ctx.lineTo(W, sy);
    }
    ctx.stroke();
  }

  function smoothPointer() {
    mx += (targetX - mx) * 0.14;
    my += (targetY - my) * 0.14;
  }

  function drawPaths(now: number) {
    const light = opts.surface === "light";
    const cap = light ? 0.72 : 0.55;
    const baseLo = light ? 0.088 : 0.045;
    const boostMul = light ? 1.22 : 1;
    const pulse = opts.animated ? 0.55 + Math.sin(now * 0.0018) * 0.12 : 0.55;

    for (const pts of paths) {
      const cx =
        pts.reduce((s, p) => s + p.x, 0) / Math.max(1, pts.length);
      const cy = pts.reduce((s, p) => s + p.y, 0) / Math.max(1, pts.length);
      const dCenter = Math.hypot(mx - cx, my - cy);
      const dLine = distToPolyline(mx, my, pts);
      const boost = Math.max(0, 1 - dLine / 150) * 0.95 + Math.max(0, 1 - dCenter / 300) * 0.35;
      const a = (baseLo + boost * 0.42 * pulse * boostMul) * (light ? 1.08 : 1);

      ctx.strokeStyle = `rgba(${R},${G},${B},${Math.min(cap, a)})`;
      ctx.lineWidth = 1.05 + boost * 2.1;
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${Math.min(235, R + 38)},${Math.min(248, G + 18)},${Math.min(248, B + 22)},${(light ? 0.18 : 0.1) + boost * (light ? 0.38 : 0.32)})`;
      ctx.shadowBlur = boost * 26;
      ctx.beginPath();
      ctx.moveTo(pts[0]!.x, pts[0]!.y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    for (const pts of paths) {
      for (let i = 0; i < pts.length; i += 3) {
        const p = pts[i]!;
        const d = Math.hypot(mx - p.x, my - p.y);
        if (d > 260) continue;
        const n = Math.max(0, 1 - d / 260);
        ctx.fillStyle = `rgba(${Math.min(238, R + 52)},${Math.min(250, G + 22)},${Math.min(248, B + 20)},${(light ? 0.11 : 0.06) + n * (light ? 0.4 : 0.28)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + n * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function tick(now: number) {
    ctx.clearRect(0, 0, W, H);
    smoothPointer();
    drawGrid(opts.animated ? now * 0.02 : 0);
    drawPaths(now);
    if (opts.animated) raf = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });

  if (opts.animated) {
    raf = requestAnimationFrame(tick);
  } else {
    tick(performance.now());
  }

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    cancelAnimationFrame(raf);
  };
}

export default function BrandBackdrop({ active, surface }: { active: boolean; surface: "dark" | "light" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filigree = useMemo(
    () => ({ backgroundImage: `url("${BRAND_BACKDROP_FILIGREE_DATA_URI}")` }),
    [],
  );

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    return runBackdrop(el, ctx, { animated: active, surface });
  }, [active, surface]);

  return (
    <div className="brand-backdrop" aria-hidden="true">
      <div className="brand-backdrop__filigree" style={filigree} />
      <canvas ref={canvasRef} className="brand-backdrop__canvas" />
      <div className="brand-backdrop__vignette" />
    </div>
  );
}
