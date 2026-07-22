import type { ReactNode } from "react";
import { Text } from "@astryxdesign/core/Text";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const cornerClass: Record<Corner, string> = {
  "top-left": "corner-label corner-label--top-left",
  "top-right": "corner-label corner-label--top-right",
  "bottom-left": "corner-label corner-label--bottom-left",
  "bottom-right": "corner-label corner-label--bottom-right",
};

export function CornerLabel({
  corner,
  children,
}: {
  corner: Corner;
  children: ReactNode;
}) {
  return (
    <Text type="code" color="secondary" className={cornerClass[corner]}>
      {children}
    </Text>
  );
}
