---
name: "残颜"
description: "A concise, candid personal hub in pure white, carbon black, neutral grey, and rare amber."
colors:
  background: "#ffffff"
  foreground: "#171717"
  muted-foreground: "#4a4a4a"
  surface: "#ffffff"
  surface-strong: "#f5f5f5"
  border: "#d4d4d4"
  border-strong: "#737373"
  accent: "#a85b00"
  accent-strong: "#854800"
  on-accent: "#ffffff"
  ring: "#171717"
typography:
  display:
    fontFamily: "Onest, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(3.75rem, 8vw, 5.5rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Onest, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)"
    fontWeight: 780
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Onest, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Onest, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Onest, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 650
rounded:
  sm: "6px"
  md: "12px"
  xl: "24px"
  full: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
  "16": "4rem"
  "20": "5rem"
components:
  header-brand:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
  theme-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "44px"
    width: "44px"
  social-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.md}"
    padding: "{spacing.2} {spacing.4}"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "{spacing.5}"
  profile-avatar:
    backgroundColor: "{colors.surface-strong}"
    rounded: "{rounded.xl}"
---

# Design System: 残颜

## Overview

**Creative North Star: "The Compact Personal Index"**

This is a concise personal hub that foregrounds a real identity and real destinations without turning either into a feature presentation. Pure white, carbon black, neutral grey, and rare amber create a quiet index: labels are direct, boundaries are explicit, and the visual system stays out of the way of the owner's candid voice.

The material is deliberately flat. Fine one-pixel borders and tonal hover fills establish hierarchy; there are no decorative shadows, gradient fields, or secondary visual stories. Light and dark themes preserve the same semantic roles while the single profile reveal and direct hover or active responses give the page enough life without continuous ornament.

**Key Characteristics:**
- Pure-white and carbon-black canvases with neutral-grey structure and rare amber cues.
- Onest and Noto Sans SC form one compact, Chinese-readable type system.
- Flat rounded controls and cards use one-pixel borders instead of elevation.
- Theme-aware, reduced-motion-safe feedback is brief and directly tied to interaction.

## Colors

Neutral contrast carries the page; amber identifies the few directional cues that need emphasis. The semantic color variables change together for dark mode, preserving the white/black/grey/amber relationship rather than introducing a second palette.

### Primary
- **Rare Amber:** Used for the profile-role underline, project-card hover border and icon tile, fallback identity mark, selection, and dark-theme focus ring. It is a cue, never a broad surface.
- **Deep Amber:** The light-theme stronger amber is reserved for the accent's interactive state.

### Neutral
- **Paper White:** The light page canvas and crisp resting surface.
- **Carbon Black:** The light primary ink and dark `on-accent` content.
- **Quiet Grey:** Supporting text, structural borders, and tonal interaction surfaces.
- **Dark Canvas:** Dark mode moves the canvas to near-black, primary ink to near-white, controls to charcoal, and the accent to amber.

### Named Rules
**The Rare Amber Rule.** Use amber to mark a destination or immediate interaction state; neutral contrast carries every other hierarchy.

**The Semantic Theme Rule.** Switch the shared semantic roles as a set for dark mode; do not add a separate decorative palette.

## Typography

**Display Font:** Onest (with Noto Sans SC, PingFang SC, Microsoft YaHei, and sans-serif fallbacks)
**Body Font:** Onest (with Noto Sans SC, PingFang SC, Microsoft YaHei, and sans-serif fallbacks)

**Character:** Onest gives names and compact labels a firm contemporary rhythm; Noto Sans SC keeps Chinese copy calm and legible. A single family stack keeps the page compact rather than editorial or ceremonial.

### Hierarchy
- **Display** (850, `clamp(3.75rem, 8vw, 5.5rem)`, 0.95): The owner's name is the sole large type anchor, with tight tracking.
- **Headline** (780, `clamp(1.75rem, 4vw, 2.25rem)`, 1.15): Section heading weight and scale remain compact.
- **Title** (750, 1.125rem, 1.25): Project destination names are strong but not feature-sized.
- **Body** (400, 1rem, 1.65): Default reading copy; the bio and footer quote open to 1.75 line-height.
- **Label** (650, 0.9rem): Compact social links and utility text remain clear at small sizes.

### Named Rules
**The Compact Hierarchy Rule.** Reserve the largest, tightest type for identity; section and project text must support scanning, not compete with it.

## Layout

A centered container uses a maximum width of 1080px and fluid horizontal gutters. The spacing scale follows a quarter-rem rhythm, with 44px as the minimum interactive control dimension. The project directory is a regular three-column grid, reducing to two columns at 860px and one column at 719px; social links become an equal three-column row at the smaller breakpoint. The footer metadata stacks at 640px.

**The Regular Grid Rule.** Repeated destination cards keep equal grid treatment across viewport sizes; do not promote one card into a feature layout.

## Elevation & Depth

The system is flat: no box shadows are used. One-pixel neutral borders, a white or charcoal resting surface, and a slightly stronger tonal fill on hover establish separation. Project cards alone translate upward by 2px on hover and return to rest on active; the theme control uses a small active scale. The profile layout has one 360ms entrance, and the global reduced-motion rule compresses motion to an imperceptible duration.

### Named Rules
**The Flat Feedback Rule.** Depth comes from borders and tonal change; movement is reserved for direct interaction or the one-time profile entrance, never decorative lift.

## Shapes

The form language is softly rectangular, not pill-heavy: small image and icon tiles use 6px corners, controls and cards use 12px corners, and a portrait image can use 24px corners. Borders are consistently one pixel; the fully rounded value is limited to the scrollbar thumb.

## Components

### Navigation
- **Style:** A fixed one-pixel-bordered top bar holds the brand at one side and a 44px theme control at the other.
- **States:** The theme control moves only through a neutral border and tonal-fill hover, then scales to 0.96 while active. The brand uses the supplied avatar or a compact amber initial fallback.

### Social Links
- **Shape:** Each external destination is a 44px-minimum rounded rectangle with icon-plus-label content.
- **Color and state:** Resting links are white or charcoal surfaces with muted text and a neutral border; hover strengthens the border, surface, and text without creating a second accent action.

### Cards / Containers
- **Character:** Project cards are compact, equal destination units rather than feature panels.
- **Shape and surface:** Each has a 12px radius, one-pixel border, minimum 96px height, and compact padding.
- **State:** Hover changes the card border to amber, applies the strong neutral surface, moves the card up 2px, and turns only the outbound icon tile amber; active returns it to rest.

### Avatar
- **Style:** The reusable portrait treatment clips a supplied image inside a 24px rounded image and places that image in a thin, 12px-rounded neutral frame.
- **Fallback:** When no image exists, a simple amber SVG initial provides the identity mark.

### Footer Quote
- **Style:** A muted, open-line-height quote precedes a small metadata row; both are separated with one-pixel rules instead of a distinct story surface.

## Do's and Don'ts

### Do:
- **Do** preserve the white/carbon/neutral-grey/amber semantic relationship in both themes.
- **Do** use one-pixel borders and tonal hover fills before considering a new surface treatment.
- **Do** keep interactive controls at least 44px high and retain the visible 3px focus outline.
- **Do** use the installed Lucide and Simple Icons libraries, or inline SVG, for interface and brand icons.
- **Do** keep motion to the single 360ms profile entrance and direct hover or active feedback, with the existing reduced-motion override intact.

### Don't:
- **Don't** use blue-to-purple gradients.
- **Don't** use emoji or emoticons as interface icons or decoration.
- **Don't** introduce decorative shadows, oversized feature cards, or broad amber surfaces.
- **Don't** turn the regular project grid into an asymmetrical showcase layout.
