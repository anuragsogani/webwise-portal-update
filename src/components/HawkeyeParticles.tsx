
// // // import { useEffect, useRef, useCallback } from "react";

// // // const EYE_PATH =
// // //   "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" +
// // //   "M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" +
// // //   "m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";

// // // const TIFFANY_COLORS = [
// // //   "#0abdc6", "#0abdc6", "#0abdc6",
// // //   "#00d4df", "#00eaf5",
// // //   "#5eeff7", "#a8f7fc",
// // //   "#ffffff", "#d0faff",
// // //   "#007a82", "#009aa3",
// // // ];

// // // const N = 1100;
// // // const REPULSE_R = 110;
// // // const REPULSE_RSQ = REPULSE_R * REPULSE_R;
// // // const REPULSE_F = 7;
// // // const SPRING = 0.026;
// // // const DAMP = 0.86;

// // // interface Particle {
// // //   phi: number;
// // //   theta: number;
// // //   rNorm: number;
// // //   sx: number; sy: number;
// // //   ex: number; ey: number;
// // //   hx: number; hy: number;
// // //   x: number; y: number;
// // //   vx: number; vy: number;
// // //   r: number;
// // //   baseR: number;
// // //   col: string;
// // //   op: number; bo: number;
// // //   ja: number; js: number; jr: number;
// // //   pp: number; ps: number;
// // //   depth: number;
// // // }

// // // function depthColor(depth: number): string {
// // //   const t = (depth + 1) / 2;
// // //   if (t < 0.12) return "#003a40";
// // //   if (t < 0.25) return "#005a62";
// // //   if (t < 0.38) return "#007a82";
// // //   if (t < 0.52) return "#009aa3";
// // //   if (t < 0.65) return "#0abdc6";
// // //   if (t < 0.76) return "#00d4df";
// // //   if (t < 0.87) return "#5eeff7";
// // //   if (t < 0.94) return "#a8f7fc";
// // //   return "#ffffff";
// // // }

// // // function sampleSphere(
// // //   n: number, w: number, h: number
// // // ): { x: number; y: number; phi: number; theta: number; rNorm: number; depth: number }[] {
// // //   const r = Math.min(w, h) * 0.32;
// // //   const cx = w / 2, cy = h / 2;
// // //   const pts = [];
// // //   for (let i = 0; i < n; i++) {
// // //     const theta = 2 * Math.PI * Math.random();
// // //     const phi = Math.acos(2 * Math.random() - 1);
// // //     const shell = Math.random();
// // //     const rNorm = shell < 0.78 ? 0.82 + Math.random() * 0.18 : 0.28 + Math.random() * 0.54;
// // //     const rr = r * rNorm;
// // //     const sinPhi = Math.sin(phi);
// // //     const depth = Math.cos(phi);
// // //     pts.push({
// // //       x: cx + rr * sinPhi * Math.cos(theta),
// // //       y: cy + rr * sinPhi * Math.sin(theta),
// // //       phi, theta, rNorm, depth,
// // //     });
// // //   }
// // //   return pts;
// // // }

// // // function sampleEye(n: number, w: number, h: number): { x: number; y: number }[] {
// // //   const ns = "http://www.w3.org/2000/svg";
// // //   const svg = document.createElementNS(ns, "svg");
// // //   svg.setAttribute("viewBox", "0 0 24 24");
// // //   svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
// // //   const p = document.createElementNS(ns, "path");
// // //   p.setAttribute("d", EYE_PATH);
// // //   svg.appendChild(p);
// // //   document.body.appendChild(svg);
// // //   const len = p.getTotalLength();
// // //   const sc = Math.min(w, h) * 0.72 / 24;
// // //   const cx = w / 2, cy = h / 2;
// // //   const pts: { x: number; y: number }[] = [];
// // //   for (let i = 0; i < n; i++) {
// // //     const pt = p.getPointAtLength((i / n) * len);
// // //     pts.push({ x: (pt.x - 12) * sc + cx, y: (pt.y - 12) * sc + cy });
// // //   }
// // //   document.body.removeChild(svg);
// // //   return pts;
// // // }

// // // function buildParticles(w: number, h: number, form: "sphere" | "eye"): Particle[] {
// // //   const sp = sampleSphere(N, w, h);
// // //   const ep = sampleEye(N, w, h);
// // //   sp.sort((a, b) => a.x - b.x);
// // //   ep.sort((a, b) => a.x - b.x);
// // //   return sp.map((s, i) => {
// // //     const e = ep[i];
// // //     const bo = 0.18 + Math.random() * 0.82;
// // //     const depth = s.depth;
// // //     const depthT = (depth + 1) / 2;
// // //     const baseR = 0.22 + depthT * 1.1 + Math.random() * 0.4;
// // //     return {
// // //       phi: s.phi, theta: s.theta, rNorm: s.rNorm,
// // //       sx: s.x, sy: s.y,
// // //       ex: e.x, ey: e.y,
// // //       hx: form === "eye" ? e.x : s.x,
// // //       hy: form === "eye" ? e.y : s.y,
// // //       x: s.x + (Math.random() - 0.5) * 50,
// // //       y: s.y + (Math.random() - 0.5) * 50,
// // //       vx: 0, vy: 0,
// // //       r: baseR, baseR,
// // //       col: form === "sphere" ? depthColor(depth) : TIFFANY_COLORS[Math.floor(Math.random() * TIFFANY_COLORS.length)],
// // //       op: bo, bo,
// // //       ja: Math.random() * Math.PI * 2,
// // //       js: 0.003 + Math.random() * 0.009,
// // //       jr: form === "sphere" ? 1.2 + Math.random() * 4.5 : 0.4 + Math.random() * 1.8,
// // //       pp: Math.random() * Math.PI * 2,
// // //       ps: 0.012 + Math.random() * 0.022,
// // //       depth,
// // //     };
// // //   });
// // // }

// // // export default function ParticleMorph() {
// // //   const canvasRef = useRef<HTMLCanvasElement>(null);
// // //   const particlesRef = useRef<Particle[]>([]);
// // //   const formRef = useRef<"sphere" | "eye">("sphere");
// // //   const mouseRef = useRef({ x: -9999, y: -9999, on: false });
// // //   const rafRef = useRef<number>(0);
// // //   const sizeRef = useRef({ w: 0, h: 0 });
// // //   const rotYRef = useRef(0);
// // //   const setForm = useCallback((next: "sphere" | "eye") => {
// // //     formRef.current = next;
// // //     for (const p of particlesRef.current) {
// // //       if (next === "eye") {
// // //         p.hx = p.ex; p.hy = p.ey;
// // //         p.jr = 0.4 + Math.random() * 1.8;
// // //         p.col = TIFFANY_COLORS[Math.floor(Math.random() * TIFFANY_COLORS.length)];
// // //         p.r = p.baseR;
// // //       } else {
// // //         p.hx = p.sx; p.hy = p.sy;
// // //         p.jr = 1.2 + Math.random() * 4.5;
// // //         p.col = depthColor(p.depth);
// // //         p.r = p.baseR;
// // //       }
// // //     }
// // //   }, []);

// // //   const resize = useCallback(() => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;
// // //     const rect = canvas.parentElement!.getBoundingClientRect();
// // //     const dpr = window.devicePixelRatio || 1;
// // //     const W = rect.width, H = 520;
// // //     canvas.width = W * dpr;
// // //     canvas.height = H * dpr;
// // //     canvas.style.width = W + "px";
// // //     canvas.style.height = H + "px";
// // //     const ctx = canvas.getContext("2d", { alpha: true })!;
// // //     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// // //     sizeRef.current = { w: W, h: H };
// // //     particlesRef.current = buildParticles(W, H, formRef.current);
// // //   }, []);

// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;
// // //     resize();
// // //     const ro = new ResizeObserver(resize);
// // //     ro.observe(canvas.parentElement!);
// // //     const ctx = canvas.getContext("2d", { alpha: true })!;

// // //     function loop() {
// // //       const { w, h } = sizeRef.current;
// // //       const isSphere = formRef.current === "sphere";

// // //       ctx.clearRect(0, 0, w, h);

// // //       // Ambient glow for sphere
// // //       if (isSphere) {
// // //         const cx = w / 2, cy = h / 2;
// // //         const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.40);
// // //         gr.addColorStop(0, "rgba(0,190,205,0.09)");
// // //         gr.addColorStop(0.55, "rgba(0,100,115,0.05)");
// // //         gr.addColorStop(1, "rgba(0,0,0,0)");
// // //         ctx.fillStyle = gr;
// // //         ctx.fillRect(0, 0, w, h);
// // //       }

// // //       const mouse = mouseRef.current;
// // //       if (isSphere) rotYRef.current += 0.0045;
// // //       const cosY = Math.cos(rotYRef.current);
// // //       const sinY = Math.sin(rotYRef.current);

// // //       for (const p of particlesRef.current) {
// // //         p.ja += p.js;
// // //         p.vx += (p.hx + Math.cos(p.ja) * p.jr - p.x) * SPRING;
// // //         p.vy += (p.hy + Math.sin(p.ja) * p.jr - p.y) * SPRING;

// // //         if (mouse.on) {
// // //           const dx = p.x - mouse.x, dy = p.y - mouse.y;
// // //           const dsq = dx * dx + dy * dy;
// // //           if (dsq < REPULSE_RSQ && dsq > 0.01) {
// // //             const d = Math.sqrt(dsq);
// // //             const f = ((REPULSE_R - d) / REPULSE_R) * REPULSE_F;
// // //             p.vx += (dx / d) * f;
// // //             p.vy += (dy / d) * f;
// // //           }
// // //         }

// // //         p.vx *= DAMP; p.vy *= DAMP;
// // //         p.x += p.vx; p.y += p.vy;
// // //         if (p.x < 0) { p.x = 0; p.vx *= -0.4; }
// // //         if (p.x > w) { p.x = w; p.vx *= -0.4; }
// // //         if (p.y < 0) { p.y = 0; p.vy *= -0.4; }
// // //         if (p.y > h) { p.y = h; p.vy *= -0.4; }
// // //         p.pp += p.ps;

// // //         if (isSphere) {
// // //           const radius = Math.min(w, h) * 0.32 * p.rNorm;
// // //           const sinPhi = Math.sin(p.phi);
// // //           const x3 = radius * sinPhi * Math.cos(p.theta);
// // //           const z3 = radius * sinPhi * Math.sin(p.theta);
// // //           const y3 = radius * Math.cos(p.phi);
// // //           const rx = x3 * cosY + z3 * sinY;
// // //           const rz = -x3 * sinY + z3 * cosY;
// // //           const fov = 700;
// // //           const scale = fov / (fov - rz);
// // //           p.hx = w / 2 + rx * scale;
// // //           p.hy = h / 2 + y3 * scale;
// // //           const nd = rz / (Math.min(w, h) * 0.32);
// // //           p.depth = Math.max(-1, Math.min(1, nd));
// // //           p.col = depthColor(p.depth);
// // //           const dt = (p.depth + 1) / 2;
// // //           p.r = Math.max(0.18, (0.2 + dt * 1.18) * scale);
// // //           let op = p.bo + Math.sin(p.pp) * 0.18;
// // //           if (p.depth < -0.3) op *= 0.2 + ((p.depth + 1) / 0.7) * 0.65;
// // //           p.op = Math.min(1, Math.max(0.03, op));
// // //         } else {
// // //           p.op = Math.min(1, Math.max(0.08, p.bo + Math.sin(p.pp) * 0.2));
// // //           p.r = p.baseR;
// // //         }
// // //       }

// // //       if (isSphere) {
// // //         // Painter's algorithm: sort back to front
// // //         const sorted = [...particlesRef.current].sort((a, b) => a.depth - b.depth);
// // //         for (const p of sorted) {
// // //           ctx.globalAlpha = p.op;
// // //           ctx.fillStyle = p.col;
// // //           ctx.beginPath();
// // //           ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // //           ctx.fill();
// // //         }
// // //         // Specular highlight
// // //         const hx = w / 2 - Math.min(w, h) * 0.09;
// // //         const hy = h / 2 - Math.min(w, h) * 0.11;
// // //         const sg = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.min(w, h) * 0.13);
// // //         sg.addColorStop(0, "rgba(255,255,255,0.20)");
// // //         sg.addColorStop(0.45, "rgba(200,250,255,0.07)");
// // //         sg.addColorStop(1, "rgba(0,0,0,0)");
// // //         ctx.globalAlpha = 1;
// // //         ctx.fillStyle = sg;
// // //         ctx.fillRect(0, 0, w, h);
// // //       } else {
// // //         const groups: Record<string, Particle[]> = {};
// // //         for (const p of particlesRef.current) {
// // //           if (!groups[p.col]) groups[p.col] = [];
// // //           groups[p.col].push(p);
// // //         }
// // //         for (const col in groups) {
// // //           for (const p of groups[col]) {
// // //             ctx.globalAlpha = p.op;
// // //             ctx.fillStyle = col;
// // //             ctx.beginPath();
// // //             ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
// // //             ctx.fill();
// // //           }
// // //         }
// // //       }

// // //       ctx.globalAlpha = 1;
// // //       rafRef.current = requestAnimationFrame(loop);
// // //     }

// // //     rafRef.current = requestAnimationFrame(loop);
// // //     const timer = window.setInterval(() => {
// // //       setForm(formRef.current === "sphere" ? "eye" : "sphere");
// // //     }, 4000);

// // //     return () => {
// // //       cancelAnimationFrame(rafRef.current);
// // //       clearInterval(timer);
// // //       ro.disconnect();
// // //     };
// // //   }, [resize, setForm]);

// // //   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
// // //     const r = canvasRef.current!.getBoundingClientRect();
// // //     mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
// // //   }, []);

// // //   const handleMouseLeave = useCallback(() => {
// // //     mouseRef.current.on = false;
// // //   }, []);

// // //   return (
// // //     <div style={{ userSelect: "none", borderRadius: "14px", overflow: "hidden" }}>
// // //       <canvas
// // //         ref={canvasRef}
// // //         style={{ display: "block", width: "100%", height: "520px" }}
// // //         onMouseMove={handleMouseMove}
// // //         onMouseLeave={handleMouseLeave}
// // //       />
// // //     </div>
// // //   );
// // // }

// import { useEffect, useRef, useCallback } from "react";

// // XDR: Shield & Lock
// const SHIELD_LOCK_PATH =
//   "M12 2L3 5.5L3 11.5C3 17 7.5 21.5 12 23C16.5 21.5 21 17 21 11.5L21 5.5Z " + 
//   "M9 11.5V8.5C9 6.8 10.3 5.5 12 5.5C13.7 5.5 15 6.8 15 8.5V11.5 " + 
//   "M7.5 11.5H16.5C17 11.5 17.5 12 17.5 12.5V17.5C17.5 18 17 18.5 16.5 18.5H7.5C7 18.5 6.5 18 6.5 17.5V12.5C6.5 12 7 11.5 7.5 11.5Z " + 
//   "M12 13.2C11.5 13.2 11.2 13.5 11.2 14C11.2 14.3 11.4 14.6 11.6 14.7L11.3 16.5H12.7L12.4 14.7C12.6 14.6 12.8 14.3 12.8 14C12.8 13.5 12.5 13.2 12 13.2Z"; 

// // Hawkeye: Sentinel Eye (24x24 viewBox)
// const HAWKEYE_PATH = 
//   "M12 4.5C7 4.5 2.7 8.3 1 12c1.7 3.7 6 7.5 11 7.5s9.3-3.8 11-7.5c-1.7-3.7-6-7.5-11-7.5z " +
//   "M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z " +
//   "M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z";

// const TIFFANY_BLUE = "#0ABAB5";
// const CYBER_COLORS = [TIFFANY_BLUE];

// const N = 1200; 
// const REPULSE_R = 120;
// const REPULSE_RSQ = REPULSE_R * REPULSE_R;
// const REPULSE_F = 8;
// const SPRING = 0.03;
// const DAMP = 0.82; 

// type FormType = "siem" | "hawkeye" | "xdr";
// const FORMS: FormType[] = ["siem", "hawkeye", "xdr"];

// interface Particle {
//   id: number;
//   x: number; y: number;
//   vx: number; vy: number;
//   tx: number; ty: number; 
//   baseR: number;
//   col: string;
//   depth: number;

//   // Shape coordinates
//   siemPhi: number; siemTheta: number; siemRNorm: number;
//   hawkeyeX: number; hawkeyeY: number;
//   xdrX: number; xdrY: number;

//   // Physics
//   wobbleSpeed: number; wobbleRad: number; wobbleAngle: number;
//   lerpSpeed: number;
// }

// // Universal SVG Sampler
// function samplePath(pathString: string, n: number, w: number, h: number): { x: number; y: number }[] {
//   const ns = "http://www.w3.org/2000/svg";
//   const svg = document.createElementNS(ns, "svg");
//   svg.setAttribute("viewBox", "0 0 24 24");
//   svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
//   const p = document.createElementNS(ns, "path");
//   p.setAttribute("d", pathString);
//   svg.appendChild(p);
//   document.body.appendChild(svg);

//   const len = p.getTotalLength();
//   const sc = Math.min(w, h) * 0.72 / 24;
//   const pts = [];

//   for (let i = 0; i < n; i++) {
//     const pt = p.getPointAtLength((i / n) * len);
//     // Center it based on the 24x24 viewBox (subtract 12)
//     pts.push({ x: (pt.x - 12) * sc, y: (pt.y - 12) * sc }); 
//   }

//   document.body.removeChild(svg);
//   return pts;
// }

// function buildParticles(w: number, h: number): Particle[] {
//   const xdrPts = samplePath(SHIELD_LOCK_PATH, N, w, h);
//   const eyePts = samplePath(HAWKEYE_PATH, N, w, h);

//   // Sort paths to keep the transition lines relatively clean
//   xdrPts.sort((a, b) => a.x - b.x); 
//   eyePts.sort((a, b) => a.x - b.x);

//   const pts: Particle[] = [];
//   for (let i = 0; i < N; i++) {
//     const isOuterShell = Math.random() < 0.78;

//     pts.push({
//       id: i,
//       x: w / 2 + (Math.random() - 0.5) * w,
//       y: h / 2 + (Math.random() - 0.5) * h,
//       vx: 0, vy: 0,
//       tx: w / 2, ty: h / 2,
//       baseR: 0.8 + Math.random() * 1.5,
//       col: CYBER_COLORS[Math.floor(Math.random() * CYBER_COLORS.length)],
//       depth: 0,

//       // SIEM (Data Sphere)
//       siemTheta: 2 * Math.PI * Math.random(),
//       siemPhi: Math.acos(2 * Math.random() - 1),
//       siemRNorm: isOuterShell ? 0.82 + Math.random() * 0.18 : 0.28 + Math.random() * 0.54,

//       // Hawkeye (Eye)
//       hawkeyeX: eyePts[i].x,
//       hawkeyeY: eyePts[i].y,

//       // XDR (Shield)
//       xdrX: xdrPts[i].x,
//       xdrY: xdrPts[i].y,

//       // Dynamics
//       wobbleSpeed: 0.01 + Math.random() * 0.02,
//       wobbleRad: 0.5 + Math.random() * 2,
//       wobbleAngle: Math.random() * Math.PI * 2,
//       lerpSpeed: 0.03 + Math.random() * 0.06 // Randomized smooth flocking speed
//     });
//   }
//   return pts;
// }

// export default function CyberSecurityMorph() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const formIdxRef = useRef(0);
//   const mouseRef = useRef({ x: -9999, y: -9999, on: false });
//   const rafRef = useRef<number>(0);
//   const sizeRef = useRef({ w: 0, h: 0 });
//   const timeRef = useRef(0);

//   const resize = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.parentElement!.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;
//     const W = rect.width, H = 520;
//     canvas.width = W * dpr;
//     canvas.height = H * dpr;
//     canvas.style.width = W + "px";
//     canvas.style.height = H + "px";
//     const ctx = canvas.getContext("2d", { alpha: true })!;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     sizeRef.current = { w: W, h: H };

//     if (particlesRef.current.length === 0) {
//       particlesRef.current = buildParticles(W, H);
//     }
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     resize();
//     window.addEventListener("resize", resize);
//     const ctx = canvas.getContext("2d", { alpha: true })!;

//     function loop() {
//       const { w, h } = sizeRef.current;
//       const cx = w / 2;
//       const cy = h / 2;
//       const radiusBase = Math.min(w, h);
//       timeRef.current += 0.005;
//       const t = timeRef.current;

//       const currentForm = FORMS[formIdxRef.current];

//       ctx.clearRect(0, 0, w, h);

//       const mouse = mouseRef.current;
//       const cosT = Math.cos(t);
//       const sinT = Math.sin(t);

//       for (const p of particlesRef.current) {
//         let idealX = cx, idealY = cy, idealZ = 0;

//         if (currentForm === "siem") {
//           // 3D Global Data Sphere
//           const r = radiusBase * 0.35 * p.siemRNorm;
//           const sinPhi = Math.sin(p.siemPhi);
//           const x3 = r * sinPhi * Math.cos(p.siemTheta);
//           const z3 = r * sinPhi * Math.sin(p.siemTheta);
//           const y3 = r * Math.cos(p.siemPhi);

//           const rx = x3 * cosT + z3 * sinT;
//           const rz = -x3 * sinT + z3 * cosT;

//           idealX = cx + rx;
//           idealY = cy + y3;
//           idealZ = rz;
//         } 
//         else if (currentForm === "hawkeye") {
//           idealX = cx + p.hawkeyeX;
//           idealY = cy + p.hawkeyeY;
//           idealZ = 0;
//         }
//         else if (currentForm === "xdr") {
//           idealX = cx + p.xdrX;
//           idealY = cy + p.xdrY;
//           idealZ = 0;
//         }

//         // Apply 3D perspective depth to all forms
//         const fov = 800;
//         const scale = fov / (fov - idealZ);
//         idealX = cx + (idealX - cx) * scale;
//         idealY = cy + (idealY - cy) * scale;
//         p.depth = idealZ / (radiusBase * 0.5); 

//         // Organic Cyber Wobble
//         p.wobbleAngle += p.wobbleSpeed;
//         idealX += Math.cos(p.wobbleAngle) * p.wobbleRad;
//         idealY += Math.sin(p.wobbleAngle) * p.wobbleRad;

//         // Smoothly interpolate the target anchor (The Flocking Magic)
//         p.tx += (idealX - p.tx) * p.lerpSpeed;
//         p.ty += (idealY - p.ty) * p.lerpSpeed;

//         // Spring physics chasing the smoothly moving target
//         p.vx += (p.tx - p.x) * SPRING;
//         p.vy += (p.ty - p.y) * SPRING;

//         // Mouse Repulsion
//         if (mouse.on) {
//           const dx = p.x - mouse.x, dy = p.y - mouse.y;
//           const dsq = dx * dx + dy * dy;
//           if (dsq < REPULSE_RSQ && dsq > 0.1) {
//             const d = Math.sqrt(dsq);
//             const f = ((REPULSE_R - d) / REPULSE_R) * REPULSE_F;
//             p.vx += (dx / d) * f;
//             p.vy += (dy / d) * f;
//           }
//         }

//         p.vx *= DAMP; 
//         p.vy *= DAMP;
//         p.x += p.vx; 
//         p.y += p.vy;
//       }

//       // 3D Depth Sorting
//       const sorted = [...particlesRef.current].sort((a, b) => a.depth - b.depth);

//       for (const p of sorted) {
//         const scale = 800 / (800 - p.depth * 400);
//         const radius = Math.max(0.5, p.baseR * scale);

//         let op = 0.3 + ((p.depth + 1) / 2) * 0.7;
//         op = Math.min(1, Math.max(0.05, op));

//         ctx.globalAlpha = op;
//         ctx.fillStyle = p.col;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       ctx.globalAlpha = 1;
//       rafRef.current = requestAnimationFrame(loop);
//     }

//     rafRef.current = requestAnimationFrame(loop);

//     // Cycle forms every 5.5 seconds
//     const timer = window.setInterval(() => {
//       formIdxRef.current = (formIdxRef.current + 1) % FORMS.length;
//     }, 5500);

//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       clearInterval(timer);
//       window.removeEventListener("resize", resize);
//     };
//   }, [resize]);

//   return (
//     <div 
//       style={{ 
//         userSelect: "none", 
//         borderRadius: "14px", 
//         overflow: "hidden",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{ display: "block", width: "100%", height: "520px", cursor: "crosshair" }}
//         onMouseMove={(e) => {
//           const r = canvasRef.current!.getBoundingClientRect();
//           mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
//         }}
//         onMouseLeave={() => { mouseRef.current.on = false; }}
//       />
//     </div>
//   );
// }
import { useEffect, useRef, useCallback } from "react";

// XDR: Shield & Lock
const SHIELD_LOCK_PATH =
  "M12 2L3 5.5L3 11.5C3 17 7.5 21.5 12 23C16.5 21.5 21 17 21 11.5L21 5.5Z " +
  "M9 11.5V8.5C9 6.8 10.3 5.5 12 5.5C13.7 5.5 15 6.8 15 8.5V11.5 " +
  "M7.5 11.5H16.5C17 11.5 17.5 12 17.5 12.5V17.5C17.5 18 17 18.5 16.5 18.5H7.5C7 18.5 6.5 18 6.5 17.5V12.5C6.5 12 7 11.5 7.5 11.5Z " +
  "M12 13.2C11.5 13.2 11.2 13.5 11.2 14C11.2 14.3 11.4 14.6 11.6 14.7L11.3 16.5H12.7L12.4 14.7C12.6 14.6 12.8 14.3 12.8 14C12.8 13.5 12.5 13.2 12 13.2Z";

// Hawkeye: Sentinel Eye
const HAWKEYE_PATH =
  "M12 4.5C7 4.5 2.7 8.3 1 12c1.7 3.7 6 7.5 11 7.5s9.3-3.8 11-7.5c-1.7-3.7-6-7.5-11-7.5z " +
  "M12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z " +
  "M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z";

const TIFFANY_BLUE = "#0ABAB5";
const CYBER_COLORS = [TIFFANY_BLUE];

const N = 10000;
const UNIFORM_PARTICLE_RADIUS = 0.4;
const REPULSE_R = 120;
const REPULSE_RSQ = REPULSE_R * REPULSE_R;
const REPULSE_F = 12;
const SPRING = 0.02;
const DAMP = 0.88;

type FormType = "siem" | "hawkeye" | "xdr";
const FORMS: FormType[] = ["siem", "hawkeye", "xdr"];

interface Particle {
  id: number;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  baseR: number;
  col: string;
  depth: number;

  isStray: boolean;
  strayTheta: number; strayPhi: number; strayRNorm: number;

  siemPhi: number; siemTheta: number; siemRNorm: number;
  hawkeyeX: number; hawkeyeY: number; shapeZ: number;
  xdrX: number; xdrY: number;

  wobbleSpeed: number; wobbleRad: number; wobbleAngle: number;
}

function samplePath(pathString: string, n: number, w: number, h: number): { x: number; y: number }[] {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  const p = document.createElementNS(ns, "path");
  p.setAttribute("d", pathString);
  svg.appendChild(p);
  document.body.appendChild(svg);

  const len = p.getTotalLength();
  const sc = Math.min(w, h) * 0.65 / 24;
  const pts = [];

  for (let i = 0; i < n; i++) {
    const pt = p.getPointAtLength((i / n) * len);
    pts.push({ x: (pt.x - 12) * sc, y: (pt.y - 12) * sc });
  }

  document.body.removeChild(svg);
  return pts;
}

function buildParticles(w: number, h: number): Particle[] {
  const xdrPts = samplePath(SHIELD_LOCK_PATH, N, w, h);
  const eyePts = samplePath(HAWKEYE_PATH, N, w, h);

  xdrPts.sort((a, b) => a.x - b.x);
  eyePts.sort((a, b) => a.x - b.x);

  const pts: Particle[] = [];
  for (let i = 0; i < N; i++) {
    const isOuterShell = Math.random() < 0.78;
    const isStray = Math.random() < 0.15;

    const startTheta = Math.random() * Math.PI * 2;
    const startPhi = Math.acos(2 * Math.random() - 1);
    const startR = Math.random() * (Math.min(w, h) * 0.5);

    pts.push({
      id: i,
      x: startR * Math.sin(startPhi) * Math.cos(startTheta),
      y: startR * Math.cos(startPhi),
      z: startR * Math.sin(startPhi) * Math.sin(startTheta),
      vx: 0, vy: 0, vz: 0,

      baseR: UNIFORM_PARTICLE_RADIUS,
      col: CYBER_COLORS[Math.floor(Math.random() * CYBER_COLORS.length)],
      depth: 0,

      isStray,
      strayTheta: Math.random() * Math.PI * 2,
      strayPhi: Math.acos(2 * Math.random() - 1),
      strayRNorm: 0.6 + Math.random() * 0.4,

      siemTheta: 2 * Math.PI * Math.random(),
      siemPhi: Math.acos(2 * Math.random() - 1),
      siemRNorm: isOuterShell ? 0.82 + Math.random() * 0.18 : 0.28 + Math.random() * 0.54,

      hawkeyeX: eyePts[i].x,
      hawkeyeY: eyePts[i].y,
      xdrX: xdrPts[i].x,
      xdrY: xdrPts[i].y,
      shapeZ: (Math.random() - 0.5) * 80,

      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleRad: 0.5 + Math.random() * 2,
      wobbleAngle: Math.random() * Math.PI * 2,
    });
  }
  return pts;
}
interface CyberSecurityMorphProps {
  currentForm?: "siem" | "hawkeye" | "xdr";
}

export default function CyberSecurityMorph({ currentForm }: CyberSecurityMorphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const formIdxRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, on: false });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  // Sync form from props
  useEffect(() => {
    if (currentForm) {
      const idx = FORMS.indexOf(currentForm);
      if (idx !== -1) {
        formIdxRef.current = idx;
      }
    }
  }, [currentForm]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const W = rect.width || 800, H = 520;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    // Set alpha back to true to allow transparency
    const ctx = canvas.getContext("2d", { alpha: true })!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w: W, h: H };

    if (particlesRef.current.length === 0) {
      particlesRef.current = buildParticles(W, H);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d", { alpha: true })!;

    function loop() {
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const radiusBase = Math.min(w, h);
      timeRef.current += 0.005;
      const t = timeRef.current;

      const currentForm = FORMS[formIdxRef.current];

      // Clear the canvas cleanly for a transparent background
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);

      // Calculate a limited sway instead of a full continuous spin.
      // Math.sin creates a back-and-forth pendulum effect.
      const swayAngle = Math.sin(t * 0.8) * 0.5; // Max rotation of ~28 degrees
      const cosR = Math.cos(swayAngle);
      const sinR = Math.sin(swayAngle);

      for (const p of particlesRef.current) {
        let targetX = 0, targetY = 0, targetZ = 0;

        if (p.isStray) {
          p.strayTheta += 0.0015;
          const sr = radiusBase * 0.45 * p.strayRNorm;
          const sx = sr * Math.sin(p.strayPhi) * Math.cos(p.strayTheta);
          const sy = sr * Math.cos(p.strayPhi);
          const sz = sr * Math.sin(p.strayPhi) * Math.sin(p.strayTheta);

          targetX = sx * cosT + sz * sinT;
          targetY = sy;
          targetZ = -sx * sinT + sz * cosT;
        }
        else {
          if (currentForm === "siem") {
            const r = radiusBase * 0.35 * p.siemRNorm;
            const sinPhi = Math.sin(p.siemPhi);
            const px = r * sinPhi * Math.cos(p.siemTheta);
            const pz = r * sinPhi * Math.sin(p.siemTheta);
            const py = r * Math.cos(p.siemPhi);

            targetX = px * cosT + pz * sinT;
            targetY = py;
            targetZ = -px * sinT + pz * cosT;
          }
          else if (currentForm === "hawkeye") {
            const px = p.hawkeyeX;
            const pz = p.shapeZ;
            targetX = px * cosR + pz * sinR;
            targetY = p.hawkeyeY;
            targetZ = -px * sinR + pz * cosR;
          }
          else if (currentForm === "xdr") {
            const px = p.xdrX;
            const pz = p.shapeZ;
            targetX = px * cosR + pz * sinR;
            targetY = p.xdrY;
            targetZ = -px * sinR + pz * cosR;
          }
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
          const dx = screenX - mouse.x, dy = screenY - mouse.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < REPULSE_RSQ && dsq > 0.1) {
            const d = Math.sqrt(dsq);
            const f = ((REPULSE_R - d) / REPULSE_R) * REPULSE_F;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
            p.vz += f * 1.5;
          }
        }

        const radius = UNIFORM_PARTICLE_RADIUS;
        let op = 0.45 + ((p.depth + 1) / 2) * 0.55;
        op = Math.min(1, Math.max(0.45, op));

        ctx.globalAlpha = op;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);


    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  return (
    <div
      style={{
        userSelect: "none",
        borderRadius: "14px",
        overflow: "hidden",
        // Removed the solid background to allow transparency to pass through
        background: "transparent"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "520px" }}
        onMouseMove={(e) => {
          const r = canvasRef.current!.getBoundingClientRect();
          mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
        }}
        onMouseLeave={() => { mouseRef.current.on = false; }}
      />
    </div>
  );
}