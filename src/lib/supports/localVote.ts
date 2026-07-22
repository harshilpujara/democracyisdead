"use client";

const STORAGE_KEY = "did:support:v1";

export interface LocalSupportRecord {
  id: string;
  city: string;
  lat: number;
  lng: number;
  displayName: string | null;
  isAnonymous: boolean;
  isFirstInCity: boolean;
  supporterNumber: number;
  createdAt: string;
}

/** One-vote-per-device soft guard — easy to clear via devtools, and that's fine; it's a courtesy, not enforcement. */
export function getLocalSupport(): LocalSupportRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalSupportRecord) : null;
  } catch {
    return null;
  }
}

export function saveLocalSupport(record: LocalSupportRecord): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private mode, quota) — the guard just won't persist.
  }
}
