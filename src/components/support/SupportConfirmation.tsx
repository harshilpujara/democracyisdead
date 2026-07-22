import { VStack } from "@astryxdesign/core/Stack";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { CtaLink } from "@/components/CtaLink";
import { SupportGlobe } from "@/components/globe/SupportGlobe";
import type { LocalSupportRecord } from "@/lib/supports/localVote";
import type { PublicSupportRow } from "@/lib/supabase/types";

function formatCoord(value: number, positiveLabel: string, negativeLabel: string) {
  return `${Math.abs(value).toFixed(4)}° ${value >= 0 ? positiveLabel : negativeLabel}`;
}

export function SupportConfirmation({
  record,
  isReturning,
}: {
  record: LocalSupportRecord;
  isReturning: boolean;
}) {
  const dotRow: PublicSupportRow = {
    id: record.id,
    created_at: record.createdAt,
    city: record.city,
    lat: record.lat,
    lng: record.lng,
    message: null,
    display_name: record.displayName,
  };

  return (
    <VStack gap={8} hAlign="center" className="confirmation">
      <VStack gap={2} hAlign="center">
        <Text type="code" color="secondary">
          No. {String(record.supporterNumber).padStart(3, "0")}
        </Text>
        <Heading level={1} type="display-2" className="inky-edge">
          {isReturning ? "You're Already On The Map." : "You're On The Map."}
        </Heading>
      </VStack>

      {record.isFirstInCity && (
        <Text type="code" className="first-in-city-badge">
          First Voice From {record.city}
        </Text>
      )}

      <SupportGlobe supports={[dotRow]} recentlyAddedIds={new Set([dotRow.id])} />

      <VStack gap={1} hAlign="center">
        <Text type="large">
          {record.isAnonymous ? "Anonymous" : record.displayName} &middot; {record.city}
        </Text>
        <Text type="code" color="secondary">
          {formatCoord(record.lat, "N", "S")}, {formatCoord(record.lng, "E", "W")}
        </Text>
      </VStack>

      <VStack gap={3} hAlign="center" className="share-card-placeholder">
        <Text type="code" color="secondary">
          [ Shareable Card &mdash; Coming In Phase 3 ]
        </Text>
        <Button label="Share" variant="secondary" isDisabled tooltip="Coming in phase 3." />
      </VStack>

      <CtaLink href="/" variant="ghost" size="md">
        Back To The Movement
      </CtaLink>
    </VStack>
  );
}
