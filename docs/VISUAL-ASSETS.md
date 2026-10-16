# Motion and visual assets

## Implementation

- Hero: layered photo, floating labels, CSS 3D cube, and cursor-responsive perspective using the existing Framer Motion dependency. Decorative entrance motion settles within five seconds; mouse tilt remains interactive.
- Brand billboard: six editable two-part messages in `src/components/brand-billboard.tsx`, randomised every 7 seconds with no immediate repeat and a slide-up transition. Invisible sizing copies reserve the largest message height; active text shares a lower baseline with balanced wrapping. Only the active message is exposed to assistive technology. Autoplay continues during hover and manual selection; the explicit pause control, an offscreen billboard, a hidden tab, or reduced-motion preferences stop automatic changes. Reduced-motion users get manual selection without autoplay or transitions. Initial HTML includes the original visible H1.
- Healthcare support: server-rendered service content, a larger illustrative visual, aligned cards for registration, renewal, EMR and readiness, direct service actions, and an independent-provider disclosure. The homepage anchor and dedicated HEFAMAA route remain unchanged.
- Navigation: animated underline, gentle lift and CTA arrow movement on hover/focus. Mobile links have a matching focus treatment.
- Services: expanded descriptions, shared desktop row alignment via CSS subgrid (flex fallback), consistent list spacing and CTA placement, and restrained hover/focus accents.
- Footer: masked conic-gradient purple border stroke with a soft halo, pause/resume control, and a static reduced-motion outline. The footer remains visually separate from enquiries.
- Technology section: independently labelled platform and development-stack rows, seamless duplicate visual groups, reverse scrolling, pause/resume control and hover-to-pause. Screen readers receive each brand once. Reduced-motion users see a static wrapping layout and no tilt/autoplay.
- Platforms are labelled tools in use, not partnerships or endorsements. OLITT is the Truehost-connected platform inferred from the user's spelling “Ollit”; change this if the owner meant a different company.
- No extra animation library, WebGL renderer, tracking script or third-party image request is added to the page.
- Visual browser/mobile review remains manual because no browser automation surface is connected.

## Generated imagery

The billboard now pairs all six messages with unique images using a shared slide controller. See [the billboard asset record](BILLBOARD-IMAGES.md) for file paths, message mapping and the five additional final generation prompts.

Created with the **built-in image_gen tool**, not the CLI. Outputs were visually inspected. These are illustrative AI-generated workspace scenes, not photographs of Hurkify premises, employees, products or clients. Captions and alt text identify them as illustrations.

Project-bound files:

- `public/visuals/technology-workspace.webp` — 1200 × 800, 81,258 bytes.
- `public/visuals/healthcare-workspace.webp` — 1200 × 800, 62,770 bytes.
- Full-resolution source copies: `public/visuals/technology-workspace.png` and `public/visuals/healthcare-workspace.png`.

### Technology workspace — final prompt

Use case: photorealistic-natural. Asset type: professional technology company website hero, landscape 3:2. Create a polished editorial photograph of a contemporary Nigerian technology workspace, no people. Close three-quarter view of an open premium unbranded laptop on a warm off-white desk, angled naturally, screen showing a tasteful dark abstract software interface with blocks and subtle purple charts but absolutely no readable text, no company logos, no numerical performance claims. Beside laptop a matte violet sculptural glass-like geometric loop, notebook and desk lamp, architectural windows, soft daylight, realistic reflections, tactile materials, restrained violet and deep plum accents. Composition: main laptop occupies centre-right and lower centre, ample breathing room, clean well-lit real space, shallow depth of field, editorial camera realism, premium professional mood. No lettering, no watermark, no external brands, no people or government seals. Intended as illustrative website photography, not proof of an actual office.

### Healthcare workspace — final prompt

Use case: photorealistic-natural. Asset type: website healthcare technology supporting image, landscape 3:2. A professional editorial photograph of an orderly contemporary healthcare administration desk in a Nigerian clinic, no people. Foreground a tidy stack of neutral paper folders with blank tabs, unbranded tablet showing an abstract non-readable calendar made of purple and gray blocks, silver pen, and small green plant. Background softly blurred clean clinic corridor and reception desk, warm daylight, white walls with subtle violet design accent, credible modest modern facility rather than extravagant hospital. Realistic textures and natural light. Balanced composition suitable for a wide website image. No readable writing, patient records, personal information, logos, uniforms, government symbols, certificates, brands, watermark. This is illustrative photography, not an actual Hurkify customer facility.

## Logo sources

Logos retain their original colours and proportions; assets are stored under `public/logos/` and are not combined into endorsement badges. Business use of each platform was confirmed by the owner. These sources do not prove an official partnership.

- OLITT: https://olitt.com/wp-content/uploads/2025/08/Olitt-logo-website-builder.webp
- OLITT / Truehost connection: https://help.olitt.com/docs/how-to-login-to-olitt-through-truehost-client-area/
- Truehost: https://truehost.com.ng/wp-content/uploads/2021/09/logo.png
- Google: https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png
- Formspree: https://formspree.io/img/formspree-new.svg
- Next.js, React, TypeScript, Tailwind CSS and Node.js icon artwork: https://github.com/devicons/devicon (brand-specific original SVG files).
- Download script: `scripts/fetch-brand-assets.mjs`. Source sites can change their assets; verify any replacements before rerunning.
- Trademark guidance: https://about.google/brand-resource-center/guidance/ and https://www.typescriptlang.org/branding/.
