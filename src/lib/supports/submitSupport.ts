import { supabase } from "@/lib/supabase/client";
import { PUBLIC_SUPPORT_COLUMNS, type PublicSupportRow, type SupportInsertPayload } from "@/lib/supabase/types";
import { SEED_SUPPORTS } from "@/data/seed-supports";

export interface SubmitSupportInput {
  displayName: string | null;
  isAnonymous: boolean;
  city: string;
  state: string | null;
  country: string;
  lat: number;
  lng: number;
  message: string | null;
}

export interface SubmitSupportResult {
  row: PublicSupportRow;
  isFirstInCity: boolean;
  supporterNumber: number;
}

/** Checks seed + live data, inserts the row, and reports the submitter's city-first badge + ordinal number. */
export async function submitSupport(input: SubmitSupportInput): Promise<SubmitSupportResult> {
  if (!supabase) {
    throw new Error(
      "Supabase isn't configured yet — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
    );
  }

  const cityLower = input.city.trim().toLowerCase();
  const isFirstInSeed = !SEED_SUPPORTS.some((s) => s.city.toLowerCase() === cityLower);

  const { count: existingCount, error: countError } = await supabase
    .from("supports")
    .select("id", { count: "exact", head: true })
    .ilike("city", input.city.trim());
  if (countError) throw countError;

  const isFirstInCity = isFirstInSeed && (existingCount ?? 0) === 0;

  const payload: SupportInsertPayload = {
    display_name: input.isAnonymous ? null : input.displayName,
    is_anonymous: input.isAnonymous,
    city: input.city,
    state: input.state,
    country: input.country,
    lat: input.lat,
    lng: input.lng,
    message: input.message,
  };

  const { data, error } = await supabase
    .from("supports")
    .insert(payload)
    .select(PUBLIC_SUPPORT_COLUMNS)
    .single();
  if (error || !data) throw error ?? new Error("Insert failed");

  const { count: totalAfter } = await supabase
    .from("supports")
    .select("id", { count: "exact", head: true });

  return {
    row: data as PublicSupportRow,
    isFirstInCity,
    supporterNumber: totalAfter ?? 1,
  };
}
