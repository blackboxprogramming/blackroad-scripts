// BlackRoad Design System Tokens
export const colors = {
  primary: {
    sunrise: '#FF9D00',
    warm: '#FF6B00',
    hotPink: '#FF0066',
    electricMagenta: '#FF006B',
    deepMagenta: '#D600AA',
    vividPurple: '#7700FF',
    cyberBlue: '#0066FF'
  },
  secondary: {
    sunrise: '#FF9D00',
    warm: '#FF6B00',
    hotPink: '#FF0066',
    electricMagenta: '#FF006B'
  },
  neutral: {
    black: '#000000',
    deepBlack: '#0A0A0A',
    charcoal: '#1A1A1A',
    gray: '#2a2a2a',
    midGray: '#666',
    lightGray: '#888',
    offWhite: '#e0e0e0',
    white: '#FFFFFF'
  },
  semantic: {
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
    info: '#3b82f6'
  }
}

export const gradients = {
  br: 'linear-gradient(180deg, #FF9D00 0%, #FF6B00 25%, #FF0066 75%, #FF006B 100%)',
  os: 'linear-gradient(180deg, #FF006B 0%, #D600AA 25%, #7700FF 75%, #0066FF 100%)',
  full: 'linear-gradient(180deg, #FF9D00 0%, #FF6B00 14%, #FF0066 28%, #FF006B 42%, #D600AA 57%, #7700FF 71%, #0066FF 100%)'
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem'
}

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px'
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 40px rgba(255, 0, 102, 0.3)'
}

export const transitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease',
  slow: 'all 0.3s ease'
}

export const typography = {
  fontFamily: {
    sans: '"JetBrains Mono", "SF Mono", "Fira Code", "Courier New", monospace',
    mono: '"JetBrains Mono", "SF Mono", "Fira Code", "Courier New", monospace'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  }
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
