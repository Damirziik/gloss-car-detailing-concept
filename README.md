# Gloss Car Detailing — Unofficial Redesign Concept

Portfolio project: одностраничный коммерческий концепт для реального детейлинг-центра в Алматы. Проект показывает, как можно обновить визуальную подачу бизнеса, не копируя существующий сайт и не добавляя неподтверждённые факты.

> This is an independent portfolio concept. Gloss Car Detailing did not commission or endorse this redesign.

## Stack

- Vite
- Semantic HTML generated from small ES modules
- Modern CSS without UI frameworks
- Vanilla JavaScript
- Playwright for browser QA

## Features

- Responsive sticky navigation and accessible mobile menu
- Data-driven services, packages, contacts and FAQ
- Mouse, touch and keyboard before/after comparison
- Editorial gallery with fullscreen lightbox, swipe, arrows, Escape and preload
- Accessible FAQ accordion
- Client-side booking form validation
- Centralized WhatsApp message generation; no backend and no automatic message sending
- Phone and 2GIS direction links
- Active navigation state, reveal motion and reduced-motion support
- `noindex, nofollow` metadata for the unofficial concept

## Responsive and accessibility

The layout is designed for 320–1920 px viewports. Interactive controls use semantic elements, visible focus states, accessible names and keyboard support. Modal surfaces lock body scroll and close with Escape.

## Performance

The site has no runtime dependencies, lazy-loads non-critical imagery, reserves image aspect ratios and ships a small JavaScript bundle. Images currently come from the real business's public site strictly for this local private preview; see `docs/ASSET_SOURCES.md` before publishing.

## Factual sources

See `docs/SOURCE_NOTES.md` for the verified inventory, source links, and the unresolved address/schedule discrepancy.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test:e2e
```

