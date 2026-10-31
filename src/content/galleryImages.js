/* ==========================================================================
   GALLERY PHOTOS  -  yahan se poori site ki gallery control hoti hai
   --------------------------------------------------------------------------
   1. Apni photo  public/images/  folder mein daalo  (e.g. gallery-09.jpg)
   2. Neeche list mein ek line add karo (ya kisi purani photo ka src badlo)
   3. shape:  'portrait'  = lambi rectangle (3:4)
              'square'    = square (1:1)
              'landscape' = chaudi rectangle (4:3)
              'tall'      = bahut lambi rectangle (2:3)
   Photo kisi bhi size ki ho chalegi, frame ke hisaab se apne aap crop ho jaati hai.
   Jis slot ki file abhi nahi hai, wo live site pe dikhti nahi
   (sirf `npm run dev` mein "Add photo" box dikhta hai).
   ========================================================================== */
export const galleryImages = [
  { src: '/images/gausevarth gallery1.png', shape: 'rectangle',    alt: 'A white cow with a brass bell resting on fresh grass' },
  { src: '/images/gausevarth gallery2.png', shape: 'square',  alt: 'A calf resting in the grass' },
  { src: '/images/gausevarth gallery3.png', shape: 'landscape',  alt: 'A brown cow with a bell resting' },
  { src: '/images/gausevarth gallery4.png', shape: 'tall',       alt: 'A black and white cow looking at the camera' },
  { src: '/images/gausevarth gallery5.png', shape: 'landscape',    alt: 'A clay bowl of milk next to green leaves' },
  { src: '/images/gausevarth gallery6.png', shape: 'portrait',   alt: 'A calf with a white mark on its forehead' },
  { src: '/images/gausevarth gallery7.png', shape: 'landscape',  alt: 'A woven basket of dry fodder on green grass' },
  { src: '/images/gausevarth gallery8.png', shape: 'rectangle',    alt: 'A basket full of fresh green grass' },
  // ---- naye slots: file daalte hi dikhne lagenge ----
  { src: '/images/gausevarth gallery9.png', shape: 'tall',   alt: 'Cow at the gaushala' },
  { src: '/images/gausevarth gallery10.jpg', shape: 'landscape',  alt: 'Cows at the gaushala' },
  { src: '/images/gausevarth gallery11.jpg', shape: 'square',    alt: 'Calf at the gaushala' },
  { src: '/images/gausevarth gallery12.jpg', shape: 'tall',    alt: 'Cow at the gaushala' },
]

export const SHAPE_RATIO = { portrait: 3 / 4, square: 1, landscape: 4 / 3, tall: 2 / 3 }
