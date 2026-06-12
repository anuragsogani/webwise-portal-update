/**
 * useFabricSimulation - dotted wave terrain engine (single rAF loop).
 *
 * A grid of points is displaced by a travelling heightfield and projected
 * through a simple perspective camera into a flowing surface. Depth is read
 * through dot size + three opacity buckets; lime traces only the wave crests.
 * The surface lifts and brightens under the pointer.
 *
 * Performance: zero React state per frame; the whole field is THREE <path>
 * writes per frame (far / near / crest), each packing varying-radius dots into
 * one `d`. Pauses offscreen / tab hidden; reduced-motion → one static frame.
 */
import { useEffect } from "react";
import { noise2D } from "./noise";
import type { FabricGeometry } from "./types";

interface SimOptions {
  enabled: boolean;
}

export function useFabricSimulation(
  svgRef: React.RefObject<SVGSVGElement>,
  geometry: FabricGeometry,
  { enabled }: SimOptions,
): void {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const farEl = svg.querySelector<SVGPathElement>(".oif-dots-far");
    const nearEl = svg.querySelector<SVGPathElement>(".oif-dots-near");
    const limeEl = svg.querySelector<SVGPathElement>(".oif-dots-lime");
    if (!farEl || !nearEl || !limeEl) return;

    const { width: W, height: H, cols: C, rows: Rr } = geometry;

    // camera / field constants - field sits low so it clears the headline
    const focal = 560;
    const dx = (W * 1.6) / C; // wider so the bundle reaches the corners
    const dz = 17;
    const cx = W * 0.5;
    const horizonY = H * 0.46;
    const groundY = H * 0.92;
    const amp = 70;
    const R_CURSOR = Math.min(W, H) * 0.2;

    const farBuf: string[] = [];
    const nearBuf: string[] = [];
    const limeBuf: string[] = [];

    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let camX = 0;
    let lastPointer = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = svg!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scale = Math.max(rect.width / W, rect.height / H);
      const offX = (rect.width - W * scale) / 2;
      const offY = (rect.height - H * scale) / 2;
      pointerX = (e.clientX - rect.left - offX) / scale;
      pointerY = (e.clientY - rect.top - offY) / scale;
      pointerActive = true;
      lastPointer = performance.now();
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = false;
    let startT = 0;

    function frame(now: number) {
      if (!startT) startT = now;
      const time = (now - startT) / 1000;
      if (pointerActive && now - lastPointer > 2600) pointerActive = false;

      const camTarget = pointerActive ? (pointerX - W * 0.5) * 0.05 : 0;
      camX += (camTarget - camX) * 0.04;

      farBuf.length = 0;
      nearBuf.length = 0;
      limeBuf.length = 0;

      // draw far rows first so near dots layer on top
      for (let j = 0; j < Rr; j++) {
        const worldZ = (Rr - 1 - j) * dz;
        const persp = focal / (focal + worldZ);
        const rowY = horizonY + (groundY - horizonY) * persp;
        for (let i = 0; i < C; i++) {
          const worldX = (i - (C - 1) / 2) * dx;
          const h =
            Math.sin(worldX * 0.011 + time * 1.05) * 0.55 +
            Math.sin(worldZ * 0.02 - time * 0.7 + worldX * 0.004) * 0.4 +
            noise2D(worldX * 0.0035 + time * 0.06, worldZ * 0.006, 17) * 0.6;

          // calm the waves through the centre column where the copy lives
          const centre = Math.min(1, Math.abs(worldX) / (W * 0.34));
          const ampH = 0.2 + 0.8 * centre * centre;

          let sx = cx + (worldX + camX) * persp;
          let sy = rowY - h * amp * ampH * persp;

          let bump = 0;
          if (pointerActive) {
            const d = Math.hypot(sx - pointerX, sy - pointerY);
            if (d < R_CURSOR) {
              bump = 1 - d / R_CURSOR;
              sy -= bump * bump * 34;
            }
          }

          const hn = (h + 1.55) / 3.1; // ~0..1
          const size = (0.28 + 0.95 * persp) * (0.62 + 0.4 * hn) + bump * 1.2;

          // lime crests, but never in the calm centre band (keeps text clean)
          if ((hn > 0.82 && centre > 0.4) || bump > 0.55) limeBuf.push(dot(sx, sy, size));
          else if (persp > 0.5) nearBuf.push(dot(sx, sy, size));
          else farBuf.push(dot(sx, sy, size));
        }
      }

      farEl!.setAttribute("d", farBuf.join(""));
      nearEl!.setAttribute("d", nearBuf.join(""));
      limeEl!.setAttribute("d", limeBuf.join(""));

      if (running) raf = requestAnimationFrame(frame);
    }

    function play() {
      if (running) return;
      running = true;
      startT = 0;
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    if (!enabled) {
      frame(0);
      window.removeEventListener("pointermove", onPointerMove);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !document.hidden) play();
        else pause();
      },
      { threshold: 0.02 },
    );
    io.observe(svg);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (svg.getBoundingClientRect().bottom > 0) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [svgRef, geometry, enabled]);
}

function r1(v: number): string {
  return (Math.round(v * 10) / 10).toString();
}

/** A dot as two arcs so many varying-radius dots fit one <path> `d`. */
function dot(x: number, y: number, r: number): string {
  const d = (r * 2).toFixed(1);
  const rs = r.toFixed(1);
  return `M${r1(x)} ${r1(y)}m-${rs} 0a${rs} ${rs} 0 1 0 ${d} 0a${rs} ${rs} 0 1 0 -${d} 0`;
}
