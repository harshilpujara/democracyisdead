import type { SearchableItem, SearchSource } from "@astryxdesign/core/Typeahead";

export interface CityOption extends SearchableItem {
  city: string;
  state: string | null;
  country: string;
  lat: number;
  lng: number;
}

/** Shown before the user types anything, so the field isn't empty and inert. */
export const CITY_BOOTSTRAP: CityOption[] = [
  { id: "IN-DL-Delhi", label: "Delhi", city: "Delhi", state: "Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { id: "IN-MH-Mumbai", label: "Mumbai", city: "Mumbai", state: "Maharashtra", country: "India", lat: 19.076, lng: 72.8777 },
  { id: "IN-KA-Bengaluru", label: "Bengaluru", city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.9716, lng: 77.5946 },
  { id: "GB-LDN-London", label: "London", city: "London", state: "England", country: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  { id: "US-NY-New York", label: "New York", city: "New York", state: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { id: "AE-DU-Dubai", label: "Dubai", city: "Dubai", state: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
];

async function searchCities(query: string): Promise<CityOption[]> {
  if (query.trim().length < 2) return [];
  const response = await fetch(`/api/cities?q=${encodeURIComponent(query)}`);
  if (!response.ok) return [];
  const data = (await response.json()) as { results: CityOption[] };
  return data.results;
}

export const citySearchSource: SearchSource<CityOption> = {
  search: searchCities,
  bootstrap: () => CITY_BOOTSTRAP,
};
