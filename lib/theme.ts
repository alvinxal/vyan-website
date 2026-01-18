/**
 * VYAN WEBSITE THEME CONSTANTS
 * 
 * This file contains all reusable design tokens and styling patterns
 * used across the Vyan Abimanyu website. Use these constants to maintain
 * visual consistency across all pages.
 * 
 * Usage:
 * import { THEME } from '@/lib/theme'
 * <div className={THEME.container.default}>...</div>
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Primary Background
  background: {
    primary: '#F8F5F0',      // Warm off-white (main background)
    white: '#FFFFFF',        // Pure white
    dark: '#1a1a1a',        // Dark background for hero sections
  },

  // Text Colors
  text: {
    primary: '#30373C',      // Dark charcoal (headings, primary text)
    secondary: '#6B6560',    // Muted brown (body text, descriptions)
    accent: '#2D2623',       // Darker brown (hover states, CTAs)
    white: '#FFFFFF',        // White text (on dark backgrounds)
    muted: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
  },

  // UI Elements
  ui: {
    border: 'rgba(48, 55, 60, 0.1)',  // Subtle borders
    overlay: 'rgba(0, 0, 0, 0.4)',    // Dark overlay for videos/images
  }
} as const

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
  // Font Families (use with Next.js font imports)
  fonts: {
    heading: 'Tenor_Sans',    // For headings and display text
    body: 'Montserrat',       // For body text and UI
  },

  // Font Sizes (Tailwind classes)
  sizes: {
    hero: 'text-6xl',                    // 60px - Hero headings
    h1: 'text-5xl',                      // 48px - Page titles
    h2: 'text-4xl',                      // 36px - Section headings
    h3: 'text-3xl',                      // 30px - Subsection headings
    body: 'text-base md:text-lg',        // 16px/18px - Body text
    small: 'text-sm md:text-base',       // 14px/16px - Small text
    tiny: 'text-xs',                     // 12px - Captions, labels
  },

  // Line Heights
  leading: {
    tight: 'leading-tight',              // 1.25 - Headings
    relaxed: 'leading-relaxed',          // 1.625 - Body text
    loose: 'leading-[1.8]',              // 1.8 - Long-form content
  }
} as const

// ============================================================================
// LAYOUT & SPACING
// ============================================================================

export const LAYOUT = {
  // Container Widths
  container: {
    default: 'max-w-[1400px] mx-auto px-6 lg:px-[60px]',  // Main content container
    narrow: 'max-w-[800px] mx-auto px-6',                 // Narrow content (FAQ, forms)
    wide: 'max-w-7xl mx-auto px-6 lg:px-[60px]',         // Alternative width (1280px)
  },

  // Section Padding
  section: {
    default: 'py-20',                    // Standard section spacing
    large: 'py-28',                      // Large section spacing
    hero: 'min-h-screen',                // Full viewport height
  },

  // Responsive Padding
  padding: {
    mobile: 'px-6',                      // 24px on mobile
    desktop: 'lg:px-[60px]',             // 60px on desktop
    responsive: 'px-6 lg:px-[60px]',     // Combined responsive
  }
} as const

// ============================================================================
// VISUAL EFFECTS
// ============================================================================

export const EFFECTS = {
  // Texture & Grain
  grain: 'bg-grain',                     // Subtle noise texture overlay (from globals.css)

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    text: 'drop-shadow-md',              // Text shadow for readability
  },

  // Blur
  blur: {
    backdrop: 'backdrop-blur-md',        // Glassmorphism effect
    image: 'blur-sm',                    // Subtle image blur
  },

  // Transitions
  transition: {
    default: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    colors: 'transition-colors duration-300',
    transform: 'transition-transform duration-300',
  }
} as const

// ============================================================================
// ANIMATIONS
// ============================================================================

export const ANIMATIONS = {
  // Standard Tailwind Animations
  pulse: 'animate-pulse',                // Breathing effect
  ping: 'animate-ping',                  // Ripple effect
  
  // Custom Animations (from globals.css)
  marquee: 'animate-marquee',            // Horizontal scroll (70s)
  marqueeFast: 'animate-marquee-s',      // Horizontal scroll (10s)
  slideUp: 'animate-slide-up',           // Slide up entrance
  slideDown: 'animate-slide-down',       // Slide down exit
  fadeIn: 'animate-fade-in',             // Fade in
  fadeOut: 'animate-fade-out',           // Fade out
  fadeInUp: 'animate-fade-in-up',        // Fade in + slide up
} as const

// ============================================================================
// COMPONENT PATTERNS
// ============================================================================

export const PATTERNS = {
  // Button Styles
  button: {
    primary: 'px-12 py-5 bg-[#2D2623] text-white rounded-full font-medium tracking-wide transition-all duration-300 hover:bg-[#3d3330] shadow-sm hover:shadow-md',
    secondary: 'px-12 py-5 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300',
    ghost: 'px-10 py-4 bg-transparent border border-current rounded-full transition-all duration-300',
  },

  // Card Styles
  card: {
    default: 'bg-white rounded-lg shadow-md p-6',
    glass: 'bg-white/[0.85] backdrop-blur-md rounded-md shadow-2xl border border-white/20',
  },

  // Link Styles
  link: {
    default: 'hover:opacity-70 transition-opacity',
    underline: 'border-b border-transparent hover:border-current transition-all duration-300',
  }
} as const

// ============================================================================
// COMBINED THEME EXPORT
// ============================================================================

export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  layout: LAYOUT,
  effects: EFFECTS,
  animations: ANIMATIONS,
  patterns: PATTERNS,
} as const

// ============================================================================
// TYPE EXPORTS (for TypeScript autocomplete)
// ============================================================================

export type Theme = typeof THEME
export type Colors = typeof COLORS
export type Typography = typeof TYPOGRAPHY
export type Layout = typeof LAYOUT
