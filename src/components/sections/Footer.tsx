import { VStack } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { Divider } from "@astryxdesign/core/Divider";
import { CtaLink } from "@/components/CtaLink";

export function Footer() {
  return (
    <VStack as="footer" gap={6} hAlign="center" className="site-footer">
      <Text type="large" weight="bold" className="wordmark">
        Democracy Is Dead
      </Text>

      <CtaLink href="/support" variant="ghost" size="md">
        Add Your Voice
      </CtaLink>

      <Divider />

      <VStack gap={2} hAlign="center" className="footer-note">
        <Text type="supporting" color="secondary">
          This is an independent, non-partisan citizens&apos; initiative. It
          is not affiliated with any political party or candidate.
        </Text>
        <Text type="supporting" color="secondary">
          No personal data is required to take part.
        </Text>
      </VStack>
    </VStack>
  );
}
