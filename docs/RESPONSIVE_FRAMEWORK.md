# Responsive Framework

## Scope

This project uses a focused responsive framework layered on top of the existing editorial design. It improves mobile, tablet, and desktop behavior without changing the visual identity of the magazine.

## Breakpoints

- Mobile: `max-width: 576px`
- Tablet: `577px` to `992px`
- Navbar collapse: `max-width: 991px`
- Compact brand label: `max-width: 520px`

## Layout Rules

- `.container` uses fluid width and adaptive spacing.
- `.gallery` uses CSS Grid with flexible columns.
- Media elements use `max-width: 100%`.
- Featured carousel height adapts with `clamp()`.
- Primary interactive controls preserve `44px` touch targets.

## Customization

- Colors: edit the `:root` variables in `assets/css/style.css`.
- Fonts: edit body and heading font families in `assets/css/style.css`.
- Breakpoints: edit the responsive framework block near the end of `assets/css/style.css`.
- Gallery density: adjust the `250px` minimum in the `.gallery` grid rule.
- Carousel scale: adjust `clamp(280px, 55vw, 600px)` in `.featured-carousel`.

## Accessibility

- The sticky navbar uses semantic navigation and ARIA attributes.
- The mobile menu is removed from keyboard navigation while closed.
- Focus outlines remain visible.
- Buttons and controls keep touch-friendly sizing.
