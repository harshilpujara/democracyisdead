import { Section } from "@astryxdesign/core/Section";
import { VStack } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { MediaTheme } from "@astryxdesign/core/theme";

export function Manifesto() {
  return (
    <Section variant="transparent" padding={0} className="manifesto">
      <MediaTheme mode="light">
        <VStack gap={6} hAlign="center">
          <Text type="large" className="manifesto-line">
            Millions of students. Broken exams. Answers that never come.
          </Text>
          <Text type="large" className="manifesto-line">
            This isn&apos;t about one name or one paper. It&apos;s about
            whether the people who run our future ever have to answer for
            it.
          </Text>
          <Text type="display-3" className="manifesto-line manifesto-line--emphasis">
            We&apos;re not rioting. We&apos;re recording.
          </Text>
          <Text type="large" className="manifesto-line">
            Every voice here is proof that someone was paying attention.
          </Text>
        </VStack>
      </MediaTheme>
    </Section>
  );
}
