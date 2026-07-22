import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

// Fixed grunge-poster palette. The page never switches light/dark, so both
// tuple slots hold the same value — mode="dark" is set on <Theme> to pin it.
const ink = "#100D0C";
const inkRaised = "#18140F";
const bone = "#EDE6D6";
const boneMuted = "#AEA28A";
const oxblood = "#7A0C1E";
const oxbloodBright = "#A11321";
const borderDim = "rgba(237, 230, 214, 0.18)";

export const movementTheme = defineTheme({
  name: "democracy-is-dead",
  extends: neutralTheme,
  color: {
    accent: oxblood,
    neutralStyle: "warm",
  },
  typography: {
    scale: { base: 16, ratio: 1.2 },
    body: { family: "var(--font-body)", fallbacks: "Arial, Helvetica, sans-serif" },
    heading: { family: "var(--font-heading)", fallbacks: "Arial Narrow, sans-serif" },
    code: { family: "var(--font-mono)", fallbacks: "'Courier New', monospace" },
  },
  radius: { base: 0, multiplier: 0 },
  tokens: {
    "--color-background-body": [ink, ink],
    "--color-background-surface": [inkRaised, inkRaised],
    "--color-background-card": [inkRaised, inkRaised],
    "--color-background-muted": [inkRaised, inkRaised],
    "--color-background-popover": [inkRaised, inkRaised],
    "--color-text-primary": [bone, bone],
    "--color-text-secondary": [boneMuted, boneMuted],
    "--color-accent": [oxblood, oxbloodBright],
    "--color-on-accent": [bone, bone],
    "--color-text-accent": [oxbloodBright, oxbloodBright],
    "--color-icon-primary": [bone, bone],
    "--color-icon-secondary": [boneMuted, boneMuted],
    "--color-icon-accent": [oxbloodBright, oxbloodBright],
    "--color-border": [borderDim, borderDim],
    "--color-border-emphasized": [bone, bone],
    "--color-background-inverted": [bone, bone],
    "--color-on-dark": [bone, bone],
    "--color-on-light": [ink, ink],
  },
  components: {
    button: {
      base: {
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontFamily: "var(--font-mono)",
        fontWeight: "700",
      },
      "variant:primary": {
        backgroundColor: oxblood,
        color: bone,
      },
      "variant:secondary": {
        backgroundColor: "transparent",
        color: bone,
        borderWidth: "1px",
        borderStyle: "solid",
      },
      "variant:ghost": {
        color: bone,
      },
    },
  },
});
