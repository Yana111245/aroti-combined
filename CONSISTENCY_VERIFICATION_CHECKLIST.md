# App Consistency Verification Checklist
## Based on Home Tab Implementation

> **Reference Standard**: Home Tab (`/src/pages/home/HomeOverview.tsx`)
> 
> **Purpose**: Ensure all tabs match Home tab's design system, structure, and behavior exactly.

---

## 1. Visual Design System ✓

### 1.1 Background & Colors
- [ ] **Background Gradient**: `bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)]`
- [ ] **CSS Variables Match**:
  - `--background: 235 35% 7%`
  - `--background-end: 240 30% 9%`
  - `--foreground: 35 20% 96%`
  - `--card: 235 30% 11%`
  - `--accent: 42 38% 57%` (copper/gold)
- [ ] **Glass Morphism Applied**: `rgba(12, 10, 18, 0.92)` with `blur(60px)`
- [ ] **No Light Theme Overrides**: Removed any light-colored backgrounds

**Verification Command**:
```bash
# Check background classes in each page
grep -r "bg-gradient-to-b from-\[hsl(235,35%,7%)\]" src/pages/
```

---

## 2. Typography System ✓

### 2.1 Font Families
- [ ] **Display Font**: `var(--font-apple-display)` for titles
- [ ] **Text Font**: `var(--font-apple-text)` for body
- [ ] **No Generic Fonts**: No `font-sans`, `font-serif` unless specified

### 2.2 Typography Classes Usage

| Class | Size | Line Height | Usage | Home Example |
|-------|------|-------------|-------|--------------|
| `text-large-title` | 34px | tight | Main page titles | ✓ "Today's Insights" |
| `text-title-1` | 28px | tight | Major sections | - |
| `text-title-2` | 22px | tight | Section titles | ✓ Modals |
| `text-title-3` | 20px | tight | Subsections | ✓ Daily Affirmation |
| `text-headline` | 17px | normal | Card titles | ✓ "Recently Viewed" |
| `text-body` | 17px | relaxed | Body text | ✓ Modal descriptions |
| `text-callout` | 16px | relaxed | Callouts | ✓ Date context |
| `text-subhead` | 15px | relaxed | Secondary | ✓ "Under Pisces skies" |
| `text-footnote` | 13px | relaxed | Small text | ✓ "Tap to reveal" |

**Check Each Tab**:
- [ ] **Discovery**: Uses correct typography classes
- [ ] **Guidance**: Uses correct typography classes
- [ ] **Booking**: Uses correct typography classes
- [ ] **Profile**: Uses correct typography classes

**Verification Command**:
```bash
# Check for old font size classes
grep -r "text-\(xs\|sm\|base\|lg\|xl\|2xl\|3xl\|4xl\)" src/pages/ --exclude-dir=home
```

---

## 3. Layout Structure ✓

### 3.1 Page Wrapper Pattern
- [ ] **PageWrapper Used**: `<PageWrapper showBottomNav={true} showTabBar={false}>`
- [ ] **No Inline Containers**: No `<div className="min-h-screen">` wrappers
- [ ] **Safe Area Respect**: Components don't break safe areas

**Home Example**:
```tsx
<PageWrapper showBottomNav={true} showTabBar={true} className="home-tab-celestial">
```

### 3.2 Fixed Header Pattern
- [ ] **Fixed Positioning**: Header at `fixed top-0 left-0 right-0 z-50`
- [ ] **Safe Area Top**: `pt-[env(safe-area-inset-top)]`
- [ ] **Background**: `background: rgba(12, 10, 18, 0.92)`
- [ ] **Backdrop Blur**: `backdropFilter: blur(60px) saturate(180%)`
- [ ] **Border**: `border-b border-[rgba(255,255,255,0.08)]`
- [ ] **Shadow**: `boxShadow: '0 -1px 0 rgba(255, 255, 255, 0.08), 0 -8px 32px rgba(0, 0, 0, 0.4)'`

**Check Each Tab**:
- [ ] **Discovery**: Has BaseHeader or DiscoveryHeader with fixed positioning
- [ ] **Guidance**: Has BaseHeader in GuidanceOverview
- [ ] **Booking**: Has BaseHeader with search
- [ ] **Profile**: Has BaseHeader with settings action

### 3.3 Content Spacing
- [ ] **Top Padding**: `pt-[80px]` to clear fixed header
- [ ] **Bottom Padding**: `pb-24` to clear bottom nav
- [ ] **Horizontal Padding**: `px-6` on main content
- [ ] **Section Spacing**: `space-y-6` or `space-y-4` between sections
- [ ] **Major Section Top**: `mt-12` for major sections

**Home Example**:
```tsx
<div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
  <main className="px-6 pb-24 mt-4" role="main">
```

---

## 4. Navigation Components ✓

### 4.1 Bottom Navigation (UnifiedBottomNav)
- [ ] **Universal Dark Theme**: No conditional theming based on tab
- [ ] **Background**: `rgba(12,10,18,0.92)` for ALL tabs
- [ ] **Border**: `border-t border-[rgba(255,255,255,0.08)]`
- [ ] **Active Text**: `text-accent` with `apple-glow-accent`
- [ ] **Inactive Text**: `text-[rgba(255,255,255,0.6)]`
- [ ] **Hover State**: `hover:text-[rgba(255,255,255,0.9)]`
- [ ] **Safe Area Bottom**: `paddingBottom: 'env(safe-area-inset-bottom)'`

**Verification Check**:
```typescript
// In UnifiedBottomNav.tsx - should NOT have:
const isHomeTab = location.pathname.startsWith("/home");
// Background should ALWAYS be dark
```

### 4.2 Tab Items
- [ ] **Icon Size**: `w-5 h-5`
- [ ] **Min Width**: `min-w-[60px]`
- [ ] **Touch Target**: `apple-touch-target-comfortable` class
- [ ] **Active Indicator**: Bottom line with accent color
- [ ] **Label Typography**: Proper Apple-style labels

---

## 5. Card Components ✓

### 5.1 BaseCard / Liquid Glass Cards
- [ ] **Class Applied**: `liquid-glass-card`
- [ ] **Border Radius**: `rounded-[12px]` (not `rounded-[16px]` unless specified)
- [ ] **Border**: `border border-glass-border`
- [ ] **Shadow**: `shadow-glass`
- [ ] **Interactive Cards**: `cursor-pointer group` with hover effects

### 5.2 Card Variants
- [ ] **Standard**: Basic liquid-glass-card
- [ ] **Interactive**: Adds hover scale `hover:scale-[1.02]`
- [ ] **Secondary**: `liquid-glass-secondary` class

### 5.3 Card Content Pattern (Home Standard)
```tsx
<BaseCard className="p-4">
  <h3 className="text-headline text-foreground font-semibold">Title</h3>
  <p className="text-footnote text-muted-foreground">Subtitle</p>
</BaseCard>
```

**Check Each Component**:
- [ ] **Discovery Cards**: Match this pattern
- [ ] **Guidance Cards**: Match this pattern
- [ ] **Booking Cards**: Match this pattern (SpecialistCard)
- [ ] **Profile Cards**: Match this pattern

---

## 6. Section Headers ✓

### 6.1 Apple Material Section Header
- [ ] **Class Used**: `apple-material-section-header`
- [ ] **Title Typography**: `text-headline text-foreground`
- [ ] **NOT Using**: Custom `BaseSectionHeader` unless it matches exactly

**Home Example**:
```tsx
<div className="apple-material-section-header">
  <h2 id="recently-viewed-section" className="text-headline text-foreground">
    Recently Viewed
  </h2>
</div>
```

**Check Each Tab**:
- [ ] **Discovery**: Section headers match Home
- [ ] **Guidance**: Section headers match Home
- [ ] **Booking**: Section headers match Home
- [ ] **Profile**: Section headers match Home

---

## 7. Interactive Elements ✓

### 7.1 Primary Buttons
- [ ] **Background**: `bg-gradient-gold`
- [ ] **Shadow**: `shadow-glow`
- [ ] **Hover**: `hover:shadow-soft hover:scale-[1.02]`
- [ ] **Border Radius**: `rounded-full` (pill shape)
- [ ] **Padding**: `py-5 px-6` or `py-4 px-6`
- [ ] **Typography**: `text-body font-semibold`
- [ ] **Text Color**: `text-primary-foreground`

### 7.2 Secondary Buttons
- [ ] **Background**: `bg-card`
- [ ] **Border**: `border-2 border-accent/30`
- [ ] **Hover**: `hover:bg-accent/5 hover:border-accent/50`
- [ ] **Same Sizing**: Matches primary button sizing

### 7.3 Pills / Chips (Like Category Filters)
- [ ] **Active State**: `bg-gradient-gold text-primary-foreground shadow-glow`
- [ ] **Inactive State**: `bg-card/60 text-muted-foreground`
- [ ] **Hover**: `hover:bg-card/80 hover:text-foreground`
- [ ] **Border Radius**: `rounded-[24px]`
- [ ] **Padding**: `px-4 py-2`
- [ ] **Typography**: `text-body font-medium`
- [ ] **Touch Target**: `apple-touch-target-comfortable`
- [ ] **ARIA**: `aria-pressed={active}` and `aria-label`

**Home Example**: DaySelector dates
**Check**: BookingHome CategoryChip, Discovery BrowseByCategory

---

## 8. Specific Component Matches ✓

### 8.1 Recently Viewed Cards

**Home Standard**:
- [ ] **Container**: Horizontal scroll `overflow-x-auto scrollbar-hide`
- [ ] **Card Width**: `w-[280px] flex-shrink-0`
- [ ] **Card Height**: `h-[120px]`
- [ ] **Layout**: Horizontal flex (text left 60%, image right 40%)
- [ ] **Image Section**: `w-[120px] h-[120px]`
- [ ] **Background Image**: Uses imported assets, not string paths
- [ ] **Gradient Overlay**: Type-based gradient
- [ ] **Icon Overlay**: `w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm`
- [ ] **Type Badge**: `text-caption-2 uppercase tracking-wider`
- [ ] **Time Badge**: `text-caption-2` showing "5 MIN"
- [ ] **Title**: `text-headline text-foreground font-semibold leading-tight`

**Data Structure**:
```typescript
{
  id: string;
  title: string;  // e.g., "Moon Guidance"
  type: string;   // e.g., "Spread", "Card", "Learn"
  image: ImportedAsset; // Not string path
}
```

**Check**:
- [ ] **Discovery**: Recently Viewed matches Home exactly
- [ ] **Other Tabs**: If they have Recently Viewed, it matches

### 8.2 Insight Cards (Tarot/Horoscope/Numerology)

**Pre-Reveal State**:
- [ ] **Card Style**: `liquid-glass-card` with mystical center
- [ ] **Center Icon**: Glowing accent-colored symbol
- [ ] **Floating Particles**: 4 particles with `particle-float` animation
- [ ] **Shimmer Effect**: `apple-material-shimmer` on hover
- [ ] **Tap Indicator**: Small dot in top-right on hover
- [ ] **Title**: `text-headline text-foreground`
- [ ] **Subtitle**: `text-footnote text-muted-foreground`

**Post-Reveal State** (if applicable):
- [ ] **Shows Preview**: Small preview text
- [ ] **Badge**: Accent-colored type badge
- [ ] **Clickable**: Opens overflow modal

### 8.3 Daily Affirmation

**Home Pattern**:
```tsx
<div className="liquid-glass-card p-8 text-center space-y-4 stagger-fade-up">
  <p className="text-footnote text-muted-foreground uppercase tracking-wider">
    Daily Affirmation
  </p>
  <p className="text-title-3 text-foreground">
    "{quote}"
  </p>
</div>
```

---

## 9. Animations & Transitions ✓

### 9.1 Animation Classes
- [ ] **Fade In**: `animate-fade-in` applied to main sections
- [ ] **Stagger**: `stagger-fade-up` for sequential reveals
- [ ] **Delays**: Uses `style={{ animationDelay: "0.1s" }}` etc.
- [ ] **Particle Float**: `particle-float` for floating elements
- [ ] **Shimmer**: `liquid-glass-shimmer` for shine effects

### 9.2 Transition Properties
- [ ] **Duration**: `duration-300` for quick, `duration-500` for slower
- [ ] **Transform**: `transition-transform` or `transition-all`
- [ ] **Hover Scale**: `hover:scale-105` or `hover:scale-[1.02]`
- [ ] **Easing**: `ease-out` or `ease-in-out`

---

## 10. Accessibility (ARIA) ✓

### 10.1 Interactive Elements
- [ ] **Role**: `role="button"` for clickable divs
- [ ] **Tab Index**: `tabIndex={0}` for keyboard nav
- [ ] **Labels**: `aria-label` describing action
- [ ] **Description**: `aria-describedby` for context
- [ ] **State**: `aria-pressed` for toggles
- [ ] **Keyboard**: `onKeyDown` handling Enter/Space

**Home Example**:
```tsx
<div
  className="liquid-glass-card"
  onClick={onClick}
  role="button"
  tabIndex={0}
  aria-label="View card details"
  aria-describedby="card-description"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }}
>
```

### 10.2 Semantic HTML
- [ ] **Main**: `<main role="main" aria-label="...">`
- [ ] **Section**: `<section aria-labelledby="...">`
- [ ] **Nav**: `<nav role="navigation" aria-label="...">`
- [ ] **Header**: `<header>` for headers
- [ ] **Hidden Text**: `.sr-only` for screen readers

**Check Each Tab**:
- [ ] **Discovery**: Has semantic structure
- [ ] **Guidance**: Has semantic structure
- [ ] **Booking**: Has semantic structure
- [ ] **Profile**: Has semantic structure

---

## 11. Safe Area Handling ✓

### 11.1 Safe Area Insets
- [ ] **Top**: `pt-[env(safe-area-inset-top)]` on fixed headers
- [ ] **Bottom**: `pb-[env(safe-area-inset-bottom)]` on bottom nav
- [ ] **Left/Right**: Applied where needed

### 11.2 SafeArea Component Usage
- [ ] **PageWrapper Handles**: SafeArea built into PageWrapper
- [ ] **No Manual Padding**: Don't add safe area padding manually if using PageWrapper
- [ ] **Special Case**: Home uses `.home-tab-celestial` with SafeArea

---

## 12. Scrolling Behavior ✓

### 12.1 Horizontal Scrolling
- [ ] **Class**: `scrollbar-hide` or `overflow-x-auto`
- [ ] **Snap**: `snap-x snap-mandatory` where appropriate
- [ ] **Snap Center**: `snap-center` on items
- [ ] **Touch Action**: `touch-action: pan-x` inline style
- [ ] **Webkit**: `-webkit-overflow-scrolling: touch` inline style

**Home Example**: DaySelector, Recently Viewed carousel

### 12.2 Vertical Scrolling
- [ ] **PageWrapper**: Handles vertical scroll by default
- [ ] **No Fixed Height**: Avoid `h-screen` on content containers
- [ ] **Min Height**: Use `min-h-full` instead

---

## 13. Image Assets ✓

### 13.1 Asset Imports
- [ ] **Import Assets**: Use `import tarotMoon from "@/assets/tarot-moon.jpg"`
- [ ] **Not String Paths**: Avoid `"/src/assets/tarot-moon.jpg"`
- [ ] **Consistent Usage**: Same assets used across tabs

**Home Imports**:
```typescript
import tarotMoon from "@/assets/tarot-moon.jpg";
import tarotFool from "@/assets/tarot-fool.png";
import tarotStar from "@/assets/tarot-star.jpg";
import tarotSun from "@/assets/tarot-sun.jpg";
import learnAstrology from "@/assets/learn-astrology.jpg";
import learnMeditation from "@/assets/learn-meditation.jpg";
```

---

## 14. Code Quality ✓

### 14.1 No Inline Styles (Unless Required)
- [ ] **CSS Classes**: Prefer Tailwind classes
- [ ] **Inline Only For**: Dynamic values, backdrop effects
- [ ] **No Style Tags**: Remove `<style>{...}</style>` blocks

### 14.2 No Deprecated Components
- [ ] **Removed**: Old BottomNav components
- [ ] **Using**: UnifiedBottomNav everywhere
- [ ] **Consistent**: BaseCard instead of mixed card components

---

## Verification Process

### Phase 1: Visual Inspection
1. Open each tab side-by-side with Home
2. Check background color matches
3. Check header styling matches
4. Check card styling matches
5. Check typography sizing matches

### Phase 2: Code Review
1. Run grep commands above
2. Check imports match pattern
3. Verify class names
4. Check for old patterns

### Phase 3: Functional Testing
1. Navigate between tabs
2. Verify bottom nav theme stays dark
3. Check scrolling behavior
4. Test touch targets
5. Verify keyboard navigation
6. Test on iOS simulator for safe areas

### Phase 4: Accessibility Audit
1. Use screen reader
2. Test keyboard-only navigation
3. Verify ARIA labels
4. Check semantic HTML structure

---

## Per-Tab Checklist

### Discovery Tab
- [ ] Uses DiscoveryHeader with BaseHeader pattern
- [ ] Background gradient matches Home
- [ ] ForYouCarousel cards styled correctly
- [ ] BrowseByCategory pills match CategoryChip pattern
- [ ] CategoryGrid uses liquid-glass-card
- [ ] Recently Viewed matches Home exactly
- [ ] Section headers use apple-material-section-header
- [ ] Typography classes match Home
- [ ] No light theme remnants

### Guidance Tab
- [ ] GuidanceOverview has BaseHeader
- [ ] Background gradient matches Home
- [ ] Specialist cards use BaseCard
- [ ] Points badge styled correctly
- [ ] Quick pills match Home pattern
- [ ] Typography classes match Home
- [ ] Message input card styled correctly

### Booking Tab
- [ ] Has BaseHeader with search
- [ ] Background gradient matches Home
- [ ] SpecialistCard uses BaseCard
- [ ] CategoryChip matches Home pills
- [ ] Section headers match Home
- [ ] Typography classes match Home
- [ ] Old BottomNav removed

### Profile Tab
- [ ] Has BaseHeader with settings action
- [ ] Background gradient matches Home
- [ ] All cards use BaseCard
- [ ] Cosmic Snapshot card styled correctly
- [ ] Quick action cards match pattern
- [ ] Typography classes match Home
- [ ] Section headers match Home

---

## Sign-Off Checklist

Before marking implementation complete, verify:

- [ ] All tabs reviewed against this checklist
- [ ] Visual consistency confirmed across all tabs
- [ ] No console errors or warnings
- [ ] Safe areas work on notched devices
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces correctly
- [ ] Performance is smooth (no jank)
- [ ] Dark theme applied universally
- [ ] No light-colored elements breaking theme

---

## Notes

- **Home Tab is Reference**: When in doubt, check Home tab implementation
- **Exact Match Required**: Not "similar" - must be identical where specified
- **Document Exceptions**: If something must differ, document why in code comments
- **Test on Device**: Simulator + real iOS device testing required

---

**Last Updated**: October 27, 2024  
**Version**: 1.0  
**Based On**: Home Tab Implementation (HomeOverview.tsx)

