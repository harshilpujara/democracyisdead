import { NextResponse } from "next/server";
import { City, Country, State } from "country-state-city";
import type { CityOption } from "@/lib/geo/city-search";

// The country-state-city dataset has ~148k cities — far too large to ship
// to the client, so search happens here on the server instead.
const ALL_CITIES = City.getAllCities();

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (query.length < 2) {
    return NextResponse.json({ results: [] satisfies CityOption[] });
  }

  const needle = query.toLowerCase();
  const seen = new Set<string>();
  const starts: CityOption[] = [];
  const contains: CityOption[] = [];

  for (const city of ALL_CITIES) {
    const name = city.name.toLowerCase();
    const isStart = name.startsWith(needle);
    if (!isStart && !name.includes(needle)) continue;

    const key = `${city.name}|${city.stateCode}|${city.countryCode}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const lat = Number.parseFloat(city.latitude ?? "");
    const lng = Number.parseFloat(city.longitude ?? "");
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const state = State.getStateByCodeAndCountry(city.stateCode, city.countryCode);
    const country = Country.getCountryByCode(city.countryCode);
    if (!country) continue;

    const option: CityOption = {
      id: key,
      label: city.name,
      city: city.name,
      state: state?.name ?? null,
      country: country.name,
      lat,
      lng,
    };

    const bucket = isStart ? starts : contains;
    if (bucket.length < 300) bucket.push(option);
  }

  const byName = (a: CityOption, b: CityOption) => a.city.localeCompare(b.city);
  const results = [...starts.sort(byName), ...contains.sort(byName)].slice(0, 20);
  return NextResponse.json({ results });
}
