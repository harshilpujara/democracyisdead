import type { Metadata } from "next";
import { VStack } from "@astryxdesign/core/Stack";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Link } from "@astryxdesign/core/Link";
import { TopBar } from "@/components/sections/TopBar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Add Your Voice — Democracy Is Dead",
};

export default function SupportPage() {
  return (
    <>
      <TopBar />
      <main>
        <VStack
          gap={6}
          hAlign="center"
          minHeight="60dvh"
          justify="center"
          className="hero"
        >
          <Heading level={1} type="display-2" className="inky-edge">
            Add Your Voice
          </Heading>
          <Text type="large" color="secondary" className="hero-subhead">
            The sign-up form for this movement is coming soon. Check back
            shortly, or head back and share the map with someone who should
            see it.
          </Text>
          <Link href="/" isStandalone>
            Back to the movement
          </Link>
        </VStack>
      </main>
      <Footer />
    </>
  );
}
