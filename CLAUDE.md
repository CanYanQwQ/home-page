# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rule overrides

The rules in **UI Constraints** and **Behavioral Guidelines** are defaults. They may be overridden for a specific task only when the user explicitly requests the exception. An exception applies only to that task and does not permanently change these defaults.

## UI Constraints

- Never use blue-to-purple gradients.
- Do not use emoji or emoticons as UI icons or decoration.
- Use the project's icon libraries first. If no suitable library icon exists, use an SVG or another vector graphic.

## Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them—don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it—don't delete it.

When your changes create orphans:
- Remove imports, variables, and functions that your changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass."
- "Fix the bug" → "Write a test that reproduces it, then make it pass."
- "Refactor X" → "Ensure tests pass before and after."

For multi-step tasks, state a brief plan:

```text
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

These guidelines are working if there are fewer unnecessary changes in diffs, fewer rewrites caused by overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Commands

```bash
npm ci              # install the locked dependencies
npm run dev         # start the Vite development server
npm run build       # create the production site in dist/
npm run preview     # serve dist/ locally after a build
```

There are currently no lint or test scripts, no test framework, and therefore no single-test command. `npm run build` is the available automated validation step.

## Architecture

This is a static Vue 3 single-page personal homepage built with Vite. It has no router, backend, state library, or TypeScript. `src/main.js` mounts the root `src/App.vue`, which composes the page sections and owns browser behavior such as theme persistence, mobile sizing, and intersection-based entrance animations. Reusable UI is implemented as Vue SFCs in `src/components/`; component styles are scoped.

`src/config.js` is the central content source for the person's profile, links, projects, avatar, and SEO values. It is consumed in two different environments:

- At runtime, `src/App.vue` renders page content from `siteConfig`.
- At dev/build time, the custom `seo-inject` plugin in `vite.config.js` dynamically imports the same config and replaces the placeholder metadata in `index.html` with title, canonical, Open Graph, Twitter, and JSON-LD tags.

Keep `src/config.js` browser-safe and Node-ESM-importable: it is bundled for the browser and also evaluated directly by Node during dev/build, so top-level DOM access, browser globals, or browser-only dependencies can break the Vite config.

Because SEO is injected by Vite, do not manually maintain those generated tags in `index.html`. `public/robots.txt` and `public/sitemap.xml` are copied as static files and are not generated from `siteConfig`; keep their URLs synchronized with `siteConfig.siteUrl`, and update the sitemap's manually maintained `lastmod` after material homepage changes.

The production site is client-rendered only; there is no SSR or prerendering. Vite injects metadata into the HTML, but visible profile, project, and link content is mounted by Vue into an initially empty `#app`. Account for this distinction when evaluating crawler behavior or SEO changes.

`src/style.css` contains the global reset, responsive utilities, animation keyframes, and the CSS custom-property design system. Light/dark palettes are selected with `[data-theme]`; the inline script in `index.html` sets the initial theme before Vue loads to prevent a flash, while `App.vue` handles subsequent toggling and persistence in `localStorage`.

Vite uses `base: './'`, which makes Vite-managed entry and bundle URLs relative in `dist/`. Files in `public/` are copied unchanged, and current config paths such as `/avatar.jpg` remain origin-root-relative because Vite does not rewrite runtime strings. They work when deployed at the origin root, but require base-aware paths for subpath or `file://` hosting. The SEO plugin separately converts image paths to absolute URLs using `siteConfig.siteUrl`.

## Content and UI details

- Navigation items are currently defined in `src/App.vue`, not `src/config.js`.
- Icons are resolved by name in `src/components/AppIcon.vue`: Lucide supplies interface icons and Simple Icons supplies brand icons. A new icon name in configuration must also be added to the appropriate map there.
- `src/components/SocialLinks.vue` is currently unused; the active contact-link markup lives directly in `src/App.vue`.
