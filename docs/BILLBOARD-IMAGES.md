# Synchronized billboard images

The shared `BillboardProvider` controls the message and image with one slide index. The headline, image and image caption use the same slide record in `src/lib/billboard-slides.ts`. Automatic changes remain random, exclude an immediate repeat and run at 7-second intervals. Manual selection and pause controls use the same state. Both visual transitions use the same duration and easing, and reduced-motion preferences disable automatic rotation and animated transitions.

The first pair is pre-rendered. Later images load in advance at low fetch priority. Selecting a later slide waits for its image's load confirmation, retaining the current pair if that image cannot load. Text and image therefore cannot independently advance because of separate timers. Images remain fixed within the same aspect-ratio card.

## Saved project assets

All five new images were created with the **built-in image_gen tool** and visually inspected. They are illustrative AI-generated scenes, not evidence of actual Hurkify premises, client products or equipment. Generated originals remain in the tool's output directory; project-bound WebP deliverables are saved below.

| Headline | Image | Size |
| --- | --- | --- |
| Better systems. Stronger businesses. | `public/visuals/technology-workspace.webp` (existing) | 81,258 bytes |
| Bold ideas. Practical innovation. | `public/visuals/billboard-innovation.webp` | 94,042 bytes |
| Creative thinking. Useful technology. | `public/visuals/billboard-creative.webp` | 98,562 bytes |
| Imagine more. Build what matters. | `public/visuals/billboard-build.webp` | 91,000 bytes |
| Complex challenges. Clear digital solutions. | `public/visuals/billboard-clarity.webp` | 67,094 bytes |
| Your next idea. Our next challenge. | `public/visuals/billboard-idea.webp` | 95,108 bytes |

## Final generation prompts

### Innovation

Photorealistic editorial photograph for a Nigerian technology company website, landscape 3:2, theme Bold ideas / Practical innovation. A real contemporary prototyping workbench with an unbranded open laptop showing abstract non-readable software blocks, a small white 3D-printed enclosure, simple electronic prototype and neat design sketches with no readable writing. No people. Warm off-white desk, restrained violet accents, soft natural daylight, credible tactile engineering materials, elegant composition, main objects centrally framed for a 5:4 crop. No brand logos, readable text, numerical claims, certificates, watermark, or personal data. Illustrative scene rather than an actual company office.

### Creative design

Photorealistic editorial photograph for a professional technology website, landscape 3:2, theme Creative thinking / Useful technology. A refined UX design studio desk: a large unbranded desktop monitor displaying a beautiful abstract violet and white interface design with non-readable wireframe panels, paper interface sketches, carefully arranged purple and neutral colour swatches, drawing pencil and a tablet stylus. No people. Daylit contemporary workspace, tactile paper textures, realistic screen reflections, off-white and deep plum palette, sophisticated editorial realism. Main objects centred for a 5:4 website crop. Visually distinct from a laptop prototyping bench: focus on a desktop monitor and creative design materials. No readable writing, logos, statistics, personal information or watermark. Illustrative scene, not an actual company office.

### Product building

Photorealistic editorial technology photograph, landscape 3:2, theme Imagine more / Build what matters. Close three-quarter view of an unbranded smartphone standing in a simple desk cradle beside an unbranded tablet on a modern light-wood product-development desk. Their screens show refined violet and white app interface shapes with no legible text or financial figures. A closed notebook, fine pen, small green plant, soft daylight through large windows. No laptop or desktop monitor as the dominant object: this is a distinct mobile product scene. Main subjects centred for a 5:4 crop. Natural realistic materials, credible contemporary Nigerian business workspace atmosphere, sophisticated violet accents. No people, logos, personal data, readable writing, performance claims or watermark. Illustrative scene, not an actual client product.

### Workflow clarity

Photorealistic editorial technology photograph, landscape 3:2, theme Complex challenges / Clear digital solutions. A sophisticated operations planning workspace: a large wall-mounted glass board with clean connected violet geometric flowchart shapes but no readable words, in the foreground an unbranded laptop showing matching simple non-readable workflow blocks. Organised neutral folders and a silver pen on an uncluttered light desk. No people. Soft natural daylight, contemporary professional workspace, realistic glass reflections and tactile materials, restrained violet and off-white palette. Frame the glass board and desk centrally for a 5:4 crop. Distinct scene emphasising interconnected workflows rather than a standard laptop closeup. No readable writing, logos, statistics, personal data, certificates or watermark. Illustrative business systems scene, not an actual office.

### New ideas

Photorealistic editorial photograph for a technology consultancy website, landscape 3:2, theme Your next idea / Our next challenge. An inspiring early-stage product planning desk with an open cream notebook containing simple violet geometric concept sketches with no readable words, two neat pencils, an unbranded closed silver laptop, and a tablet angled on the desk showing abstract violet connected shapes. Warm morning light across a contemporary Nigerian office interior with large windows, subtle plant and deep purple fabric chair softly blurred. No people. Focus on the open notebook and planning materials, visibly distinct from a computer-screen-led composition. Premium but credible tactile realism, restrained violet accents and neutral palette. Centre the subjects for a 5:4 crop. No readable writing, company logos, numerical claims, personal data, certificates or watermark. Illustrative scene, not an actual client project.
