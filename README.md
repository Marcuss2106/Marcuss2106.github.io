# marcuss2106.github.io

Personal portfolio — React 19 + Vite + Tailwind CSS v4, deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Ship

```bash
npm run build    # outputs to dist/
npm run deploy   # builds, then pushes dist/ to the gh-pages branch
```

## Where things live

| Path | What's in it |
| --- | --- |
| `data/content.ts` | Every piece of copy — bio, roles, projects, skills. Edit here first. |
| `components/` | Section components plus shared primitives (`SpotlightCard`, `Reveal`, `Background`). |
| `hooks/useReveal.ts` | Scroll-reveal, active-section, and scroll-position hooks. |
| `index.css` | Tailwind theme tokens, keyframes, and the custom utility layer. |
| `public/` | Project screenshots, the profile photo, and `Marcus_Sostak_Resume.pdf`. |

Anything in `public/` is copied to the site root as-is, so the résumé is served
at `/Marcus_Sostak_Resume.pdf`. Replacing that file is all it takes to publish a
new version.

Adding a project means appending one object to `projects` in `data/content.ts`.
Cards fall back to a mono `snippet` block when there's no `imageUrl`, and
`invertImage: true` flips a light matplotlib figure to read on the dark theme.
