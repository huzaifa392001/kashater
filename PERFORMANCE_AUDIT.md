# Kadhaster — Comprehensive Performance Audit

**Audited:** `src/modules/website` (all files read recursively), `vite.config.js`, `index.html`, global CSS (`style.css`, `custom.css`), `public/` directory.
**Date:** 2026-05-21

---

## Section 1 — Performance Optimization

### 1.1 Image / GIF Assets — Oversized and Unoptimized

The total image asset folder (`src/modules/website/assets/image/`) is **111 MB**. This is shipped through Vite's asset pipeline, meaning every imported image is bundled or copied verbatim unless a Vite image plugin is installed (none is). All PNGs are uncompressed originals.

| File | Size | Severity | Problem |
|------|------|----------|---------|
| `src/modules/website/assets/image/our-product-section-bg.png` | 7.39 MB | **Critical** | Background-only decoration PNG |
| `src/modules/website/assets/image/png/hero.png` | 4.85 MB | **Critical** | Apparently unused (not imported in any audited component) |
| `src/modules/website/assets/image/png/whatuget-bg.png` | 3.78 MB | **Critical** | Background decoration |
| `src/modules/website/assets/image/png/whatuget.png` | 3.46 MB | **Critical** | Likely superseded by WWG1-6 cards |
| `src/modules/website/assets/image/png/features-bg.png` | 2.74 MB | **Critical** | Background decoration |
| `src/modules/website/assets/image/jpg/what-we-get-bg.jpg` | 2.25 MB | **High** | Background image |
| `src/modules/website/assets/image/our-features-thumb-img.png` | 1.99 MB | **Critical** | Displayed at no wider than 600 px |
| `src/modules/website/assets/image/child-privacy-data.png` | 1.88 MB | **Critical** | SectionPrivacy accordion image, loaded eagerly |
| `src/modules/website/assets/image/png/hero-6.png` | 1.58 MB | **High** | Hero slide image |
| `src/modules/website/assets/image/png/hero-bg.png` | 1.48 MB | **High** | Hero background |
| `src/modules/website/assets/image/jpg/hero-3-1.png` | 1.49 MB | **High** | Stored under `jpg/` but is a PNG |
| `src/modules/website/assets/image/jpg/hero-1-1.png` | 1.44 MB | **High** | Same issue |
| `src/modules/website/assets/image/png/hero-3.png` | 1.35 MB | **High** | Hero slide |
| `src/modules/website/assets/image/png/hero-4.png` | 1.35 MB | **High** | Hero slide |
| `src/modules/website/assets/image/testimonial-section-bg.png` | 1.70 MB | **High** | Background |
| `src/modules/website/assets/image/view-book-page-bg.png` | 2.55 MB | **Critical** | Used as CSS `background: url()` in 6 page selectors |
| `src/modules/website/assets/image/Nisha-rajakumar.png` | 1.12 MB | **High** | Leader portrait photo |
| `src/modules/website/assets/image/my_story_card_bg.png` | 1.25 MB | **High** | Card background |
| `src/modules/website/assets/image/coming-soon-img1.png` through `img5.png` | 0.80–0.89 MB each (~4.2 MB total) | **High** | Coming-Soon carousel, all loaded at page load |
| `src/modules/website/assets/image/Slide 1.png` through `Slide 16.png` (16 files) | 0.25–0.34 MB each (~4.7 MB total) | **High** | All eagerly imported in `MyCart.jsx` lines 13–28 |

**Fix — Convert to WebP and apply `loading="lazy"`:**

1. Run `cwebp -q 80 input.png -o output.webp` on every PNG/JPG in the asset tree, or install the Vite plugin:

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
    }),
  ],
})
```

2. Move the two MP4 videos that are imported inside the assets folder (`final Kadhaster_video.mp4` at 10.8 MB, `Kadhaster Updated Video.mp4` at 11.1 MB) to a CDN. Reference via URL rather than a bundled import (`import desktopVideo from "..."` in `Landing.jsx` line 4).

**Estimated Lighthouse Impact:** LCP -1.5 s, Total Blocking Time -0.3 s, Performance score +15-25 points.

---

### 1.2 Missing `React.lazy()` / Code Splitting

**File:** `src/routes/WebSite.jsx` — lines 1–30

All 20+ page components are imported synchronously at the top level. The entire website JS bundle is parsed before the first pixel renders.

```js
// CURRENT — every page loaded synchronously at line 9–27
import Landing from "../modules/website/pages/Landing/Landing"
import About from "../modules/website/pages/About/About"
import ViewBook from "../modules/website/pages/ViewBook"
// ... 17 more static imports
```

**Fix:**

```js
// WebSite.jsx — replace static imports with lazy()
import React, { lazy, Suspense } from "react"

const Landing        = lazy(() => import("../modules/website/pages/Landing/Landing"))
const About          = lazy(() => import("../modules/website/pages/About/About"))
const ViewBook       = lazy(() => import("../modules/website/pages/ViewBook"))
const PersonalizeBook = lazy(() => import("../modules/website/pages/PersonalizeBook"))
const MyCart         = lazy(() => import("../modules/website/pages/MyCart"))
const MyOrdersNew    = lazy(() => import("../modules/website/pages/MyOrdersNew"))
const TrackOrderNew  = lazy(() => import("../modules/website/pages/TrackOrderNew"))
const NewTicketDetail = lazy(() => import("../modules/website/pages/NewTicketDetail"))
const AddressPage    = lazy(() => import("../modules/website/pages/AddressPage"))
const OrderPlaced    = lazy(() => import("../modules/website/pages/OrderPlaced"))
const MyProfileNew   = lazy(() => import("../modules/website/pages/MyProfileNew"))
const Faq            = lazy(() => import("../modules/website/pages/Faq/Faq"))
const Terms          = lazy(() => import("../modules/website/pages/Privacy/privacy"))
const Privacy        = lazy(() => import("../modules/website/pages/Terms/terms"))
const Delivery       = lazy(() => import("../modules/website/pages/Delivery/delivery"))
const Refund         = lazy(() => import("../modules/website/pages/Refund/refund"))

// Wrap RootLayout children with Suspense (see Section 2.1)
function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollRestoration />
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}
```

The same fix applies to `src/routes/WebApp.jsx` lines 1–34, which also statically imports every authenticated page.

**Estimated Lighthouse Impact:** FCP -0.5-1.0 s, TTI -0.8 s, Performance score +8-12 points.

---

### 1.3 Missing `React.memo`, `useMemo`, `useCallback`

**File:** `src/modules/website/pages/Landing/Landing.jsx`

**Issue A — `data` object re-created on every render (line 412):**

`data` is a large plain object literal declared inside the component body without `useMemo`. It contains 6 arrays totalling ~50 elements, including JSX nodes (`title` fields in `hero_data`, lines 416–465). Every state update (e.g., `carouselIndex` changing on each slide transition) re-allocates the entire object.

```jsx
// CURRENT — inside Landing(), line 412
const data = {
  hero_data: [
    { img_1: hero_img_1_1, img_2: hero_img_2_2, title: (<h1>...</h1>), ... },
    // ...
  ],
  // ...
};
```

**Fix:**
```jsx
import { useMemo } from "react";

const data = useMemo(() => ({
  hero_data: [
    {
      img_1: hero_img_1_1,
      img_2: hero_img_2_2,
      title: <h1>Personalized <strong>FAMILY</strong> books...</h1>,
      sub_title: <>Unlock Your Story: Upload Name & Photo — That's All!</>,
    },
    // ... other slides
  ],
  howitworks: { /* ... */ },
  // ... rest of data
}), []); // empty deps — data never changes
```

**Issue B — `moreThanBook` array re-created every render (line 763):**

Same pattern; five image+title objects defined in the component body.

**Fix:**
```jsx
const moreThanBook = useMemo(() => [
  { image: Maskgroup1, title: "Healthy Alternative to Screens" },
  { image: Maskgroup2, title: "Family Bonding Experience" },
  { image: Maskgroup3, title: "Creative Gifting Option" },
  { image: Maskgroup4, title: "Self Esteem Booster" },
  { image: Maskgroup5, title: "Gateway to Reading Habits" },
], []);
```

**Issue C — Inline `toggleAccordion` function recreated every render (line 832):**

```jsx
// CURRENT — line 832
const toggleAccordion = (index) => {
  if (index == accordionIndex) {
    setAccordionIndex(null)
  } else {
    setAccordionIndex(index)
  }
};

// FIX
const toggleAccordion = useCallback((index) => {
  setAccordionIndex(prev => (prev === index ? null : index));
}, []);
```

**Issue D — Missing `useEffect` dependency in `embla-auto.jsx` (lines 44–48):**

```jsx
// CURRENT — embla-auto.jsx line 44
useEffect(() => {
  if (currentIndex !== null) {
    setCarouselIndex(currentIndex);
  }
}, [currentIndex]); // setCarouselIndex missing from deps array

// FIX
useEffect(() => {
  if (currentIndex !== null) {
    setCarouselIndex(currentIndex);
  }
}, [currentIndex, setCarouselIndex]);
```

**Estimated Lighthouse Impact:** TBT -50-100 ms, reduced unnecessary re-renders, Performance score +3-5 points.

---

### 1.4 `useEffect` with Missing / Incorrect Dependency Arrays

**File:** `src/modules/website/components/header/header.jsx` — lines 44–48

```jsx
// CURRENT — listApiCAll is not in deps; stale closure risk
useEffect(() => {
  if (isAuth) {
    listApiCAll();
  }
}, [isAuth]);
```

`listApiCAll` is defined inside the component and references `sendRequest` and `dispatch`. Omitting it from deps suppresses an ESLint warning but can cause stale closure bugs.

**Fix:**
```jsx
const listApiCAll = useCallback(() => {
  sendRequest(
    { url: `user/profile/personal-info` },
    (data) => {
      dispatch(authActions.setProfilePicture(data?.data?.profile_picture));
    }
  );
}, [sendRequest, dispatch]);

useEffect(() => {
  if (isAuth) listApiCAll();
}, [isAuth, listApiCAll]);
```

**File:** `src/modules/website/pages/Landing/Landing.jsx` — line 984-996 (scroll listener):

The scroll listener is not passive. See Section 2.3 for the fix.

---

### 1.5 Inline Object / Function Definitions Inside JSX

**File:** `src/modules/website/pages/Landing/Landing.jsx`

**A — Duplicate loading overlays with inline style objects (lines 1047–1072):**

The `loading` spinner is rendered twice with identical inline `style={{...}}` objects (lines 1047 and 1065). Both objects are reallocated on every render.

```jsx
// CURRENT — two identical loading sections
{loading && (
  <section style={{ width: "100%", display: "grid", placeItems: "center",
    height: "100%", position: "fixed", zIndex: "1400", top: "0", left: "0",
    backgroundColor: "rgba(0,0,0,0.8)" }}>
    <CircularProgress color="secondary" size="5rem" />
  </section>
)}
{loading && (   // <-- duplicate at line 1065
  <section style={{ width: "100%", display: "grid", placeItems: "center", ... }}>
    <CircularProgress color="secondary" size="5rem" />
  </section>
)}
```

**Fix — Remove the duplicate, move style to CSS module:**
```css
/* landing.module.css */
.loading_overlay {
  width: 100%; height: 100%;
  display: grid; place-items: center;
  position: fixed; z-index: 1400;
  top: 0; left: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
```
```jsx
{loading && (
  <section className={classes.loading_overlay}>
    <CircularProgress color="secondary" size="5rem" />
  </section>
)}
```

**B — Inline arrow functions on navigation buttons (lines 1396–1400, 2101–2103):**

```jsx
// CURRENT — creates a new function reference on every render
onClick={() => { window.location.href = "/user/try-now"; }}

// FIX — define once with useCallback
const handleTryNow = useCallback(() => {
  navigate("/user/try-now"); // use navigate, not window.location.href
}, [navigate]);
// ...
<section className={classes.button__primary__container} onClick={handleTryNow}>
```

---

### 1.6 Hero Carousel — All Slides Loaded Eagerly

**File:** `src/modules/website/pages/Landing/Landing.jsx` — lines 1378–1393

`EmblaCarouselAuto` renders all 3 hero slides simultaneously. Each slide contains two large PNG images totalling ~1.5 MB per slide (6 images total, ~4.5 MB). All images are fetched immediately on page load regardless of visibility.

```jsx
// CURRENT — all slides load all images eagerly, lines 1378-1393
{data.hero_data.map((item) => (
  <section className={`${classes.slider__row} embla__auto__slide`}>
    <img src={item.img_1} alt="" />
    <img src={item.img_2} alt="" />
  </section>
))}
```

**Fix — First slide eager, remaining slides lazy:**
```jsx
{data.hero_data.map((item, i) => (
  <section key={i} className={`${classes.slider__row} embla__auto__slide`}>
    <img
      src={item.img_1}
      alt={item.alt1 || "Personalized family storybook illustration"}
      loading={i === 0 ? "eager" : "lazy"}
      fetchPriority={i === 0 ? "high" : "auto"}
      width={800}
      height={600}
      draggable={false}
      onContextMenu={(e) =>
        import.meta.env.VITE_IMG_METHOD === 'dev' ? undefined : e.preventDefault()
      }
    />
    <img
      src={item.img_2}
      alt={item.alt2 || ""}
      loading={i === 0 ? "eager" : "lazy"}
      width={800}
      height={600}
      draggable={false}
      onContextMenu={(e) =>
        import.meta.env.VITE_IMG_METHOD === 'dev' ? undefined : e.preventDefault()
      }
    />
  </section>
))}
```

**Estimated Lighthouse Impact:** LCP -0.5-0.8 s, Performance score +5-10 points.

---

### 1.7 Large Third-Party Imports

**File:** `src/App.jsx` — lines 6–14

```js
import "bootstrap/dist/css/bootstrap.min.css";      // ~22 KB gzipped
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ~38 KB gzipped, includes Popper
import "sweetalert2/dist/sweetalert2.min.css";      // ~10 KB gzipped
import "slick-carousel/slick/slick.css";            // loaded globally
import "slick-carousel/slick/slick-theme.css";      // loaded globally
```

**Issues:**
- **Bootstrap JS bundle** is imported globally; the app uses only `Modal` from `react-bootstrap`. The bundle includes 12+ components plus Popper unnecessarily.
- **`react-slick` + `slick-carousel`**: Used only in `Landing.jsx` for two sliders. It is not tree-shakeable and should be loaded only when the landing page mounts.
- **`fabric`** (`package.json` line 42): A 300+ KB canvas library listed as a runtime dependency. If only used in admin paths it must not end up in the website bundle. Verify and guard with a dynamic import inside admin-only code paths.

**Fix — Remove Bootstrap JS bundle; scope slick CSS to Landing:**
```js
// App.jsx — remove these lines:
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // DELETE
// import "slick-carousel/slick/slick.css";            // DELETE
// import "slick-carousel/slick/slick-theme.css";      // DELETE

// Landing.jsx — add local imports so slick CSS is code-split with the lazy chunk
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
```

**Estimated Lighthouse Impact:** JS payload -60-80 KB gzipped, TTI -0.3 s.

---

## Section 2 — Navigation & Scroll Smoothness

### 2.1 Route Transitions — No `Suspense` Boundaries

**File:** `src/routes/WebSite.jsx` — `RootLayout` component

No `<Suspense>` boundary wraps `<Outlet>`. Once page components are converted to `React.lazy()` (Section 1.2), every route change will throw a React error at runtime without a Suspense boundary. Even without lazy loading, there is no loading fallback during route transitions.

**Fix:**
```jsx
// WebSite.jsx — RootLayout
import { Suspense } from "react";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollRestoration />
      <Suspense
        fallback={
          <div style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
          }}>
            <div className="spinner" aria-label="Loading page..." />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  )
}
```

**Estimated Lighthouse Impact:** Eliminates blank-screen flash on navigation, reduces perceived CLS.

---

### 2.2 Raw `<a>` Tags Causing Full Page Reloads

Multiple components use bare `<a href="...">` tags and `window.location.href` assignments to navigate within the SPA. Each causes a full browser reload, re-downloading the JS bundle and losing React state.

**File:** `src/modules/website/components/header/header.jsx`
- Line 194: `<a href="/user">Our Products</a>`
- Line 197: `<a href="/user/my_orders">My Orders</a>`
- Line 200: `<a href="/user/try-now">Try Now</a>`
- Line 203: `<a href="/user/forms">Forms</a>`
- Line 207: `<a href="/user/profile_page">Profile</a>` (inside Drawer)
- Lines 259–270: same links repeated in the desktop nav

**File:** `src/modules/website/components/footer/footer.jsx`
- Lines 748–774: `<a href="/about">`, `<a href="/terms-condition">`, `<a href="/privacy-policy">`, `<a href="/faq">`, etc. — all trigger full reloads

**File:** `src/modules/website/pages/Landing/Landing.jsx`
- Line 1398: `window.location.href = "/user/try-now"`
- Line 1767: `window.location.href = "/user/books"`
- Line 1785: `window.location.href = "/user/coming-soon"`
- Line 1798–1804: `<a href="/user">View More Stories</a>`
- Line 2102: `window.location.href = "/user"`

**Fix — Replace with `<Link>` / `useNavigate`:**
```jsx
// header.jsx — replace raw <a> with React Router Link
import { NavLink, Link } from "react-router-dom";

// Before:
<a href="/user">Our Products</a>
// After:
<Link to="/user">Our Products</Link>

// Landing.jsx — replace window.location.href with navigate()
const navigate = useNavigate(); // already imported

// Before (line 1398):
onClick={() => { window.location.href = "/user/try-now"; }}
// After:
onClick={() => navigate("/user/try-now")}
```

For cross-origin links and hash anchors within the same page (e.g., `/#howitworks`), keeping `<a href>` is correct.

**Severity:** High. **Estimated Lighthouse Impact:** Navigation saves 1-3 s per route transition.

---

### 2.3 Scroll Handlers Not Using Passive Event Listeners

**File:** `src/modules/website/pages/Landing/Landing.jsx` — line 993
```jsx
// CURRENT — non-passive, blocks scrolling frame
el.addEventListener("scroll", handleScroll);
return () => el.removeEventListener("scroll", handleScroll);
```

**File:** `src/modules/website/components/header/header.jsx` — line 64
```jsx
// CURRENT — non-passive
window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
```

Without `{ passive: true }`, the browser must wait for each listener to complete before compositing the next scroll frame.

**Fix:**
```jsx
// Landing.jsx line 993
el.addEventListener("scroll", handleScroll, { passive: true });
return () => el.removeEventListener("scroll", handleScroll);

// header.jsx line 64
window.addEventListener("scroll", handleScroll, { passive: true });
return () => window.removeEventListener("scroll", handleScroll);
```

**Severity:** Medium. **Estimated Lighthouse Impact:** Eliminates "Does not use passive listeners" Lighthouse audit failure; scroll jank -50-100 ms.

---

### 2.4 Animations Not Using CSS `transform`/`opacity`

**File:** `src/modules/website/assets/css/style.css` — lines 1972–1982

```css
/* CURRENT — triggers repaint */
.leader-card img:hover {
  transform: scale(1.05);                        /* OK — composited */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);   /* BAD — causes repaint */
}
```

`box-shadow` changes are not GPU-composited and cause layout repaint on every hover-transition frame.

**Fix — Use `filter: drop-shadow` instead (composited on GPU):**
```css
.leader-card img {
  cursor: pointer;
  border-radius: 8px;
  filter: drop-shadow(0 0 0 transparent);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.leader-card img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2));
}
```

**Severity:** Low. **Estimated Lighthouse Impact:** Eliminates repaint jank on hover animations.

---

### 2.5 `scrollTop` Instead of `scrollIntoView`

**File:** `src/modules/website/pages/Landing/Landing.jsx` — lines 196–278

The `handleBackToTop` function is 80 lines of manual `requestAnimationFrame` animation using `window.scrollTo(0, current)` and `el.scrollTop = current`. This duplicates what the browser provides natively.

```jsx
// CURRENT — 80 lines of manual rAF scroll animation (lines 196-278)
function handleBackToTop() {
  // ... finds scrollable containers, calculates easing, drives rAF loop
}
```

The `scrollToSection` function at line 843 correctly uses `element.scrollIntoView({ behavior: 'smooth' })` — the back-to-top just needs the same approach.

**Fix:**
```jsx
// Replace entire handleBackToTop function with:
function handleBackToTop() {
  // Scroll the page window
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Also scroll the inner container if it exists
  const container = scrollRef.current;
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
```

**Severity:** Medium. **Estimated Lighthouse Impact:** Removes ~80 lines of runtime JS; no user-visible difference.

---

### 2.6 Components Causing Layout Shift During Navigation — No Skeleton Loaders

**File:** `src/modules/website/pages/Landing/Landing.jsx` — lines 1738–1779

The "Dive into our stories" section (`apiData.story.map(...)`) renders nothing until the API resolves. No minimum height or skeleton placeholder is set, so the section collapses to zero height and then expands when data arrives, causing CLS.

**File:** `src/modules/website/pages/ViewBook.jsx` — book cover, pricing box, and content all render after `listApiCAll()` resolves with no skeleton.

**Fix — Add min-height and skeleton placeholder:**
```jsx
{/* Landing.jsx — stories list */}
<ul
  className={`${classes.content} ${classes.section__container__space}`}
  style={{ minHeight: '300px' }}
>
  {apiData.story.length === 0
    ? Array.from({ length: 3 }).map((_, i) => (
        <li key={i} aria-hidden="true" className={classes.story_skeleton} />
      ))
    : apiData.story.map((item, i) => (
        <li key={item.id} /* ... */ />
      ))
  }
</ul>
```

```css
/* landing.module.css */
.story_skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 12px;
  min-height: 250px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Severity:** High. **Estimated Lighthouse Impact:** CLS -0.05 to -0.15.

---

### 2.7 Embla Carousel — All Slides Preloaded

**File:** `src/modules/website/components/carousel-autoplay/embla-auto.jsx`

Embla renders all child nodes immediately; no lazy-loading of off-screen slides occurs. The hero carousel and the "Coming Soon" `react-slick` carousel both load all images at page init.

**Fix — Apply `loading="lazy"` per Section 1.6, and for Embla:**
```js
import LazyLoad from 'embla-carousel-lazy-load';

const [emblaRef, emblaApi] = useEmblaCarousel(options, [
  Autoplay({ playOnInit: true, delay: 4500, stopOnInteraction: false }),
  LazyLoad(),
]);
```

---

## Section 3 — Cumulative Layout Shift (CLS) Fixes

### 3.1 Every `<img>` Tag Missing Explicit `width` and `height` Attributes

Every `<img>` element across the audited codebase is missing explicit `width` and `height` HTML attributes. Without these the browser cannot reserve space before the image loads, causing layout shifts (CLS). The following are the most impactful instances:

**File:** `src/modules/website/pages/Landing/Landing.jsx`
- Line 1385: `<img src={item.img_1} alt="" />` — hero carousel LCP image, no dimensions
- Line 1386: `<img src={item.img_2} alt="" />` — paired hero image, no dimensions
- Line 1453: `<img src={kadhaster_img} alt="" />` — story section image
- Line 1473: `<img src={butterfly_png} alt="" />` — how-it-works decoration
- Line 1503: `<img src={step.circleImg} alt="" />` — step icon, inside `.map()`
- Line 1597: `<img src={our_features_thumb_img} alt="" />` — features thumbnail, 1.99 MB
- Line 1607: `<img src={easy_to_use} alt="" />` — features card icon
- Line 1657: `<img src={item?.image} alt="" />` — "More than a Book" cards, inside `.map()`
- Line 1708: `<img src={item.img} alt="" />` — "What You Get" cards
- Line 1750: `<img src={item.book_cover} alt="" />` — API-driven story covers, unknown dimensions
- Line 1999: `<img src={item?.gif_path} alt="" />` — Coming Soon GIF previews

**File:** `src/modules/website/components/footer/footer.jsx`
- Line 694: `<img src={logo_l} className={classes.footer__logo} alt="company logo" />` — no dimensions
- Lines 700–715: social icon `<img>` elements, no dimensions

**File:** `src/modules/website/components/header/header.jsx`
- Line 238: `<img src={logo_s} className={classes.logo__s} alt="company logo" />` — no dimensions
- Line 255: `<img src={down_arrow_icon} alt="" />` — no dimensions
- Line 178: `<img src={close_icon} alt="" />` — no dimensions

**File:** `src/modules/website/pages/Landing/SectionPrivacy/SectionPrivacy.jsx`
- Line 63: `<img src={parent} alt="parent" />` — 1.88 MB image with no dimensions

**Fix — Add `width` and `height` to every `<img>`:**
```jsx
{/* Hero image — Landing.jsx line 1385 */}
<img
  src={item.img_1}
  alt="Personalized family storybook hero illustration"
  width={800}
  height={600}
  loading={i === 0 ? "eager" : "lazy"}
  fetchPriority={i === 0 ? "high" : "auto"}
/>

{/* Features thumbnail — Landing.jsx line 1597 */}
<img
  src={our_features_thumb_img}
  alt="Our features preview"
  width={540}
  height={540}
  loading="lazy"
/>

{/* Privacy section image — SectionPrivacy.jsx line 63 */}
<img
  src={parent}
  alt="Parent and child with data privacy protection"
  width={480}
  height={480}
  loading="lazy"
/>

{/* Logo — header.jsx line 238 */}
<img
  src={logo_s}
  className={classes.logo__s}
  alt="Kadhaster company logo"
  width={120}
  height={40}
/>
```

**Severity:** High (CLS is a Core Web Vital). **Estimated Lighthouse Impact:** CLS -0.05 to -0.25.

---

### 3.2 Font Loading — Missing `font-display: swap` and No WOFF2

**File:** `src/modules/website/assets/css/style.css` — lines 3–26

```css
@font-face {
  font-family: "Quicksand-Light";
  src: url("../modules/website/assets/fonts/Quicksand-Light.ttf") format("truetype");
  /* MISSING: font-display: swap */
}
/* Same issue for Quicksand-Regular, Quicksand-Medium, Quicksand-Semibold, Quicksand-Bold */
```

Without `font-display: swap`, text remains invisible (FOIT) while the custom font loads. TTF is also the heaviest web font format — WOFF2 is 30-40% smaller.

**Fix:**
```css
/* style.css lines 3-26 — replace all five @font-face blocks */
@font-face {
  font-family: "Quicksand-Light";
  src: url("../modules/website/assets/fonts/Quicksand-Light.woff2") format("woff2"),
       url("../modules/website/assets/fonts/Quicksand-Light.ttf") format("truetype");
  font-display: swap;
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Quicksand-Regular";
  src: url("../modules/website/assets/fonts/Quicksand-Regular.woff2") format("woff2"),
       url("../modules/website/assets/fonts/Quicksand-Regular.ttf") format("truetype");
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Quicksand-Medium";
  src: url("../modules/website/assets/fonts/Quicksand-Medium.woff2") format("woff2"),
       url("../modules/website/assets/fonts/Quicksand-Medium.ttf") format("truetype");
  font-display: swap;
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Quicksand-Semibold";
  src: url("../modules/website/assets/fonts/Quicksand-SemiBold.woff2") format("woff2"),
       url("../modules/website/assets/fonts/Quicksand-SemiBold.ttf") format("truetype");
  font-display: swap;
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: "Quicksand-Bold";
  src: url("../modules/website/assets/fonts/Quicksand-Bold.woff2") format("woff2"),
       url("../modules/website/assets/fonts/Quicksand-Bold.ttf") format("truetype");
  font-display: swap;
  font-weight: 700;
  font-style: normal;
}
```

Convert TTF to WOFF2: `npx ttf2woff2 Quicksand-Bold.ttf > Quicksand-Bold.woff2` (repeat for each variant).

**Severity:** High. **Estimated Lighthouse Impact:** CLS -0.05-0.15, LCP -0.2-0.5 s.

---

### 3.3 Background Images as LCP Candidates

**File:** `src/modules/website/assets/css/style.css` — lines 482, 719, 839, 1610, 1714, 2540

`view-book-page-bg.png` (2.55 MB) is used as a CSS `background: url()` on six different page sections:
- `.view-book-page` (line 482)
- `.personalize-section` (line 719)
- `.edit-story-section` (line 839)
- `.address-page` (line 1610)
- `.order-end-page` (line 1714)
- `.my-order-page-section` (line 2540)

CSS background images are discovered late (after CSS parsing), cannot be `fetchPriority="high"`, and cannot have `<link rel="preload">` applied easily. For pages where this background is the first visible element, it delays LCP.

**Fix Option A — Preload the background image in `index.html`:**
```html
<!-- index.html — add inside <head> -->
<link
  rel="preload"
  as="image"
  href="/assets/view-book-page-bg.webp"
  type="image/webp"
/>
```

**Fix Option B — Convert to `<img>` with `fetchPriority="high"` for the most-visited page (ViewBook):**
```jsx
// ViewBook.jsx — wrap page content
<div style={{ position: 'relative', minHeight: '100vh' }}>
  <img
    src={viewBookPageBg}
    alt=""
    aria-hidden="true"
    fetchPriority="high"
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      objectFit: 'cover', zIndex: 0,
    }}
  />
  <div style={{ position: 'relative', zIndex: 1 }}>
    {/* page content */}
  </div>
</div>
```

**Severity:** Medium. **Estimated Lighthouse Impact:** LCP -0.2-0.5 s on inner pages.

---

## Section 4 — JavaScript Bundle

### 4.1 Unused Imports

**File:** `src/modules/website/pages/Landing/Landing.jsx`

| Import | Line | Status |
|--------|------|--------|
| `Rating` from `@mui/material` | 108 | UNUSED — only appears in commented-out testimonial section |
| `linkedin_icon` | 20 | UNUSED — not rendered in any active JSX |
| `facebook_icon` | 21 | UNUSED — same |
| `twitter_icon` | 22 | UNUSED — same |
| `kadhastory_top_curve` | 35 | UNUSED — the `<img>` using it is commented out at line 1430 |
| `avatar_img` | 102 | UNUSED — only in commented-out `data.testimonial` array |
| `jm_image_1` through `jm_image_4` | 73–76 | UNUSED — `data.joyfulpages` section is commented out |
| `feature_image_1` through `feature_image_4` | 78–81 | EFFECTIVELY UNUSED — old features section renders empty `<li>` elements |
| `hw_image_1` through `hw_image_5` | 67–71 | EFFECTIVELY UNUSED — old how-it-works section is visually hidden |
| `circle` | 103 | USED — in success modal at line 2150 |
| `star_icon` | 64 | UNUSED — in fully commented-out testimonial section |

**File:** `src/modules/website/components/footer/footer.jsx`

Lines 1–348 are 348 lines of commented-out code from an older implementation. This is dead code that inflates the file and creates maintenance confusion. Delete the entire commented-out block.

**Stale copy files that Vite will bundle:**
- `src/modules/website/pages/PersonalizeBook copy.jsx` — duplicate of `PersonalizeBook.jsx`
- `src/modules/website/pages/TrackOrderNew copy.jsx` — duplicate of `TrackOrderNew.jsx`
- `src/modules/website/pages/ViewBook copy.jsx` — duplicate of `ViewBook.jsx`

These files are picked up by Vite's module graph and contribute to bundle size. Delete them.

**Fix:**
```jsx
// Landing.jsx — delete these import lines:
// import Rating from "@mui/material/Rating";
// import linkedin_icon from "../../assets/image/svg/linkedin.svg";
// import facebook_icon from "../../assets/image/svg/facebook.svg";
// import twitter_icon from "../../assets/image/svg/twitter.svg";
// import kadhastory_top_curve from "../../assets/image/kadhastory-top-curve.png";
// import avatar_img from "../../assets/image/png/avatar.png";
// import jm_image_1 through jm_image_4
// import star_icon from "../../assets/image/star-ic.png";
```

**Severity:** Medium. **Estimated Lighthouse Impact:** JS bundle -30-80 KB gzipped.

---

### 4.2 Synchronous CSS Import Blocks First Render

**File:** `src/App.jsx` — line 41

```jsx
if (!cssLoaded) return null
```

If the dynamic CSS import fails (network error), the app returns `null` indefinitely — a blank white page with no error feedback.

**Fix:**
```jsx
if (!cssLoaded) return (
  <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'sans-serif' }}>
    <p>Loading...</p>
  </div>
);
```

---

### 4.3 Vite Config — No `manualChunks` for Vendor Splitting

**File:** `vite.config.js` — entire file (11 lines)

```js
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 }
  // NO build.rollupOptions — no vendor splitting, no chunk size limit
})
```

Without `manualChunks`, Vite collapses all vendor code into one or two large chunks. Any version bump to any library invalidates the entire cache.

**Fix:**
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':     ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui':       ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-bootstrap': ['bootstrap', 'react-bootstrap'],
          'vendor-carousel':  ['embla-carousel', 'embla-carousel-react', 'embla-carousel-autoplay', 'react-slick', 'slick-carousel'],
          'vendor-forms':     ['react-hook-form', 'sweetalert2', 'react-phone-input-2'],
          'vendor-redux':     ['react-redux', '@reduxjs/toolkit'],
          'vendor-misc':      ['axios', 'react-hot-toast'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // warn on chunks > 500 KB
  },
})
```

**Severity:** High. **Estimated Lighthouse Impact:** Improved cache hit rate; repeat visit LCP -0.3-0.5 s.

---

## Section 5 — Critical CSS

### 5.1 Global `style.css` Is 4055 Lines — No Critical/Deferrable Split

**File:** `src/modules/website/assets/css/style.css` — imported globally in `src/App.jsx` line 5

The entire 4055-line file is render-blocking on every route. It contains page-specific styles for ViewBook (line 479), Personalize (line 719), Address (line 1610), Order (line 1714), My-Orders (line 2540), Terms (line 2188), Track Order (line 2748), and more. None of these are needed on the landing page, yet they all block the first paint.

**Fix:** Split into two files:
- `style-base.css` — reset, CSS variables, fonts, `.container`, common utilities (~first 480 lines)
- `style-pages.css` — all page-specific styles (lines 479 onward)

Import `style-pages.css` inside individual page components rather than globally. Once pages are `React.lazy()` (Section 1.2), Vite will automatically code-split the CSS with the JS chunk:

```jsx
// ViewBook.jsx — top of file
import "../../assets/css/view-book.css"; // contains only ViewBook-specific rules
```

```js
// App.jsx — keep only the base styles global
import "./modules/website/assets/css/style-base.css"
import "./modules/website/assets/css/custom.css"
```

**Severity:** High. **Estimated Lighthouse Impact:** FCP -0.3-0.8 s.

---

### 5.2 Font Awesome — Render-Blocking External CDN CSS

**File:** `index.html` — lines 9–11

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
  integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

This loads the entire Font Awesome 6 library (~400 KB uncompressed, ~75 KB gzipped) as a render-blocking resource before the first paint. A full search of the website module found zero explicit Font Awesome class usage (`fa-`, `fas`, `far`, `fab`) in any JSX or CSS file — all icons are SVG files or MUI icons.

**Fix Option A — Remove entirely (recommended if confirmed unused):**
```html
<!-- DELETE lines 9–11 from index.html -->
```

**Fix Option B — Load asynchronously if any Font Awesome icons are needed:**
```html
<link
  rel="preload"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
</noscript>
```

**Fix Option C — Use specific icon subsets:**
Install `@fortawesome/react-fontawesome` with tree-shakeable icon packages, importing only the icons actually used. This cuts the payload from ~75 KB to ~2-5 KB.

**Severity:** High. **Estimated Lighthouse Impact:** Eliminates one render-blocking external request; FCP -0.2-0.5 s.

---

### 5.3 Missing `<meta name="description">` and Open Graph Tags

**File:** `index.html` — lines 1–34

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kadhaster</title>
  <!-- NO meta description -->
  <!-- NO og:title, og:description, og:image -->
  <!-- NO twitter:card -->
  <!-- NO canonical link -->
</head>
```

**Fix:**
```html
<meta name="description"
  content="Kadhaster creates personalized storybooks featuring your child and loved ones. Upload a photo, add names, and get a beautifully printed book delivered to your door." />
<meta property="og:title" content="Kadhaster — Personalized Storybooks for Children" />
<meta property="og:description"
  content="Turn your child into the hero of every story. Upload photos, add names, preview instantly, and receive a premium printed book." />
<meta property="og:image" content="https://www.kadhaster.com/og-cover.jpg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.kadhaster.com/" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="canonical" href="https://www.kadhaster.com/" />
```

Per-page descriptions should be managed with `react-helmet-async` (see Section 6.3).

**Severity:** Medium. **Estimated Lighthouse Impact:** SEO score +10-15 points.

---

### 5.4 Favicon References a Development-Only Path

**File:** `index.html` — line 6

```html
<link rel="icon" type="image/svg+xml" href="/src/modules/web/assets/image/png/logo.png" />
```

The path `/src/modules/...` is served by Vite's dev server middleware. In production (`vite build`), the `src/` directory is not exposed at the web root — this favicon will return a 404 in every deployed environment.

**Fix:**
1. Copy `src/modules/website/assets/image/logo-main-fav.png` to `public/favicon.png`
2. Update `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```

**Severity:** High. **Estimated Lighthouse Impact:** Eliminates favicon 404 error in production; minor SEO improvement.

---

## Section 6 — robots.txt & SEO

### 6.1 `robots.txt` Does Not Exist

The `public/` directory contains only `vite.svg`. There is no `robots.txt`.

Without `robots.txt`, all pages including authenticated user-private pages, admin panels, and internal routes may be crawled and indexed by search engines.

**Fix — Create `public/robots.txt` with this exact content:**

```
User-agent: *
Allow: /
Allow: /about
Allow: /faq
Allow: /view-book
Allow: /privacy-policy
Allow: /terms-condition
Allow: /Delivery-policy
Allow: /Refund-policy

Disallow: /admin/
Disallow: /user/mycart
Disallow: /user/address
Disallow: /user/ordersuccess
Disallow: /user/my_orders
Disallow: /user/view_orders/
Disallow: /user/profile_page
Disallow: /user/view_request
Disallow: /user/draft
Disallow: /user/personalize_story
Disallow: /my-cart
Disallow: /address
Disallow: /order-placed
Disallow: /my-orders-new
Disallow: /track-order-new
Disallow: /new-ticket-detail
Disallow: /my-subscription-new
Disallow: /my-profile-new
Disallow: /my-popup
Disallow: /edit-this-story

Sitemap: https://www.kadhaster.com/sitemap.xml
```

**Severity:** Medium. **Estimated Lighthouse Impact:** SEO score +5-8 points.

---

### 6.2 `<img>` Tags Missing Descriptive `alt` Attributes

All content images use `alt=""` (empty string, semantically "decorative") when they carry meaningful content. Key failures:

**File:** `src/modules/website/pages/Landing/Landing.jsx`
- Line 1385: Hero carousel LCP image — `alt=""`. The LCP element having no alt text is an accessibility failure and a missed SEO keyword opportunity.
- Line 1750: `<img src={item.book_cover} alt="" />` — book cover images should have `alt={item.name + " personalized storybook cover"}` for search indexing.
- Line 1999: `<img src={item?.gif_path} alt="" />` — coming-soon book preview images should describe the book.

**File:** `src/modules/website/pages/Landing/SectionPrivacy/SectionPrivacy.jsx`
- Line 63: `<img src={parent} alt="parent" />` — `"parent"` is too vague.

**Fix:**
```jsx
{/* Landing.jsx — story book covers */}
<img
  src={item.book_cover}
  alt={`Cover of "${item.name}" — personalized storybook`}
  width={200}
  height={280}
  loading="lazy"
/>

{/* Landing.jsx — hero image (line 1385) */}
<img
  src={item.img_1}
  alt="Personalized family storybook with child as the hero"
  width={800}
  height={600}
  loading={i === 0 ? "eager" : "lazy"}
  fetchPriority={i === 0 ? "high" : "auto"}
/>

{/* SectionPrivacy.jsx line 63 */}
<img
  src={parent}
  alt="Parent and child protected by Kadhaster's data security"
  width={480}
  height={480}
  loading="lazy"
/>
```

**Severity:** Medium. **Estimated Lighthouse Impact:** Accessibility score +5-10 points, SEO score +3-5 points.

---

### 6.3 Per-Page `<meta name="description">` — All Pages Share One Static Title

The SPA uses `<title>Kadhaster</title>` statically in `index.html`. Every page — About, FAQ, Privacy Policy, ViewBook, Landing — shows the same title in browser tabs and search results.

**Fix — Install `react-helmet-async` and add per-page metadata:**

```bash
npm install react-helmet-async
```

```jsx
// App.jsx — wrap with HelmetProvider
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      {/* existing app content */}
    </HelmetProvider>
  );
}
```

```jsx
// Landing.jsx — add at the top of JSX return
import { Helmet } from 'react-helmet-async';

return (
  <>
    <Helmet>
      <title>Kadhaster — Personalized Storybooks Starring Your Child</title>
      <meta name="description"
        content="Create personalized family storybooks with your child as the hero. Upload a photo, add names, preview instantly, and receive a premium printed book." />
    </Helmet>
    {/* rest of Landing */}
  </>
);

// About.jsx
<Helmet>
  <title>About Kadhaster — Our Story and Mission</title>
  <meta name="description"
    content="Kadhaster is on a mission to get children reading through personalized family storybooks where they are the hero." />
</Helmet>

// Faq.jsx
<Helmet>
  <title>FAQ — Kadhaster Personalized Books</title>
  <meta name="description"
    content="Answers to frequently asked questions about ordering, shipping, privacy, and refunds for Kadhaster personalized storybooks." />
</Helmet>

// ViewBook.jsx — dynamic, based on API data
<Helmet>
  <title>{booksData?.name ? `${booksData.name} — Kadhaster` : 'View Book — Kadhaster'}</title>
  <meta name="description"
    content={booksData?.description || 'View a personalized storybook at Kadhaster.'} />
</Helmet>
```

**Severity:** Medium. **Estimated Lighthouse Impact:** SEO score +5-10 points per page.

---

## Summary — Priority Fix Table

| Priority | Issue | File | Section |
|----------|-------|------|---------|
| **P0 — Critical** | Favicon 404 in production (`/src/...` path) | `index.html` line 6 | 5.4 |
| **P0 — Critical** | Font Awesome render-blocking CDN CSS (unused) | `index.html` lines 9–11 | 5.2 |
| **P0 — Critical** | `robots.txt` does not exist | `public/` | 6.1 |
| **P0 — Critical** | Hero images all eager, no width/height, LCP not prioritized | `Landing.jsx` lines 1385–1393 | 1.6, 3.1 |
| **P0 — Critical** | MP4 videos bundled in assets (21 MB total) | `Landing.jsx` line 4, assets folder | 1.1 |
| **P0 — Critical** | `view-book-page-bg.png` 2.55 MB used as CSS background on 6 pages | `style.css` lines 482–2540 | 1.1, 3.3 |
| **P1 — High** | All page routes statically imported, no Suspense boundary | `WebSite.jsx`, `WebApp.jsx` | 1.2, 2.1 |
| **P1 — High** | `@font-face` missing `font-display: swap`, no WOFF2 | `style.css` lines 3–26 | 3.2 |
| **P1 — High** | Every `<img>` missing `width` and `height` | All pages and components | 3.1 |
| **P1 — High** | `<a href>` and `window.location.href` cause full SPA reloads | `header.jsx`, `footer.jsx`, `Landing.jsx` | 2.2 |
| **P1 — High** | No `manualChunks` in Vite config | `vite.config.js` | 4.3 |
| **P1 — High** | No meta description, OG tags, or per-page titles | `index.html` | 5.3, 6.3 |
| **P1 — High** | `our-product-section-bg.png` 7.4 MB, `our-features-thumb-img.png` 2 MB | asset files | 1.1 |
| **P1 — High** | 4055-line global CSS, no critical/deferrable split | `style.css` | 5.1 |
| **P2 — Medium** | Scroll listeners not passive | `Landing.jsx` line 993, `header.jsx` line 64 | 2.3 |
| **P2 — Medium** | `data` object with JSX nodes re-created every render | `Landing.jsx` line 412 | 1.3 |
| **P2 — Medium** | Duplicate loading overlay spinner (rendered twice) | `Landing.jsx` lines 1047–1072 | 1.5 |
| **P2 — Medium** | No skeleton loaders on API-driven sections | `Landing.jsx`, `ViewBook.jsx` | 2.6 |
| **P2 — Medium** | 80-line custom rAF scroll animation instead of native | `Landing.jsx` lines 196–278 | 2.5 |
| **P2 — Medium** | Unused imports (Rating, social SVGs, avatar, joyful images, star_icon) | `Landing.jsx` lines 20–103 | 4.1 |
| **P2 — Medium** | Three copy `.jsx` files in `src/` bundled by Vite | `pages/` | 4.1 |
| **P3 — Low** | `box-shadow` on hover not GPU-composited | `style.css` line 1976 | 2.4 |
| **P3 — Low** | `toggleAccordion` not wrapped in `useCallback` | `Landing.jsx` line 832 | 1.3 |
| **P3 — Low** | `useEffect` in `embla-auto.jsx` missing `setCarouselIndex` dep | `embla-auto.jsx` line 44 | 1.4 |
| **P3 — Low** | Content images have empty or vague `alt` text | All pages | 6.2 |
