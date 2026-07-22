"use client";

import { useState, type FormEvent } from "react";
import { VStack, HStack } from "@astryxdesign/core/Stack";
import { TextInput } from "@astryxdesign/core/TextInput";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { Button } from "@astryxdesign/core/Button";
import { Text } from "@astryxdesign/core/Text";
import { CityTypeahead } from "@/components/CityTypeahead";
import type { CityOption } from "@/lib/geo/city-search";
import { submitSupport } from "@/lib/supports/submitSupport";
import { saveLocalSupport, type LocalSupportRecord } from "@/lib/supports/localVote";

const MESSAGE_LIMIT = 180;

export function SupportForm({
  onSubmitted,
}: {
  onSubmitted: (record: LocalSupportRecord) => void;
}) {
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [city, setCity] = useState<CityOption | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(city) && (isAnonymous || name.trim().length > 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!city || !canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const result = await submitSupport({
        displayName: isAnonymous ? null : name.trim(),
        isAnonymous,
        city: city.city,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
        message: message.trim() || null,
      });

      const record: LocalSupportRecord = {
        id: result.row.id,
        city: result.row.city,
        lat: result.row.lat,
        lng: result.row.lng,
        displayName: result.row.display_name,
        isAnonymous,
        isFirstInCity: result.isFirstInCity,
        supporterNumber: result.supporterNumber,
        createdAt: result.row.created_at,
      };
      saveLocalSupport(record);
      onSubmitted(record);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <VStack as="form" gap={6} className="support-form" onSubmit={handleSubmit}>
      <VStack gap={3}>
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          placeholder="First name is enough"
          isDisabled={isAnonymous}
          disabledMessage={'Uncheck "Keep me anonymous" to add a name.'}
          isOptional
        />
        <CheckboxInput label="Keep me anonymous" value={isAnonymous} onChange={setIsAnonymous} />
      </VStack>

      <CityTypeahead value={city} onChange={setCity} />

      {city && (
        <HStack gap={3} wrap="wrap">
          <TextInput label="State" value={city.state ?? "—"} onChange={() => {}} isDisabled />
          <TextInput label="Country" value={city.country} onChange={() => {}} isDisabled />
        </HStack>
      )}

      <TextArea
        label="Message"
        value={message}
        onChange={(value) => setMessage(value.slice(0, MESSAGE_LIMIT))}
        maxLength={MESSAGE_LIMIT}
        rows={3}
        isOptional
        placeholder="Optional — why does this matter to you?"
      />

      <Text type="supporting" color="secondary">
        We never ask for your GPS location, your face, your email, or your
        phone number — just a city, and a name if you want to share one.
      </Text>

      {error && (
        <Text type="body" color="accent">
          {error}
        </Text>
      )}

      <Button
        label="Count Me In"
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        isDisabled={!canSubmit}
        className="support-submit"
      />
    </VStack>
  );
}
