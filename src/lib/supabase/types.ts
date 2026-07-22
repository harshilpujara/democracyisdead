/** The columns actually readable through the anon/authenticated column grants (see supabase/migrations/0001_supports.sql). */
export interface PublicSupportRow {
  id: string;
  created_at: string;
  city: string;
  lat: number;
  lng: number;
  message: string | null;
  display_name: string | null;
}

export interface SupportInsertPayload {
  display_name: string | null;
  is_anonymous: boolean;
  city: string;
  state: string | null;
  country: string;
  lat: number;
  lng: number;
  message: string | null;
}

export const PUBLIC_SUPPORT_COLUMNS =
  "id, created_at, city, lat, lng, message, display_name" as const;
