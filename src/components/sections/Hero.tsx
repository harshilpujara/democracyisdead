import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/Stack";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Icon } from "@astryxdesign/core/Icon";
import { CornerLabel } from "@/components/texture/CornerLabel";
import { CtaLink } from "@/components/CtaLink";

export function Hero() {
  return (
    <Section variant="transparent" padding={0} minHeight="100dvh" className="hero">
      <CornerLabel corner="top-left">Est. 2026</CornerLabel>
      <CornerLabel corner="top-right">Delhi · IN</CornerLabel>
      <CornerLabel corner="bottom-left">No. 001 / Civic-Ed</CornerLabel>

      <VStack
        hAlign="center"
        justify="center"
        gap={8}
        height="100%"
        minHeight="100dvh"
      >
        <Heading level={1} type="display-1" className="hero-headline inky-edge-hero">
          <span className="hero-headline__line">They Said</span>
          <span className="hero-headline__line">We Dont Matter</span>
          <span className="hero-headline__line hero-headline__line--accent">
            Well, Democracy Is Dead.
          </span>
        </Heading>

        <Text type="large" color="secondary" className="hero-subhead">
          You couldn&apos;t be at Jantar Mantar. You can still be counted. Add
          your voice to the movement for a fair education system, and watch
          the map fill with people who refuse to stay silent.
        </Text>

        <CtaLink href="/support" variant="primary" size="lg">
          I Support This
        </CtaLink>

        <VStack gap={2} hAlign="center" className="scroll-cue" aria-hidden="true">
          <Text type="code" color="secondary">
            Scroll
          </Text>
          <Icon icon="arrowDown" color="secondary" />
        </VStack>
      </VStack>
    </Section>
  );
}
