# Collab Vision — Modern Website Redesign

A responsive React + Vite website concept for Collab Vision Infosolution. It takes inspiration from cinematic, immersive design systems while using original layout, copy, CSS art and a custom Three.js hero scene.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Main features

- Responsive fixed navigation and mobile menu
- Scroll-driven Three.js desktop PC scene with pointer parallax, blue lighting, and automatic GLB model loading
- Services selector with dynamic details
- Three original project mockups built in HTML/CSS
- Process, company introduction, tech stack and rotating testimonials
- Contact form validates fields and opens a prefilled email draft to `info@collabvision.in`
- Reduced-motion support and mobile responsive layouts

## Before production

- Confirm the public contact email and social links.
- Connect the contact form to a backend, Google Apps Script, or a form provider if you want submissions delivered without requiring the visitor's email application.
- Replace concept project cards and testimonials with approved case studies and client-approved quotations.
- Add the company's approved logo, privacy policy and analytics if required.
- The 3D scene uses Three.js from npm. A WebGL-capable browser is recommended.


## Add your own 3D PC model

1. Export your model as a `.glb` file (recommended, because it can contain its textures/materials).
2. Put it at `public/models/gaming-pc.glb`. Create the `models` folder if needed.
3. Run `npm install` and `npm run dev`. The scene automatically replaces its built-in blue PC mockup when the GLB loads.

The PC group rotates and shifts as the visitor scrolls through the hero, with subtle pointer parallax. The GLB file itself is not included because you have your own model.

The Sketchfab reference model is listed as CC Attribution, which requires creator credit if you use that exact asset. See the [model page](https://sketchfab.com/3d-models/gaming-desktop-pc-d1d8282c9916438091f11aeb28787b66).


### If the 3D desktop looks too dark
The scene lighting and case/screen materials have been brightened in this build. To use your own model, put `gaming-pc.glb` in `public/models/`.
