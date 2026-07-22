import type { Metadata } from "next";
import { Providers } from "./providers";
import { NoiseOverlay } from "@/components/texture/NoiseOverlay";
import { GrungeFilterDefs } from "@/components/texture/GrungeFilterDefs";
import { anton, archivo, spaceMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Democracy Is Dead",
  description:
    "You couldn't be at Jantar Mantar. You can still be counted. Add your voice to the movement for a fair education system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${spaceMono.variable}`}>
      <body>
        <Providers>
          <GrungeFilterDefs />
          <NoiseOverlay />
          {children}
        </Providers>
      </body>
    </html>
  );
}
