# Responsive Design Directive

## 🎯 Objective

Ensure the website is **fully responsive**, adapting seamlessly to all screen sizes (desktop, tablet, mobile) while maintaining professional quality, accessibility, and modern aesthetics.

---

## 🧩 Core Requirements

1. **[Fluid grid system](ca://s?q=Responsive_grid_system)**
   - Use CSS Grid or Flexbox for layout.
   - Avoid fixed widths; rely on percentages, `min/max-width`, and relative units.

2. **[Breakpoints strategy](ca://s?q=Responsive_breakpoints)**
   - Define clear breakpoints for mobile, tablet, and desktop.
   - Example:
     - Mobile: ≤ 576px
     - Tablet: 577–992px
     - Desktop: ≥ 993px
   - Adjust typography, spacing, and layout per breakpoint.

3. **[Mobile-first approach](ca://s?q=Mobile_first_design)**
   - Start styling for small screens, then progressively enhance for larger devices.
   - Prioritize performance and readability on mobile.

4. **[Flexible media](ca://s?q=Responsive_images_and_videos)**
   - Images and videos scale proportionally (`max-width: 100%`).
   - Use `srcset` and `picture` for responsive images.
   - Lazy loading for performance.

5. **[Adaptive typography](ca://s?q=Responsive_typography)**
   - Use relative units (`em`, `rem`, `vw`) for font sizes.
   - Ensure readability across devices.
   - Maintain hierarchy with consistent heading scales.

6. **[Navigation responsiveness](ca://s?q=Responsive_navbar_design)**
   - Sticky navbar adapts to screen size.
   - Hamburger menu or off‑canvas navigation for mobile.
   - Smooth transitions between states.

7. **[Touch-friendly elements](ca://s?q=Touch_friendly_UI)**
   - Buttons and links sized for finger taps (≥ 44px height).
   - Adequate spacing to avoid accidental clicks.

8. **[Accessibility compliance](ca://s?q=Accessible_responsive_design)**
   - Maintain contrast ratios.
   - Ensure keyboard and screen reader compatibility.
   - Avoid hidden content traps when resizing.

---

## 📐 Technical Standards

- **HTML5 semantic structure** with ARIA roles.
- **CSS best practices**: Flexbox/Grid, media queries, utility classes.
- **Performance optimization**: Minify CSS/JS, compress images, use responsive units.
- **Cross-browser testing**: Chrome, Firefox, Safari, Edge.
- **Device testing**: Desktop, tablet, mobile (portrait/landscape).

---

## ✅ Deliverables

- A **responsive layout framework** with:
  - Grid system and breakpoints.
  - Adaptive typography and media.
  - Responsive navigation.
- Documentation for customization (colors, fonts, breakpoints).
- Demo page showcasing responsiveness across devices.

---

## 🚫 Restrictions

- No fixed pixel layouts.
- Avoid horizontal scrollbars.
- Do not rely solely on JavaScript for responsiveness.
- No excessive media queries; keep structure clean and scalable.

---

## 📊 Example Workflow

1. Define mobile-first base styles.
2. Add breakpoints for tablet and desktop.
3. Implement responsive images and typography.
4. Test navigation and interactive elements on all devices.
5. Validate accessibility and performance.
6. Deliver final responsive framework with documentation.
