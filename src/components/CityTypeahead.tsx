"use client";

import { Typeahead, TypeaheadItem } from "@astryxdesign/core/Typeahead";
import { citySearchSource, type CityOption } from "@/lib/geo/city-search";

export function CityTypeahead({
  value,
  onChange,
}: {
  value: CityOption | null;
  onChange: (city: CityOption | null) => void;
}) {
  return (
    <Typeahead<CityOption>
      label="Where are you from?"
      placeholder="Search for your city..."
      searchSource={citySearchSource}
      value={value}
      onChange={onChange}
      hasEntriesOnFocus
      isRequired
      renderItem={(item) => (
        <TypeaheadItem
          item={item}
          description={[item.state, item.country].filter(Boolean).join(", ")}
        />
      )}
    />
  );
}
