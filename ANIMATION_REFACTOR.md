# Animation Refactor - Best Practices

## Summary

Successfully refactored animations from mixed CSS/GSAP to proper separation using **GSAP** for scroll-based animations and **Framer Motion** for component lifecycle animations.

---

## Changes Made

### 1. **Modal → Framer Motion** ✅
**Before:** CSS animations with manual state management
```tsx
const [isClosing, setIsClosing] = useState(false)
<div className={`${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}>
```

**After:** Framer Motion AnimatePresence
```tsx
<AnimatePresence>
  {isModalOpen && (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    />
  )}
</AnimatePresence>
```

**Benefits:**
- No manual state management for closing
- Automatic exit animations
- Smoother transitions with proper easing

---

### 2. **FAQ Accordion → Framer Motion** ✅
**Before:** CSS max-height transitions + GSAP entrance
```tsx
<div className={`transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
gsap.from('.faq-item', { y: 30, opacity: 0, stagger: 0.1 })
```

**After:** Framer Motion layout animations
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Benefits:**
- True height: auto animations (no max-height hack)
- Smooth entrance/exit
- Component-based architecture (FAQItem.tsx)

---

### 3. **Kept GSAP For** ✅
- ✅ Horizontal scroll (Guide section with ScrollTrigger pin)
- ✅ Map 3D rotation with scroll progress (scrub animation)
- ✅ Hero timeline sequence (complex multi-element choreography)
- ✅ Custom cursor (quickTo for performance)
- ✅ Text entrance animations with ScrollTrigger

---

## Best Practice Guidelines

### Use **GSAP** when:
1. **Scroll-based animations** (ScrollTrigger)
2. **Complex timelines** with multiple elements
3. **Scrub animations** tied to scroll progress
4. **High-performance** cursor/mouse tracking (quickTo)
5. **3D transforms** with scroll

### Use **Framer Motion** when:
1. **Component mount/unmount** (AnimatePresence)
2. **Layout animations** (height: auto, reordering)
3. **Hover/tap states** (whileHover, whileTap)
4. **Page transitions** (route changes)
5. **Simple state-based** animations

---

## File Structure

```
/app/alternative/page.tsx    - Main page with GSAP scroll animations
/components/FAQItem.tsx       - FAQ component with Framer Motion
/components/PageTransition.tsx - Page transition wrapper
```

---

## Performance Improvements

1. **Removed unnecessary state:** `isClosing` no longer needed
2. **Automatic cleanup:** AnimatePresence handles unmounting
3. **Better separation:** Each library does what it's best at
4. **Component reusability:** FAQ extracted to separate component

---

## Migration Checklist

- [x] Modal → Framer Motion AnimatePresence
- [x] FAQ → Framer Motion layout animations
- [x] Remove isClosing state
- [x] Simplify handleCloseModal
- [x] Extract FAQ to component
- [x] Remove duplicate GSAP FAQ animations
- [x] Keep GSAP for scroll-based animations
- [x] Document best practices

---

## Result

✅ **Cleaner code** - Less manual state management
✅ **Better performance** - Right tool for the job
✅ **Easier maintenance** - Clear separation of concerns
✅ **Smoother animations** - Proper easing and transitions
