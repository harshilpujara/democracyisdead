import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Your Voice — Democracy Is Dead",
  description:
    "Add your voice to the movement for a fair education system. No GPS, no faces, no email — just a city.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
