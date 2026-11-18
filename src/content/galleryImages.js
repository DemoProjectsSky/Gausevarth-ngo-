/* ==========================================================================
   GALLERY PHOTOS - controls the whole site gallery.
   1. Put the photo in public/images/ (run `npm run images` to make WebP copies)
   2. Add one line below. shape: portrait | square | landscape | tall
      The photo is cropped to fit its frame automatically.
   Photos whose file is missing stay hidden on the live site.
   Photos at the top are shown first (the About page uses the first six).
   ========================================================================== */
export const galleryImages = [
  { src: '/images/gausevarth-gallery11.webp', shape: 'landscape', w: 1225, h: 919, alt: 'Two white ambulance vehicles parked under a shed', srcSet: '/images/gausevarth-gallery11-640.webp 640w, /images/gausevarth-gallery11.webp 1225w' },
  { src: '/images/gausevarth-gallery18.webp', shape: 'landscape', w: 1200, h: 900, alt: 'Cows resting and standing in a covered shelter', srcSet: '/images/gausevarth-gallery18-640.webp 640w, /images/gausevarth-gallery18.webp 1200w' },
  { src: '/images/gausevarth-gallery17.webp', shape: 'landscape', w: 1024, h: 683, alt: 'A white cow drinking water from a trough', srcSet: '/images/gausevarth-gallery17-640.webp 640w, /images/gausevarth-gallery17.webp 1024w' },
  { src: '/images/gausevarth-gallery16.webp', shape: 'portrait', w: 960, h: 1280, alt: 'A hand offering dry fodder to a cow at a feeding trough', srcSet: '/images/gausevarth-gallery16-640.webp 640w, /images/gausevarth-gallery16.webp 960w' },
  { src: '/images/gausevarth-gallery21.webp', shape: 'tall', w: 517, h: 919, alt: 'A black and white cow resting, with a yellow ear tag' },
  { src: '/images/gausevarth-gallery22.webp', shape: 'square', w: 640, h: 640, alt: 'A brown cow standing in a green field' },
  { src: '/images/gausevarth-gallery24.webp', shape: 'tall', w: 720, h: 1280, alt: 'A row of cows eating green fodder at a feeding trough', srcSet: '/images/gausevarth-gallery24-640.webp 640w, /images/gausevarth-gallery24.webp 720w' },
  { src: '/images/gausevarth-gallery30.webp', shape: 'portrait', w: 736, h: 981, alt: 'A cow with her calf inside a shed', srcSet: '/images/gausevarth-gallery30-640.webp 640w, /images/gausevarth-gallery30.webp 736w' },
  { src: '/images/gausevarth-gallery31.webp', shape: 'tall', w: 736, h: 1104, alt: 'A row of brown cows eating dry fodder', srcSet: '/images/gausevarth-gallery31-640.webp 640w, /images/gausevarth-gallery31.webp 736w' },
  { src: '/images/gausevarth-gallery32.webp', shape: 'landscape', w: 735, h: 490, alt: 'Cows resting on straw in a covered shelter', srcSet: '/images/gausevarth-gallery32-640.webp 640w, /images/gausevarth-gallery32.webp 735w' },
  { src: '/images/gausevarth-gallery33.webp', shape: 'tall', w: 736, h: 1104, alt: 'Two cows standing under a shaded shelter', srcSet: '/images/gausevarth-gallery33-640.webp 640w, /images/gausevarth-gallery33.webp 736w' },
  { src: '/images/gausevarth-gallery14.webp', shape: 'portrait', w: 689, h: 919, alt: 'A cow resting beside her calf near a stone wall' },
  { src: '/images/gausevarth-gallery13.webp', shape: 'portrait', w: 689, h: 919, alt: 'A brown cow lying in the back of a rescue vehicle' },
  // SENSITIVE: shows an injured cow. Uncomment only if you want to show it publicly.
  // { src: '/images/gausevarth-gallery10.webp', shape: 'portrait', w: 689, h: 919, alt: 'A brown cow resting on sandy ground' },
  // SENSITIVE: shows an injured cow. Uncomment only if you want to show it publicly.
  // { src: '/images/gausevarth-gallery8.webp', shape: 'landscape', w: 1280, h: 720, alt: 'A thin brown cow standing on dry ground', srcSet: '/images/gausevarth-gallery8-640.webp 640w, /images/gausevarth-gallery8.webp 1280w' },
  { src: '/images/gausevarth-gallery20.webp', shape: 'portrait', w: 689, h: 919, alt: 'A cow standing in a pond of water' },
  { src: '/images/gausevarth-gallery19.webp', shape: 'landscape', w: 1280, h: 853, alt: 'Cows eating fresh green fodder in a covered shed', srcSet: '/images/gausevarth-gallery19-640.webp 640w, /images/gausevarth-gallery19.webp 1280w' },
  { src: '/images/gausevarth-gallery25.webp', shape: 'landscape', w: 1280, h: 720, alt: 'A cow and her calf standing on a grassy field', srcSet: '/images/gausevarth-gallery25-640.webp 640w, /images/gausevarth-gallery25.webp 1280w' },
  { src: '/images/gausevarth-gallery26.webp', shape: 'landscape', w: 1280, h: 720, alt: 'A cow resting beside her calf near a stone wall', srcSet: '/images/gausevarth-gallery26-640.webp 640w, /images/gausevarth-gallery26.webp 1280w' },
  { src: '/images/gausevarth-gallery27.webp', shape: 'landscape', w: 1280, h: 720, alt: 'A cow with a bell resting in front of a village house', srcSet: '/images/gausevarth-gallery27-640.webp 640w, /images/gausevarth-gallery27.webp 1280w' },
  { src: '/images/gausevarth-gallery28.webp', shape: 'landscape', w: 1280, h: 720, alt: 'A black and white cow resting on sandy ground', srcSet: '/images/gausevarth-gallery28-640.webp 640w, /images/gausevarth-gallery28.webp 1280w' },
  { src: '/images/gausevarth-gallery29.webp', shape: 'landscape', w: 1280, h: 714, alt: 'Cows drinking from a water trough in a village', srcSet: '/images/gausevarth-gallery29-640.webp 640w, /images/gausevarth-gallery29.webp 1280w' },
  // CONSENT: shows identifiable people. Uncomment only after they have agreed.
  // { src: '/images/gausevarth-gallery9.webp', shape: 'landscape', w: 1280, h: 720, alt: 'Two team members standing beside a rescue vehicle', srcSet: '/images/gausevarth-gallery9-640.webp 640w, /images/gausevarth-gallery9.webp 1280w' },
  // CONSENT: shows identifiable people. Uncomment only after they have agreed.
  // { src: '/images/gausevarth-gallery12.webp', shape: 'portrait', w: 697, h: 919, alt: 'Two men attending to a cow in the back of a rescue vehicle' },
  // CONSENT: shows identifiable people. Uncomment only after they have agreed.
  // { src: '/images/gausevarth-gallery15.webp', shape: 'tall', w: 517, h: 919, alt: 'Team members helping a cow on a pickup truck' },
]

export const SHAPE_RATIO = { portrait: 4 / 5, square: 1, landscape: 4 / 3, tall: 2 / 3 }
