"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";
import { Text } from "@astryxdesign/core/Text";
import type { PublicSupportRow } from "@/lib/supabase/types";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <Text type="code" color="secondary">
      [ Loading Globe ]
    </Text>
  ),
});

const DELHI = { lat: 28.6139, lng: 77.209 };
const MAX_ARCS = 60;

const OXBLOOD = "#A11321";
const BONE = "#EDE6D6";
const INK = "#100D0C";

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

interface ArcDatum {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export function SupportGlobe({
  supports,
  recentlyAddedIds,
}: {
  supports: PublicSupportRow[];
  recentlyAddedIds: Set<string>;
}) {
  const [containerRef, size] = useElementSize<HTMLDivElement>();
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (!controls) return;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
  }, [size.width]);

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color(INK),
        emissive: new THREE.Color(OXBLOOD),
        emissiveIntensity: 0.035,
        shininess: 3,
      }),
    []
  );

  const arcs = useMemo<ArcDatum[]>(
    () =>
      supports.slice(-MAX_ARCS).map((s) => ({
        id: s.id,
        startLat: s.lat,
        startLng: s.lng,
        endLat: DELHI.lat,
        endLng: DELHI.lng,
      })),
    [supports]
  );

  const rings = useMemo(
    () => supports.filter((s) => recentlyAddedIds.has(s.id)),
    [supports, recentlyAddedIds]
  );

  return (
    <div ref={containerRef} className="support-globe">
      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={null}
          globeMaterial={globeMaterial}
          showAtmosphere
          atmosphereColor={OXBLOOD}
          atmosphereAltitude={0.2}
          pointsData={supports}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d) =>
            recentlyAddedIds.has((d as PublicSupportRow).id) ? OXBLOOD : BONE
          }
          pointAltitude={0.006}
          pointRadius={0.32}
          pointLabel={(d) => {
            const s = d as PublicSupportRow;
            return s.display_name ? `${s.display_name} — ${s.city}` : s.city;
          }}
          arcsData={arcs}
          arcColor={() => "rgba(161, 19, 33, 0.35)"}
          arcAltitude={0.22}
          arcStroke={0.3}
          arcDashLength={0.4}
          arcDashGap={2.2}
          arcDashAnimateTime={4000}
          ringsData={rings}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t: number) => `rgba(161, 19, 33, ${1 - t})`}
          ringMaxRadius={4.5}
          ringPropagationSpeed={3}
          ringRepeatPeriod={900}
        />
      )}
    </div>
  );
}
