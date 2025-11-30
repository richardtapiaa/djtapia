
export const SITE_CONFIG = {
  name: 'DJ TAPIA',
  description: 'DJ profesional especializado en música electrónica y eventos',
  url: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  author: 'DJ Tapia',
  email: 'contacto@djtapia.com', // Actualiza con tu email real
  social: {
    instagram: 'https://instagram.com/djtapia',
    facebook: 'https://facebook.com/djtapia',
    youtube: 'https://youtube.com/@djtapia',
  }
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  aos: {
    duration: 1000,
    once: false,
    offset: 120,
    easing: 'ease-out-cubic',
    mirror: true,
    anchorPlacement: 'top-bottom'
  },
  gsap: {
    duration: 1,
    ease: 'power2.out'
  }
} as const;


export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Colors
export const COLORS = {
  primary: '#f97316', // orange-500
  secondary: '#1f2937', // gray-800
  background: '#000000',
} as const;
