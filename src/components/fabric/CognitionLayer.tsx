/**
 * CognitionLayer - static structure for the dotted wave terrain.
 * Three <path>s (far / near / crest) whose `d` is driven imperatively by
 * useFabricSimulation. Depth via opacity buckets; lime traces crests only.
 */
import { memo } from "react";

function CognitionLayerImpl() {
  return (
    <g className="oif-wave" aria-hidden="true">
      <path className="oif-dots-far" />
      <path className="oif-dots-near" />
      <path className="oif-dots-lime" />
    </g>
  );
}

export const CognitionLayer = memo(CognitionLayerImpl);
