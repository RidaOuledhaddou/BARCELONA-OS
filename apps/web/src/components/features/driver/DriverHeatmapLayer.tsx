"use client";

import type { DemandPulseCell } from "@dashboard/lib/mock-data";

export type DriverHeatmapLayerProps = {
  cells: DemandPulseCell[];
};

/** Domain-prefixed layer hook for future MapLibre / deck.gl integration. */
export function DriverHeatmapLayer({ cells }: DriverHeatmapLayerProps) {
  void cells;
  return null;
}
