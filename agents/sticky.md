# Sticky Navbar Directive

## 🎯 Objective

Create a **professional sticky navbar** that remains visible at the top of the page during scrolling.  
It must be clean, responsive, accessible, and aligned with modern design standards.

---

## 🧩 Core Requirements

1. **[Persistent visibility](ca://s?q=Sticky_navbar_visibility)**
   - Navbar stays fixed at the top when scrolling.
   - No overlap with page content; add padding/margin if needed.

2. **[Minimalist design](ca://s?q=Minimalist_navbar_design)**
   - Use clear typography and high-contrast colors.
   - Avoid clutter: only essential links and actions.

3. **[Responsive layout](ca://s?q=Responsive_navbar_design)**
   - Collapse into a hamburger menu on small screens.
   - Ensure smooth transitions between breakpoints.

4. **[Scroll animation](ca://s?q=Navbar_scroll_animation)**
   - Subtle shrink or background-color change when scrolling.
   - Animation must be smooth (CSS transitions, 200–300ms).

5. **[Visual hierarchy](ca://s?q=Navbar_visual_hierarchy)**
   - Logo aligned left, main links centered or right.
   - Highlight primary CTA (e.g., “Contact” or “Sign Up”).

6. **[Accessibility](ca://s?q=Accessible_navbar_design)**
   - ARIA labels for menus.
   - Keyboard navigation supported.
   - Contrast ratio ≥ 4.5:1.

7. **[Brand consistency](ca://s?q=Navbar_brand_identity)**
   - Colors, fonts, and spacing aligned with brand guidelines.
   - Navbar reinforces site identity without distraction.

---

## 📐 Technical Standards

- **HTML5 semantic structure**: `<nav>` element with `<ul>` for links.
- **CSS best practices**: Flexbox/Grid for alignment, `position: sticky` or `fixed`.
- **JavaScript (optional)**: For scroll-triggered animations or mobile menu toggle.
- **Performance**: Lightweight, avoid heavy libraries unless necessary.
- **Testing**: Verify across major browsers and devices.

---

## ✅ Deliverables

- A **sticky navbar component** with:
  - Clean HTML structure.
  - Responsive CSS styles.
  - Optional JS for interactivity.
- Documentation explaining customization (colors, fonts, breakpoints).
- Example implementation in a demo page.

---

## 🚫 Restrictions

- No excessive animations or visual noise.
- Do not block content or consume too much vertical space.
- Avoid inline styles; use modular CSS or utility classes.

---

## 📊 Example Workflow

1. Define navbar HTML skeleton.
2. Apply CSS for sticky positioning and responsiveness.
3. Add scroll-triggered animation (optional).
4. Test accessibility and responsiveness.
5. Deliver final component with documentation.
