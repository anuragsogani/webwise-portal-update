import { useCallback, useEffect, useRef } from "react";
import type { FeaturedParticleForm } from "../content/productsPageCopy";

const SHIELD_PATH =
  "M12 2L3 5.5L3 11.5C3 17 7.5 21.5 12 23C16.5 21.5 21 17 21 11.5L21 5.5Z M9 11.5V8.5C9 6.8 10.3 5.5 12 5.5C13.7 5.5 15 6.8 15 8.5V11.5 M7.5 11.5H16.5C17 11.5 17.5 12 17.5 12.5V17.5C17.5 18 17 18.5 16.5 18.5H7.5C7 18.5 6.5 18 6.5 17.5V12.5C6.5 12 7 11.5 7.5 11.5Z M12 13.2C11.5 13.2 11.2 13.5 11.2 14C11.2 14.3 11.4 14.6 11.6 14.7L11.3 16.5H12.7L12.4 14.7C12.6 14.6 12.8 14.3 12.8 14C12.8 13.5 12.5 13.2 12 13.2Z";
const EYE_PATH =
  "M12 4.5C7 4.5 2.7 8.3 1 12c1.7 3.7 6 7.5 11 7.5s9.3-3.8 11-7.5c-1.7-3.7-6-7.5-11-7.5z M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z";
const AUDIT_PATH =
  "M9 2h6v2H9V2zM8 4h8a1 1 0 011 1v15a2 2 0 01-2 2H9a2 2 0 01-2-2V5a1 1 0 011-1zM10 7h4v11h-4V7zM10 9.5h4M10 12h4M10 14.5h3";
const CLOUD_PATH =
  "M18.5 11.5c-.28-2.8-2.6-5-5.5-5-1.3 0-2.5.45-3.45 1.2A4.5 4.5 0 003.5 11C1.57 11.5 0 13.28 0 15.5 0 17.99 2.01 20 4.5 20H18c2.49 0 4.5-2.01 4.5-4.5 0-2.28-1.7-4.16-4-4.5z";
const ADR_PATH =
  "M12 4a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM5 17.5a2 2 0 110 4 2 2 0 010-4zM19 17.5a2 2 0 110 4 2 2 0 010-4zM12 8.8v2.2M8.4 15.6l2.4 1.4M15.6 15.6l-2.4 1.4";
const SIEM_PATH =
  "M12 3.5a8.5 8.5 0 108.5 0 8.5 8.5 0 00-8.5 0zM12 8a4 4 0 114 0 4 4 0 01-4 0z";

const PARTICLE_COLOR = "#0ABAB5";
const PARTICLE_COUNT = 10_000;
const PARTICLE_RADIUS = 0.55;
const REPULSE_R = 120;
const REPULSE_R_SQ = REPULSE_R * REPULSE_R;
const REPULSE_FORCE = 12;
const SPRING = 0.02;
const DAMP = 0.88;
const FORMS: readonly FeaturedParticleForm[] = ["siem", "hawkeye", "xdr", "audit", "cspm", "adr"];

type Point2D = { x: number; y: number };

type Particle = {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  col: string;
  depth: number;
  isStray: boolean;
  strayTheta: number;
  strayPhi: number;
  strayRNorm: number;
  siemX: number;
  siemY: number;
  hawkeyeX: number;
  hawkeyeY: number;
  xdrX: number;
  xdrY: number;
  auditX: number;
  auditY: number;
  cspmX: number;
  cspmY: number;
  adrX: number;
  adrY: number;
  shapeZ: number;
  wobbleSpeed: number;
  wobbleRad: number;
  wobbleAngle: number;
};

function rotateY(x: number, y: number, z: number, cosR: number, sinR: number) {
  return { x: x * cosR + z * sinR, y, z: -x * sinR + z * cosR };
}

function samplePath(pathD: string, count: number, width: number, height: number): Point2D[] {
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  const pathEl = document.createElementNS(svgNs, "path");
  pathEl.setAttribute("d", pathD);
  svg.appendChild(pathEl);
  document.body.appendChild(svg);
  const totalLength = pathEl.getTotalLength();
  const scale = (Math.min(width, height) * 0.65) / 24;
  const points: Point2D[] = [];
  for (let i = 0; i < count; i++) {
    const pt = pathEl.getPointAtLength((i / count) * totalLength);
    points.push({ x: (pt.x - 12) * scale, y: (pt.y - 12) * scale });
  }
  document.body.removeChild(svg);
  return points;
}

function buildParticles(width: number, height: number): Particle[] {
  const xdrPts = samplePath(SHIELD_PATH, PARTICLE_COUNT, width, height);
  const eyePts = samplePath(EYE_PATH, PARTICLE_COUNT, width, height);
  const auditPts = samplePath(AUDIT_PATH, PARTICLE_COUNT, width, height);
  const cspmPts = samplePath(CLOUD_PATH, PARTICLE_COUNT, width, height);
  const adrPts = samplePath(ADR_PATH, PARTICLE_COUNT, width, height);
  const siemPts = samplePath(SIEM_PATH, PARTICLE_COUNT, width, height);
  const sortX = (a: Point2D, b: Point2D) => a.x - b.x;
  xdrPts.sort(sortX);
  eyePts.sort(sortX);
  auditPts.sort(sortX);
  cspmPts.sort(sortX);
  adrPts.sort(sortX);
  siemPts.sort(sortX);

  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const isStray = Math.random() < 0.12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * (Math.min(width, height) * 0.5);
    particles.push({
      id: i,
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta),
      vx: 0,
      vy: 0,
      vz: 0,
      col: PARTICLE_COLOR,
      depth: 0,
      isStray,
      strayTheta: Math.random() * Math.PI * 2,
      strayPhi: Math.acos(2 * Math.random() - 1),
      strayRNorm: 0.6 + Math.random() * 0.4,
      siemX: siemPts[i]!.x,
      siemY: siemPts[i]!.y,
      hawkeyeX: eyePts[i]!.x,
      hawkeyeY: eyePts[i]!.y,
      xdrX: xdrPts[i]!.x,
      xdrY: xdrPts[i]!.y,
      auditX: auditPts[i]!.x,
      auditY: auditPts[i]!.y,
      cspmX: cspmPts[i]!.x,
      cspmY: cspmPts[i]!.y,
      adrX: adrPts[i]!.x,
      adrY: adrPts[i]!.y,
      shapeZ: (Math.random() - 0.5) * 80,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleRad: 0.5 + Math.random() * 2,
      wobbleAngle: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

interface ProductParticleCanvasProps {
  currentForm?: FeaturedParticleForm;
}

export default function ProductParticleCanvas({ currentForm }: ProductParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const formIdxRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, on: false });
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (currentForm) {
      const idx = FORMS.indexOf(currentForm);
      if (idx !== -1) formIdxRef.current = idx;
    }
  }, [currentForm]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas?.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || 800;
    const h = 520;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.getContext("2d", { alpha: true })?.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w, h };
    if (particlesRef.current.length === 0) {
      particlesRef.current = buildParticles(w, h);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const loop = () => {
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const radiusBase = Math.min(w, h);
      timeRef.current += 0.005;
      const t = timeRef.current;
      const form = FORMS[formIdxRef.current] ?? "siem";

      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const swayAngle = Math.sin(t * 0.8) * 0.5;
      const cosR = Math.cos(swayAngle);
      const sinR = Math.sin(swayAngle);

      for (const p of particlesRef.current) {
        let targetX = 0;
        let targetY = 0;
        let targetZ = 0;

        if (p.isStray) {
          p.strayTheta += 0.0015;
          const sr = radiusBase * 0.45 * p.strayRNorm;
          const sx = sr * Math.sin(p.strayPhi) * Math.cos(p.strayTheta);
          const sy = sr * Math.cos(p.strayPhi);
          const sz = sr * Math.sin(p.strayPhi) * Math.sin(p.strayTheta);
          targetX = sx * cosT + sz * sinT;
          targetY = sy;
          targetZ = -sx * sinT + sz * cosT;
        } else {
          let ox = 0;
          let oy = 0;
          if (form === "siem") {
            ox = p.siemX;
            oy = p.siemY;
          } else if (form === "hawkeye") {
            ox = p.hawkeyeX;
            oy = p.hawkeyeY;
          } else if (form === "xdr") {
            ox = p.xdrX;
            oy = p.xdrY;
          } else if (form === "audit") {
            ox = p.auditX;
            oy = p.auditY;
          } else if (form === "cspm") {
            ox = p.cspmX;
            oy = p.cspmY;
          } else {
            ox = p.adrX;
            oy = p.adrY;
          }
          const rotated = rotateY(ox, oy, p.shapeZ, cosR, sinR);
          targetX = rotated.x;
          targetY = rotated.y;
          targetZ = rotated.z;
        }

        p.wobbleAngle += p.wobbleSpeed;
        targetX += Math.cos(p.wobbleAngle) * p.wobbleRad;
        targetY += Math.sin(p.wobbleAngle) * p.wobbleRad;
        p.vx += (targetX - p.x) * SPRING;
        p.vy += (targetY - p.y) * SPRING;
        p.vz += (targetZ - p.z) * SPRING;
        p.vx *= DAMP;
        p.vy *= DAMP;
        p.vz *= DAMP;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.depth = p.z / (radiusBase * 0.5);
      }

      const sorted = [...particlesRef.current].sort((a, b) => a.depth - b.depth);
      for (const p of sorted) {
        const fov = 800;
        const scale = fov / (fov - p.z);
        const screenX = cx + p.x * scale;
        const screenY = cy + p.y * scale;

        if (mouse.on) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < REPULSE_R_SQ && distSq > 0.1) {
            const dist = Math.sqrt(distSq);
            const force = ((REPULSE_R - dist) / REPULSE_R) * REPULSE_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.vz += force * 1.5;
          }
        }

        let opacity = 0.45 + ((p.depth + 1) / 2) * 0.55;
        opacity = Math.min(1, Math.max(0.45, opacity));
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(screenX, screenY, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div style={{ userSelect: "none", borderRadius: "14px", overflow: "hidden", background: "transparent" }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "520px" }}
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;
          mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, on: true };
        }}
        onMouseLeave={() => {
          mouseRef.current.on = false;
        }}
      />
    </div>
  );
}
