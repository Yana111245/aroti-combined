# Aroti Design System - Border Radius Guidelines

## Overview
This document outlines the standardized border radius system used throughout the Aroti app to maintain visual consistency and cohesion.

## Border Radius Variables (from `index.css`)

```css
--radius-main: 12px       /* Main cards and containers */
--radius-pill: 24px       /* Buttons & chips (fully rounded) */
--radius-secondary: 10px  /* Secondary boxes and smaller elements */
--radius-small: 8px       /* Small UI elements */
--radius-card: 12px       /* Card radius (matches main) */
```

## Usage Guidelines

### 1. Main Cards & Containers (12px)
**Use:** `rounded-[12px]`

**Applied to:**
- Specialist cards (`SpecialistCard.tsx`)
- Discovery cards (`DailyQuiz.tsx`, `CategoryGrid.tsx`, `ForYouCarousel.tsx`)
- Tarot spread cards (`TarotSpreadCard.tsx`, `SpreadCard.tsx`)
- Payment summary cards
- Base card components (`BaseCard.tsx`)
- Modal content areas
- Search results containers

**Why:** Creates a consistent, modern look across all primary content containers while maintaining readability and visual hierarchy.

### 2. Buttons (10px)
**Use:** `rounded-[10px]`

**Applied to:**
- Primary action buttons ("Book session", "Start Quiz", "Apply Filters")
- CTA buttons throughout the app

**Why:** Slightly softer than cards to differentiate interactive elements from containers. The 10px radius provides a good balance between rounded and sharp corners for touchable elements.

### 3. Pills & Chips (rounded-full)
**Use:** `rounded-full`

**Applied to:**
- Category chips (`CategoryChip.tsx`)
- Filter buttons (`FilterSheet.tsx`)
- Sort dropdown trigger
- Tag elements
- Badge components
- Notification indicators

**Why:** Fully rounded for pill-style elements creates a friendly, approachable design and clearly distinguishes these interactive filters from other UI elements.

### 4. Avatars & Profile Images (12px)
**Use:** `rounded-[12px]`

**Applied to:**
- Specialist avatars
- User profile pictures
- Author images
- Any profile/identity imagery

**Why:** Matches the main card radius for consistency. Avoids circular images which don't align with the app's angular design system. The rounded square creates visual harmony with cards.

### 5. Small Elements (8px)
**Use:** `rounded-[8px]`

**Applied to:**
- Input fields
- Small cards
- Decorative elements
- Inner border elements

**Why:** Subtler rounding for smaller UI components maintains the design language at a reduced scale.

## Implementation Best Practices

### ✅ Do:
- Use `rounded-[12px]` for all main cards and containers
- Use `rounded-full` for pills, chips, and fully-rounded elements
- Use `rounded-[10px]` for primary buttons
- Match avatar radius to card radius (12px)
- Maintain consistency within component families

### ❌ Don't:
- Mix different radius values randomly
- Use `rounded-xl`, `rounded-2xl`, or `rounded-lg` (use specific px values)
- Use `rounded-full` for avatars or rectangular elements
- Create custom radius values without design system approval

## Component Checklist

### Booking Flow
- [x] SpecialistCard - 12px
- [x] CategoryChip - rounded-full
- [x] FilterSheet buttons - rounded-full
- [x] SortDropdown trigger - rounded-full
- [x] Book session button - 10px
- [x] PaymentSummary avatar - 12px

### Discovery
- [x] DailyQuiz card - 12px
- [x] CategoryGrid cards - 12px
- [x] DailyPractice cards - 12px
- [x] ForYouCarousel cards - 12px
- [x] TarotSpreadCard - 12px
- [x] SpreadCard - 12px
- [x] SearchModal results - 12px

### General
- [x] BaseCard - 12px
- [ ] Forms inputs - 8-12px (as needed)
- [ ] Modals/Sheets - 12px main, 24px top for sheets

## Migration Notes

Components updated to new system:
- `SpecialistCard.tsx`: avatar `rounded-full` → `rounded-[12px]`
- `DailyQuiz.tsx`: card `rounded-[16px]` → `rounded-[12px]`
- `PaymentSummary.tsx`: avatar `rounded-full` → `rounded-[12px]`
- `SearchModal.tsx`: `rounded-[16px]` → `rounded-[12px]`
- `CategoryGrid.tsx`: cards `rounded-[16px]` → `rounded-[12px]`
- `DailyPractice.tsx`: cards `rounded-[16px]` → `rounded-[12px]`
- `ForYouCarousel.tsx`: cards `rounded-[16px]` → `rounded-[12px]`
- `SpreadCard.tsx`: `rounded-[16px]` → `rounded-[12px]`

## Future Considerations

- Consider adding more specific variables for different card types if needed
- Maintain this system when adding new components
- Review border radius quarterly to ensure consistency
- Update this document when new patterns emerge

---

**Last Updated:** November 2024  
**Version:** 1.0

