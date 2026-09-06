# Visual refinement — 2026-09-06

The first visual-storytelling pass was rejected for looking generic and low quality.

## Diagnosis and plan

- Hero: replace the rectangular flowchart with an original layered reframing illustration. Keep the thesis and its explanation dominant. Geometry represents a working model, not measured data.
- Cases: use distinct visual grammars: an evidence index, an iteration track, and a frontstage/backstage cutaway. Remove cartoon people, robots, and magnifying glasses.
- Toolbox: replace oversized observation glyphs and repetitive arrows with compact brand icons and typographic tool assemblies.
- Ideas: replace Unicode symbols and the central box with a four-part subject index using the same icon family.
- Historical presentation: retain the original, with a quieter archival frame and source link.

## References inspected

- Pinned personal asset library `acea2b2d43b6bf9fe2f1ab745a076b6b3bd11df7`: personal icons (32px), lab Sankey and traceability structures, atlas charts. Synthetic library data is not imported as personal evidence.
- https://linear.app/ — inspected live screenshot of three isometric product illustrations; reference for layering, edges, and restrained contrast, not reused artwork.
- https://vercel.com/fluid — inspected live page and screenshot; reference for simple technical explanations and spacing.

## Implementation constraints

Existing Astro components, local SVG/CSS, no new runtime or visualization dependency. Bilingual, light/dark, responsive. Preserve keyboard tabs and no-JavaScript fallback. Use source-backed case numbers only. Review rendered desktop and mobile screenshots; run repository verification and both browser audits.

## Result and checks

- Implemented the four visual families above with eight pinned personal-library icons, recorded in `public/assets/brand/provenance.json`. SVG geometry is original; no library demonstration data or external artwork was copied.
- Refined archived slide framing without changing its image or source.
- Local code review: fixed SVG IDs are confined to the single hero/essay illustration; repeated case diagrams receive unique IDs. Icon names are a closed union. No external runtime requests, new dependencies, or interaction changes.
- Initial browser screenshots exposed stale component CSS in the long-running Astro development process. Restarting the background server resolved it; subsequent screenshots show the new styles. This was invisible to the passing build/interaction checks, so rendered screenshots were reviewed separately.
- Increased diagram labels after reviewing mobile screenshots. Key interpretations also remain in normal HTML text and SVG descriptions.

Final verification: `npm run verify` passed (lint, 51-file Astro check with zero diagnostics, 4 tests, 56 built pages). Browser audit passed: 54 HTML routes, one PDF, 20 accessibility targets with zero violations, zero browser errors, and no horizontal overflow across 54 routes at 320px. Visual audit passed all four bilingual desktop/mobile scenarios, keyboard navigation, unique IDs, source preview, and all-panel no-script fallback. Reviewed final hero, cases, toolbox, topics, and additional English mobile evidence/iteration screenshots under `artifacts/visual-refresh/`.
