# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The homepage serves a broad public audience: first-time visitors, technical peers interested in IT/AI/Agent programming, and existing followers looking for the owner's other platforms.

## Product Purpose

Introduce 残颜 quickly and direct visitors to the real blog, GitHub, Bilibili profile, or email. Success means visitors can understand who the person is and reach the intended destination without friction.

## Positioning

A concise, candid personal hub built around 残颜's light, self-deprecating voice and genuine online presence rather than inflated professional claims.

## Operating Context

Visitors arrive on a public, client-rendered single-page website, often from a shared link, and scan the profile before following an external destination. The site supports both light and dark themes and must remain usable from mobile through desktop widths.

## Capabilities and Constraints

- Static Vue 3 and Vite site with no backend, router, or state library.
- Presents profile information, projects, social/contact links, and a short attribution/deployment quote.
- Existing external destinations must remain functional.
- Do not use blue-to-purple gradients.
- Do not use emoji or emoticons as interface icons or decoration; prefer the installed icon libraries, then SVG/vector artwork when necessary.

## Brand Commitments

- Preserve the name “残颜”.
- Preserve the current relaxed, humorous, self-deprecating voice.
- Preserve the current avatar and favicon assets.
- Preserve the current GitHub, Bilibili, email, and blog destinations.
- Preserve the current quote about the UI reference, Agent-written implementation, and Vercel deployment.
- Use a familiar, mature personal-homepage convention rather than a metaphor-led visual world; Read.cv and Bento.me set the quality bar, without copying their branding or using a blue-to-purple gradient.

## Evidence on Hand

- Profile content and real destinations: `src/config.js`.
- Avatar and favicon assets: `public/avatar.jpg`, `public/favicon-64.png`, and `public/favicon-192.png`.
- Existing Open Graph image: `public/og-image.png`.
- There are no testimonials, client logos, performance claims, or case studies; future work must not fabricate them.

## Product Principles

- Make identity and destination choices understandable at a glance.
- Keep factual personal content intact while giving its presentation a distinctive point of view.
- Prioritize direct, reliable navigation over decorative interaction.
- Let the owner's candid voice remain visible without inventing credentials or claims.

## Accessibility & Inclusion

Preserve semantic landmarks, descriptive labels, keyboard-visible focus, reduced-motion support, sufficient text contrast, and touch-friendly controls across light and dark themes.
