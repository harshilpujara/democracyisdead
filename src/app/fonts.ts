import { Anton, Archivo, Space_Mono } from "next/font/google";

// Anton drives every heading in the theme (--font-heading) — a tall, inky
// condensed grotesque built for protest-flyer scale headlines.
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

// Archivo carries body copy (--font-body): a grotesque built to sit quietly
// under Anton without competing with it.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Space Mono is the catalog/stencil voice: corner labels, eyebrows, button
// caps (--font-mono).
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});
