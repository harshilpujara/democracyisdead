"use client";

import { useMemo } from "react";
import type { COBEOptions } from "cobe";
import { Globe } from "@/components/magicui/globe";
import type { PublicSupportRow } from "@/lib/supabase/types";

const BASE_MARKER_SIZE = 0.045;
const RECENT_MARKER_SIZE = 0.12;

const BASE_CONFIG: Omit<COBEOptions, "markers" | "width" | "height" | "onRender"> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.28, 0.24, 0.2],
  markerColor: [0.929, 0.902, 0.839],
  glowColor: [0.631, 0.075, 0.129],
};

export function SupportGlobe({
  supports,
  recentlyAddedIds,
}: {
  supports: PublicSupportRow[];
  recentlyAddedIds: Set<string>;
}) {
  const config = useMemo<COBEOptions>(
    () => ({
      ...BASE_CONFIG,
      width: 800,
      height: 800,
      onRender: () => {},
      markers: supports.map((s) => ({
        location: [s.lat, s.lng] as [number, number],
        size: recentlyAddedIds.has(s.id) ? RECENT_MARKER_SIZE : BASE_MARKER_SIZE,
      })),
    }),
    [supports, recentlyAddedIds]
  );

  return (
    <div className="support-globe">
      <Globe config={config} />
    </div>
  );
}
