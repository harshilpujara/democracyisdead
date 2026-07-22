"use client";

import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/Stack";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { useSupports } from "@/lib/supports/useSupports";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import { SupportGlobe } from "@/components/globe/SupportGlobe";

export function GlobeSection() {
  const { supports, totalCount, recentlyAddedIds } = useSupports();
  const animatedCount = useAnimatedNumber(totalCount);

  return (
    <Section variant="section" padding={0} className="globe-section">
      <VStack gap={10} hAlign="center">
        <SupportGlobe supports={supports} recentlyAddedIds={recentlyAddedIds} />

        <Heading level={2} type="display-2" className="globe-counter">
          {animatedCount.toLocaleString()} Voices And Counting
        </Heading>

        <Text type="large" color="secondary" className="globe-copy">
          The map is filling up. Every dot is one person who refused to stay
          silent, from Delhi to the diaspora.
        </Text>
      </VStack>
    </Section>
  );
}
