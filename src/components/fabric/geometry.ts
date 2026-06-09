/**
 * Geometry for the Dotted Wave Terrain.
 * The grid itself is generated in the engine; here we only fix the core
 * (horizon anchor) and its rings. Deterministic, trivial — kept for symmetry.
 */
import type { FabricConfig, FabricGeometry, Ring, Vec2 } from "./types";

function buildRings(): Ring[] {
  const rings: Ring[] = [];
  for (let i = 0; i < 10; i++) {
    rings.push({ r: 10 + i * 8, opacity: Math.max(0.04, 0.22 - i * 0.018) });
  }
  return rings;
}

export function buildGeometry(cfg: FabricConfig): FabricGeometry {
  const core: Vec2 = { x: cfg.width * 0.84, y: cfg.height * 0.26 };
  return {
    width: cfg.width,
    height: cfg.height,
    core,
    rings: buildRings(),
    cols: cfg.cols,
    rows: cfg.rows,
  };
}
