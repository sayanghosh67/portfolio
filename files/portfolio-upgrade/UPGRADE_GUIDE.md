# Portfolio → "Ultra Pro Max" Upgrade Pack

Reviewed your live site + `full-code-export.txt`. Good news: your stack (React 19,
Vite, Tailwind v4, React Three Fiber, GSAP, Lenis) is already the right toolkit for
a "4D" feel — you just weren't using most of its power yet. **Zero new npm
installs needed** — everything below uses packages already in your `package.json`.

## What "4D" actually means here
Not a literal 4th spatial dimension — it's the *illusion* of depth + time:
1. **Parallax depth** — foreground/background layers move at different speeds relative
   to mouse/scroll, so flat text feels like it's floating above a 3D scene.
2. **Scroll-linked 3D** — your Three.js object now reacts to scroll position (morphs,
   pushes back in Z, spins) instead of just idling.
3. **Micro-time cues** — grain, glitch-on-hover, magnetic cursor, staggered character
   reveals. These read as "premium" because motion is choreographed, not generic.

## Files in this pack

| File | Action |
|---|---|
| `src/lib/scrollState.js` | **New.** Shared scroll/mouse state, no React re-renders. |
| `src/components/Preloader.jsx` | **New.** Curtain-wipe intro with % counter. |
| `src/components/Grain.jsx` | **New.** Cinematic film-grain + vignette overlay. |
| `src/components/ScrollProgress.jsx` | **New.** Top progress bar + live %. |
| `src/components/Cursor.jsx` | **Replace.** Adds magnetic hover + contextual labels. |
| `src/components/ThreeCanvas.jsx` | **Replace.** Morphing distort shape + particle field, scroll/pointer-linked. |
| `src/components/Hero.jsx` | **Replace.** Per-character reveal, parallax layers, glitch-on-hover title. |
| `src/App.jsx` | **Replace.** Wires all the above together + feeds Lenis into `scrollState`. |
| `src/index.additions.css` | **Append** the contents to the bottom of your existing `src/index.css`. |

## Integration steps
1. Copy each file into the matching path in your repo (same names, so it's a
   straight overwrite for the "Replace" ones).
2. Append `src/index.additions.css` into `src/index.css` (don't replace the whole file
   — you're keeping your existing `@theme`, selection, and `.clip-paper` styles).
3. Add `data-hover="..."` attributes to any element you want the magnetic cursor to
   snap to and label (already added to the nav logo and hero title — extend it to your
   project cards, social icons, and the "view more" sticker for full effect).
4. Run `npm run dev` and check the console — nothing here needs new packages, but if
   you're on an older `@react-three/drei` version double check `MeshDistortMaterial`
   is exported (it's been there since drei v9+).
5. Deploy as usual (`npm run build` → GitHub Pages).

## Quick wins if you want to go further (not included, to keep this pack scoped)
- **Project modal**: click a project card → GSAP FLIP-animate the image into a
  full-screen detail view instead of navigating away.
- **Shader image distortion on hover**: replace the flat `<img>` hover in
  `Projects.jsx`/`Showcase.jsx` with a single shared R3F canvas using a displacement
  shader (ripple/liquid effect on mouseover) — heavier, but a real showstopper.
- **Dark/light toggle**: your `About` section is already white-on-black inverted —
  a full theme toggle would fit the editorial aesthetic well.
- **Real contact form**: wire `Contact.jsx` to Formspree/Resend instead of a mailto link.
- **Lighthouse pass**: the Three.js canvas is the main perf cost — consider
  `React.lazy` + `Suspense` around `<ThreeCanvas />` so it doesn't block first paint,
  and drop `dpr` to `[1, 1.5]` on mobile.

## Prompts you can hand to an AI coding assistant (e.g. Claude Code) for the next round

**Project detail modal:**
> "In my Projects.jsx, when a project card is clicked, open a full-screen modal
> using GSAP Flip to animate the clicked image from its grid position into a large
> hero image, with the description sliding in beside it. Close on click-outside or Esc."

**Shader-based image hover distortion:**
> "Add a WebGL displacement/ripple effect to the project images on hover using
> react-three-fiber and a custom ShaderMaterial with a noise-based displacement map,
> replacing the current CSS grayscale-to-color hover in Projects.jsx and Showcase.jsx."

**Performance pass:**
> "Audit my React Three Fiber portfolio for performance: lazy-load the Three.js
> canvas below the fold, cap devicePixelRatio on mobile, and make sure GSAP
   ScrollTriggers are killed/refreshed correctly on resize."

**Theme toggle:**
> "Add a light/dark mode toggle to my portfolio's Navbar that flips the red/black
> palette to a red/white palette, persisted in localStorage, animated with a
> circular clip-path wipe from the toggle button."

---
All files below are ready to drop in as-is.
