# Sticky Navbar Implementation

## Component Files

- HTML: `_includes/header.html`
- CSS: `assets/css/style.css`
- JavaScript: `assets/js/site-actions.js`
- Demo page: `docs/sticky-navbar-demo.md` at `/sticky-navbar-demo/`

## Behavior

- The navbar uses `position: sticky` and remains visible at the top while scrolling.
- On scroll, the header changes to a darker institutional blue and shrinks slightly.
- On screens `991px` and below, links collapse into an accessible hamburger menu.
- The menu closes when a link is selected, Escape is pressed, or the user clicks outside the header.
- The current section uses `aria-current="page"`.

## Customization

- Colors: update `--color-primary`, `--color-primary-dark`, and `--color-text-light` in `:root`.
- Fonts: update the existing body and heading font declarations in `assets/css/style.css`.
- Desktop/mobile breakpoint: update the `@media (max-width: 991px)` rule.
- Responsive layout breakpoints: update `576px`, `768px`, and `992px` rules in `assets/css/style.css`.
- Compact mobile brand width: update the `@media (max-width: 520px)` rule.
- CTA: change the `.site-nav-cta` class placement in `_includes/header.html`.

## Accessibility Notes

- Navigation uses semantic `<nav>` and `<ul>` structure.
- The mobile toggle has `aria-controls`, `aria-expanded`, and dynamic labels.
- Focus states are visible with high-contrast outlines.
- Link touch targets are at least `44px` high.
- Colors preserve contrast against the institutional blue background.
- On mobile, the closed menu is removed from keyboard navigation with `inert` and `aria-hidden`.

## Responsive Framework

- The main `.container` uses fluid width with `min()` and `clamp()` so content scales without horizontal scrolling.
- Media elements use `max-width: 100%`.
- Gallery columns use `repeat(auto-fit, minmax(min(100%, 250px), 1fr))`.
- The featured carousel uses adaptive height with `clamp(280px, 55vw, 600px)`.
- Touch targets for navigation, carousel controls, buttons, and download actions preserve a minimum `44px` height.
