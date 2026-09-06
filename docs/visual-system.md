# Personal visual system integration

Source: [Will Yang × Noldus visual system](https://github.com/yangpenghan/will-noldus-visual-system/tree/acea2b2d43b6bf9fe2f1ab745a076b6b3bd11df7), personal V2 (2026-09-05).

The governing references are `docs/personal-visual-system.md`, `docs/research/2026-09-05-v2-design.md` and `studio/examples/homepage.html` in that repository. This site uses the personal mode. The company logo, company photographs, teaching datasets and private profile are not imported.

## Design mapping

| Role | V2 value | Site token |
| --- | --- | --- |
| Reading surface | #F4F6F8 | `--paper` |
| Structural surface | #E7ECF1 | `--paper-deep` |
| Body copy | #17232E | `--ink` |
| Secondary copy | #536475 | `--ink-soft` |
| Author identity | #433C53 | `--author` |
| Interactive state | #285ACA | `--signal` |
| Selection | #A8CCD6 | `--selection` |

Dark mode is a site adaptation, using the upstream white identity assets. `BrandIdentity.astro` selects the Chinese-led or English-led outlined signature according to the page locale. Semantic icons accompany named steps; no generated research data is presented as actual work. Existing bilingual content, routes, contact links and portrait are retained.

## Assets and fonts

`public/assets/brand/provenance.json` records the exact upstream revision and SHA-256 of the imported assets. `fonts/technical/sources.json`, `derived.json` and the two OFL files retain upstream font attribution. Full source WOFF2 hashes were checked against upstream `derived.json`.

IBM Plex Sans uses `Will Display`; Noto Sans SC uses `Will Text`. After the 2026-09-06 visitor and content optimization, the Chinese subset is 344,076 bytes (about 336 KiB). The unmodified full Chinese font is a fallback (`Will Text Complete`), downloaded only if newly added text needs characters missing from the subset. Both are served locally. Subsetting changes glyph coverage, not the design of the letters.

To refresh the subset after a major content update (requires fontTools with Brotli and `pyftsubset`):

```bash
rg --files src scripts -g '*.astro' -g '*.ts' -g '*.md' -g '*.mjs' | xargs cat > /tmp/will-site-glyphs.txt
pyftsubset public/assets/brand/fonts/technical/NotoSansSC.woff2 --text-file=/tmp/will-site-glyphs.txt --output-file=public/assets/brand/fonts/technical/NotoSansSC-site.woff2 --flavor=woff2 --layout-features='*' --name-IDs='*' --name-legacy --name-languages='*'
npm run og:generate
```

Refresh the subset's bytes and SHA-256 entry in `provenance.json` after regeneration. Regular development and builds need no Python or remote font access.

## Verification

```bash
npm run verify
SITE_URL=http://localhost:4322/yangpenghan/ npm run audit:browser
```

The browser audit crawls all linked internal pages and the talk PDF, checks representative desktop/mobile light/dark pages with axe, validates local font and logo loading, tests the theme toggle and persistence, checks 320px overflow on every crawled page, and verifies content without JavaScript. The homepage must use the small Chinese subset without loading the complete font.

Screenshots and the browser report are stored locally under `artifacts/visual-refresh/` (ignored by Git).

## Visual storytelling extension · 2026-09-06

The site uses native SVG relationship diagrams, three distinct case diagrams, a keyboard-operable reframing explorer, and tool workflow illustrations. The full explorer and toolbox live on the method page; the home page links to them. The essay index uses compact searchable rows, subject links, and optional reading paths. Narrow screens use readable HTML steps for the case diagrams instead of shrinking SVG text. These illustrate existing arguments and cases; their geometry does not encode measured distributions. Observation glyphs come from the same pinned upstream revision and are recorded in `provenance.json`.

A full-page image of slide 20 from the already published 2020 talk appears with bilingual context and a PDF page link. Its original historical presentation style is retained. Asset provenance is in `public/assets/visuals/provenance.json`; the page-by-page decisions are in `visual-storytelling-audit.md`.

Run `npm run audit:visuals` for the new interaction and visual checks, with `SITE_URL` if the server uses a non-default port.

## Visitor and content optimization · 2026-09-06

[DESIGN.md](../DESIGN.md) records the website design contract, seven visitor groups and page responsibilities.

The site keeps the V2 identity while prioritizing contact, readable prose, a complete essay index and inspectable materials. Blank templates are explicitly separate from historical project evidence. Professional biographies and all new templates have Chinese and English versions. Existing page URLs and meaningful home toolbox/explorer anchors remain usable.

Run `npm run audit:optimization` for contact, copy success/failure, search/empty/reset states, narrow-screen reading, reduced motion, legacy anchors, linked explorer panels and no-JavaScript checks. Download integrity is also covered by the browser audit and resource unit tests.
