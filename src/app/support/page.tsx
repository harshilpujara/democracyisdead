"use client";

import { useEffect, useState } from "react";
import { VStack } from "@astryxdesign/core/Stack";
import { Heading } from "@astryxdesign/core/Heading";
import { TopBar } from "@/components/sections/TopBar";
import { Footer } from "@/components/sections/Footer";
import { CornerLabel } from "@/components/texture/CornerLabel";
import { SupportForm } from "@/components/support/SupportForm";
import { SupportConfirmation } from "@/components/support/SupportConfirmation";
import { getLocalSupport, type LocalSupportRecord } from "@/lib/supports/localVote";

export default function SupportPage() {
  const [record, setRecord] = useState<LocalSupportRecord | null | undefined>(undefined);
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    setRecord(getLocalSupport());
  }, []);

  return (
    <>
      <TopBar />
      <main>
        <VStack
          gap={10}
          hAlign="center"
          justify="center"
          minHeight="80dvh"
          className="hero support-hero"
        >
          <CornerLabel corner="top-left">Add Your Voice</CornerLabel>
          <CornerLabel corner="top-right">No GPS &middot; No Faces &middot; No Email</CornerLabel>

          {record === undefined ? null : record ? (
            <SupportConfirmation record={record} isReturning={!justSubmitted} />
          ) : (
            <VStack gap={8} hAlign="center" width="100%" maxWidth={480}>
              <Heading
                level={1}
                type="display-1"
                className="hero-headline inky-edge-hero support-headline"
              >
                Add Your Voice.
              </Heading>
              <SupportForm
                onSubmitted={(next) => {
                  setJustSubmitted(true);
                  setRecord(next);
                }}
              />
            </VStack>
          )}
        </VStack>
      </main>
      <Footer />
    </>
  );
}
