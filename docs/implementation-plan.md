# Aitabi UI Implementation Plan

## Goal

Build a React + Tailwind CSS multi-page website that closely reproduces the previously generated Aitabi UI mockups for a Japanese AI-supported solo travel memory service.

The implementation should prioritize:

- Pixel-close visual fidelity to the generated mockups.
- Japanese-first copy and navigation.
- Soft, refined, adult feminine visual tone.
- Reusable page and UI primitives.
- Rich but restrained animation.
- Browser verification through Browser Use.

## Reference Assets

Generated mockups are copied into:

- `public/reference-mocks/`

Image assets generated from the mockup tone are placed in:

- `public/assets/photos/`

Photo files:

- `travel-01.jpg`: hero / inn window scene
- `travel-02.jpg`: seaside onsen
- `travel-03.jpg`: quiet street
- `travel-04.jpg`: breakfast
- `travel-05.jpg`: notebook and camera
- `travel-06.jpg`: cafe / art town scene

## Design Tokens

Colors:

- `ivory`: `#F8F4EF`
- `paper`: `#FFFCF8`
- `rose`: `#C98F8B`
- `sage`: `#A8B8A0`
- `teal`: `#2F6F73`
- `espresso`: `#3A2F2A`
- `sky`: `#EAF1F2`
- `gold`: `#B99A5B`

Typography:

- Serif headings: `Noto Serif JP`, `Yu Mincho`, serif fallback.
- Sans UI/body: `Noto Sans JP`, `Hiragino Sans`, `Yu Gothic`, sans-serif fallback.

UI rules:

- Container width: 1280px max, centered.
- Cards: 8-12px radius, thin warm borders, subtle shadows.
- Buttons: pill for main CTAs, teal fill and rose outline.
- Icons: inline SVG with transparent background.
- Images: warm editorial travel, object-fit cover, soft radius.

## Pages

1. LP: `/`
2. Travel article list: `/stories`
3. Travel article detail: `/stories/atami`
4. Create post: `/create`
5. AI editor: `/editor`
6. My page: `/mypage`
7. Saved stories: `/saved`
8. Theme discovery: `/themes`
9. About / how it works: `/about`
10. Pricing: `/pricing`

## TODO

- [x] Copy generated mockups into the project.
- [x] Generate and split travel image assets from the Aitabi mockup style.
- [ ] Scaffold React + Tailwind CSS app.
- [ ] Implement design tokens and global base styles.
- [ ] Implement shared layout, buttons, cards, icons, tabs, filters, CTA band.
- [ ] Implement LP with hero, value row, cards, steps, chips, closing CTA.
- [ ] Implement story list and story detail pages.
- [ ] Implement create page and AI editor page.
- [ ] Implement my page and saved page.
- [ ] Implement theme discovery, about, and pricing pages.
- [ ] Add route-level and component-level animations.
- [ ] Verify desktop and mobile layouts in Browser Use.
- [ ] Run production build and fix any errors.

## Worker Plan

Worker A: Foundation

- Owns: `package.json`, `index.html`, `tailwind.config.js`, `postcss.config.js`, `src/main.jsx`, `src/styles.css`, `src/data.js`, `src/components/*`.
- Must not edit page files outside shared components.

Worker B: Marketing and discovery pages

- Owns: `src/pages/Home.jsx`, `src/pages/Stories.jsx`, `src/pages/StoryDetail.jsx`, `src/pages/Themes.jsx`.
- Uses shared components and data from Worker A.

Worker C: App workflow pages

- Owns: `src/pages/Create.jsx`, `src/pages/Editor.jsx`, `src/pages/MyPage.jsx`, `src/pages/Saved.jsx`.
- Uses shared components and data from Worker A.

Worker D: Service pages, animation, QA fixes

- Owns: `src/pages/About.jsx`, `src/pages/Pricing.jsx`, `src/App.jsx`, animation utility classes, responsive refinements.
- Runs Browser Use checks after integration.

## Acceptance Criteria

- The LP visually matches the generated LP mockup in section order, color, layout rhythm, and copy.
- Each generated mock page has a corresponding route with matching structure and tone.
- All visible copy is Japanese except the brand name and plan labels.
- Photos are loaded from `public/assets/photos/`.
- Icons are transparent inline SVGs or CSS-only transparent primitives.
- Header navigation works across all pages.
- Desktop width around 1440px looks close to the mockups.
- Mobile width is usable without text overlap.
- Animations are subtle and do not obscure content.
- `npm.cmd run build` succeeds.
- Browser Use screenshots show no blank page, no severe overflow, and no obvious broken asset.
