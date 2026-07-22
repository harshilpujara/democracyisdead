import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/Stack";
import { Center } from "@astryxdesign/core/Center";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { HalftoneField } from "@/components/texture/HalftoneField";

/**
 * Phase 2: swap the dashed stub box below for the real WebGL globe, and
 * wire VOICE_COUNT up to the live tally. Everything else in this section —
 * copy, layout, the halftone backdrop — stays as-is.
 */
export function GlobeSection() {
  const VOICE_COUNT = 0;

  return (
    <Section variant="section" padding={0} className="globe-section">
      <VStack gap={10} hAlign="center">
        <Center height={360} className="globe-stub">
          <HalftoneField className="globe-stub__halftone" />
          <Text type="code" color="secondary" className="globe-stub__label">
            [ Globe Loads Here ]
          </Text>
        </Center>

        <VStack gap={2} hAlign="center">
          <Heading level={2} type="display-2" className="globe-counter">
            {VOICE_COUNT.toLocaleString()} Voices And Counting
          </Heading>
        </VStack>

        <Text type="large" color="secondary" className="globe-copy">
          The map is filling up. Every dot is one person who refused to stay
          silent, from Delhi to the diaspora.
        </Text>
      </VStack>
    </Section>
  );
}
