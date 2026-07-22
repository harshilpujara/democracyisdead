"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { PUBLIC_SUPPORT_COLUMNS, type PublicSupportRow } from "@/lib/supabase/types";
import { SEED_SUPPORTS } from "@/data/seed-supports";

const RECENT_WINDOW_MS = 4000;

interface UseSupportsResult {
  /** Seed rows + live rows from Supabase, oldest first. */
  supports: PublicSupportRow[];
  /** Count of real (non-seed) rows only. */
  liveCount: number;
  /** supports.length — what the globe actually renders. */
  totalCount: number;
  /** Ids that arrived via realtime in the last few seconds, for a pulse-in effect. */
  recentlyAddedIds: Set<string>;
}

export function useSupports(): UseSupportsResult {
  const [liveRows, setLiveRows] = useState<PublicSupportRow[]>([]);
  const [recentlyAddedIds, setRecentlyAddedIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let cancelled = false;

    client
      .from("supports")
      .select(PUBLIC_SUPPORT_COLUMNS)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const rows = data as PublicSupportRow[];
        rows.forEach((row) => seenIds.current.add(row.id));
        setLiveRows(rows);
      });

    const channel = client
      .channel("supports-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "supports" },
        (payload: RealtimePostgresInsertPayload<Record<string, unknown>>) => {
          const raw = payload.new;
          const row: PublicSupportRow = {
            id: String(raw.id),
            created_at: String(raw.created_at),
            city: String(raw.city),
            lat: Number(raw.lat),
            lng: Number(raw.lng),
            message: (raw.message as string | null) ?? null,
            display_name: (raw.display_name as string | null) ?? null,
          };
          if (seenIds.current.has(row.id)) return;
          seenIds.current.add(row.id);

          setLiveRows((prev) => [...prev, row]);
          setRecentlyAddedIds((prev) => new Set(prev).add(row.id));
          setTimeout(() => {
            setRecentlyAddedIds((prev) => {
              const next = new Set(prev);
              next.delete(row.id);
              return next;
            });
          }, RECENT_WINDOW_MS);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      client.removeChannel(channel);
    };
  }, []);

  const supports = useMemo(() => [...SEED_SUPPORTS, ...liveRows], [liveRows]);

  return {
    supports,
    liveCount: liveRows.length,
    totalCount: supports.length,
    recentlyAddedIds,
  };
}
