import { HStack } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { CtaLink } from "@/components/CtaLink";

export function TopBar() {
  return (
    <HStack
      as="header"
      justify="between"
      vAlign="center"
      paddingBlock={3}
      className="top-bar"
    >
      <Text type="large" weight="bold" className="wordmark">
        Democracy Is Dead
      </Text>
      <CtaLink href="/support" variant="primary" size="md">
        Democracy Is Dead
      </CtaLink>
    </HStack>
  );
}
