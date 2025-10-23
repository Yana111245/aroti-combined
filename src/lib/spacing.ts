/**
 * Spacing system based on 8pt grid
 * All spacing values are multiples of 8px for consistent visual rhythm
 */
export const spacing = {
  // Base unit: 8px
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
} as const;

/**
 * Safe area padding values for iOS
 */
export const safeArea = {
  top: 'env(safe-area-inset-top)',
  bottom: 'env(safe-area-inset-bottom)',
  left: 'env(safe-area-inset-left)',
  right: 'env(safe-area-inset-right)',
} as const;

/**
 * Navigation heights
 */
export const navigation = {
  bottomNav: '5rem', // 80px - height of bottom navigation
  tabBar: '4rem',    // 64px - height of tab bar
} as const;

/**
 * Common layout constants
 */
export const layout = {
  maxWidth: '28rem', // 448px - max width for content
  gutter: '1.5rem',  // 24px - side padding
  borderRadius: '1.75rem', // 28px - consistent border radius
} as const;
