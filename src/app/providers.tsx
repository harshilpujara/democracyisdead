"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import { democracyIsDeadTheme } from "@/theme/democracy-is-dead";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LinkProvider component={NextLink}>
      <Theme theme={democracyIsDeadTheme} mode="dark">
        {children}
      </Theme>
    </LinkProvider>
  );
}
