export const lightTheme = {
  colors: {
    // Primary colors
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#dbeafe',

    // Secondary colors
    secondary: '#7c3aed',
    secondaryHover: '#6d28d9',
    secondaryLight: '#ede9fe',

    // Neutral colors
    background: '#ffffff',
    backgroundAlt: '#f9fafb',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',

    // Text colors
    text: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',

    // Border colors
    border: '#e5e7eb',
    borderLight: '#f3f4f6',

    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Accent colors
    accent: '#ec4899',
    accentHover: '#db2777',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  typography: {
    // Font families
    fontFamily: {
      primary:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      secondary: "'Poppins', sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },

    // Font sizes
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
    },

    // Font weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line heights
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    // Letter spacing
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
    '5xl': '8rem', // 128px
  },

  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,

    // Primary colors (slightly adjusted for dark mode)
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#1e3a8a',

    // Secondary colors
    secondary: '#8b5cf6',
    secondaryHover: '#7c3aed',
    secondaryLight: '#4c1d95',

    // Neutral colors (inverted)
    background: '#0f172a',
    backgroundAlt: '#1e293b',
    surface: '#1e293b',
    surfaceAlt: '#334155',

    // Text colors (inverted)
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',

    // Border colors
    border: '#334155',
    borderLight: '#1e293b',

    // Status colors (adjusted for dark)
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',

    // Accent colors
    accent: '#f472b6',
    accentHover: '#ec4899',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
