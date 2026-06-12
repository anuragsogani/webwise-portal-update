/**
 * Operational Intelligence Fabric - shared types (Dotted Wave Terrain).
 * A dense field of points displaced into a flowing perspective surface.
 */

export interface Vec2 {
  x: number;
  y: number;
}

/** A concentric ring of the central core (horizon anchor). */
export interface Ring {
  r: number;
  opacity: number;
}

export interface FabricGeometry {
  width: number;
  height: number;
  core: Vec2;
  rings: Ring[];
  cols: number;
  rows: number;
}

export interface FabricConfig {
  width: number;
  height: number;
  seed: number;
  cols: number;
  rows: number;
}
