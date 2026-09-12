# Youness Herraka Portfolio

Production-ready one-page portfolio for Youness HERRAKA, built with React, TypeScript, Vite, and structured CSS.

## Features

- Responsive editorial portfolio layout
- English/French language switch with a shared translation object
- Real portrait asset from `page_youness.jpeg`, optimized to WebP
- Real CV download copied from the workspace
- Featured infrastructure projects and a smaller programming project
- Smooth anchor scrolling, reveal animations, hover transitions, and reduced-motion support
- A 3.6-second opening with animated IT servers, cloud resources, and a DevOps pipeline in cyan, mint, and amber; plays once per session and can be replayed from the footer
- Semantic sections, visible focus states, external-link security attributes, SEO metadata, Open Graph tags, and a custom YH favicon

## Project Structure

```text
portfolio/
  public/
    assets/
      youness-photo.webp
      youness-photo-original.webp
      youness-photo-source-copy.jpeg
      youness-herraka-cv.pdf
    favicon.svg
    site.webmanifest
  src/
    App.tsx
    data.ts
    hooks.ts
    main.tsx
    styles.css
  tests/
    data.test.ts
```

## Development

```bash
npm install
npm run dev
```

The development server runs at `http://127.0.0.1:5173/` by default.

## Verification

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## Deployment

Build the static production files:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static host such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or an object-storage/CDN workflow.

## Notes

- No fake email address, testimonials, employers, statistics, certifications, or credentials are included.
- External professional links open in a new tab with `rel="noopener noreferrer"`.
- The current environment blocked package downloads, so motion is implemented with React hooks, CSS animations, and IntersectionObserver instead of adding Framer Motion or GSAP. The implementation still respects `prefers-reduced-motion`.
