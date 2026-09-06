# Will Yang · Website design contract

This site presents an independent problem-solving practice across behavioral research, human factors and agentic AI. Its central argument is “所有问题都是技术性问题 / Every problem is a technical problem”. Readers should encounter practical relevance and evidence alongside that argument.

## Identity

Preserve Personal V2: cool paper surfaces, mulberry authorship, blue action accents, local IBM Plex Sans and Noto Sans SC, and the existing signature and observation symbols. Canonical tokens and asset provenance are documented in [the visual system](docs/visual-system.md) and implemented in `src/styles/global.css` and `public/assets/brand/`.

Use calm editorial hierarchy, clear rules, generous but purposeful spacing, and diagrams that explain relationships. Do not substitute a generic component-library appearance or use diagram geometry to imply unmeasured quantities.

## Page responsibilities

- **Home:** explain relevance, introduce Will, offer practical entry points, show selected cases and recent writing, and provide contact.
- **Work:** make problem, contribution, outcome, source and limitations easy to compare.
- **Method:** explain how to frame, observe, test and decide; hold the detailed tool inventory.
- **Notes:** make the complete index immediately useful; guided reading is optional.
- **Article:** prioritize prose, readable typography and navigable headings.
- **About:** supply professional context, contribution boundaries, a concise biography and organizer materials.

The site serves enterprise project owners, research peers, AI collaborators, organizational partners, event organizers, returning readers, and international collaborators. Each journey should connect a relevant question with inspectable work and a clear next action.

## Interaction and accessibility

Use native links, buttons and disclosure elements. Enhance progressively: reading, navigation and downloads must work without JavaScript. Copy/search controls explain failure and empty states. Essential controls aim for 44px touch height; metadata and diagram labels must remain readable on a 320px screen.

The mobile bottom navigation must not cover keyboard focus or anchored content. Honor `prefers-reduced-motion` even when component selectors have higher specificity. Hover must not move surrounding layout. Verify light/dark themes and both languages before release.

## Editorial standard

Write the concrete problem and next action first. Distinguish observation from interpretation and personal contribution from collective results. Mark templates, illustrative examples and proposals explicitly. A downloadable sample must never be presented as historical client evidence. Keep both languages equivalent, identify Chinese-only source material, and update editorial dates only when the content changes.
