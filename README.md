# grain-and-gable-claude

One-page static site for **Grain & Gable Carpentry** — *Custom woodwork, built to last*.
Built by Claude Code.

## Deploying

Plain HTML and CSS with a few lines of inline vanilla JS. No build step, no
dependencies, no framework. Vercel (or any static host) serves it straight from
the repo root — `index.html` is already there, so no project settings are needed.

```
index.html     markup, inline open/closed badge script
styles.css     all styling (mobile-first)
images/        web-optimized photo variants
tools/         image build script (dev only, not needed to deploy)
```

## Images

The five source photos live **outside** this repo and are not committed. The
committed `images/` folder holds resized, compressed derivatives — a 1152px and
a 768px variant of each photo, in both JPEG and WebP, wired up with
`<picture>` + `srcset`/`sizes`.

To regenerate them from the originals:

```sh
python3 tools/build-images.py ../photos
```

## Notes

- Accessibility: semantic landmarks, skip link, descriptive alt text on every
  photo, visible `:focus-visible` rings, all text at WCAG AA contrast or better,
  and `prefers-reduced-motion` respected.
- No contact form by design — the site pushes to a phone call or a text.
- No external requests: no CDNs, no web fonts, no third-party scripts.
