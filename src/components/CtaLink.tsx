import type { ReactNode } from "react";
import { Link } from "@astryxdesign/core/Link";

export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      isStandalone
      className={`cta-link cta-link--${variant} cta-link--${size}`}
    >
      {children}
    </Link>
  );
}
