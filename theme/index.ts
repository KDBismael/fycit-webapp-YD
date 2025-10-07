import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Monaco, Consolas, monospace',
  
  colors: {
    vegasGold: [
      '#FFFBFB',
      '#FAFBE3', 
      '#F3F7CD',
      '#EDECB0',
      '#E4E0A2',
      '#DDD560',
      '#D3C977',
      '#CBB852',
      '#BAAD3E',
      '#768820'
    ],
    gray: [
      '#EEEEEE',
      '#CCCCCD',
      '#B3B3B4',
      '#999999',
      '#808082',
      '#606769',
      '#404D4F',
      '#333436',
      '#1A1A1D',
      '#000000'
    ],
    brand: [
      '#FFFBFB',
      '#FAFBE3',
      '#F3F7CD', 
      '#EDECB0',
      '#E4E0A2',
      '#DDD560',
      '#D3C977',
      '#CBB852',
      '#BAAD3E',
      '#768820'
    ],
    darkGold: [
      '#FFFBFB',
      '#FAFBE3',
      '#F3F7CD',
      '#EDECB0', 
      '#E4E0A2',
      '#DDD560',
      '#D3C977',
      '#CBB852',
      '#768820',
      '#464716'
    ],
    purple: [
      '#F5F3FF',
      '#E6E0FF',
      '#D1C4FF',
      '#B8A3FF',
      '#9F82FF',
      '#8661FF',
      '#6941C6',
      '#5A3AA8',
      '#4B338A',
      '#3C2C6C'
    ],
    darkBlue: [
      '#E6F2FF',
      '#B3D9FF',
      '#80C0FF',
      '#4DA7FF',
      '#1A8EFF',
      '#0075E6',
      '#005294',
      '#004080',
      '#002D6C',
      '#001A58'
    ],
    red: [
      '#FFF0F3',
      '#FFE0E6',
      '#FFB3C1',
      '#FF80A0',
      '#FF4D7F',
      '#FF0161',
      '#E6005A',
      '#CC0053',
      '#B3004C',
      '#990045'
    ],
    success: [
      '#F0FDF4',
      '#DCFCE7',
      '#BBF7D0',
      '#86EFAC',
      '#4ADE80',
      '#36B923',
      '#22C55E',
      '#16A34A',
      '#15803D',
      '#166534'
    ],
    warning: [
      '#FFFBEB',
      '#FEF3C7',
      '#FDE68A',
      '#FCD34D',
      '#FBBF24',
      '#EF800A',
      '#F59E0B',
      '#D97706',
      '#B45309',
      '#92400E'
    ],
    error: [
      '#FEF2F2',
      '#FEE2E2',
      '#FECACA',
      '#FCA5A5',
      '#F87171',
      '#FF4335',
      '#EF4444',
      '#DC2626',
      '#B91C1C',
      '#991B1B'
    ]
  },

  primaryColor: 'brand',
  primaryShade: 8,

  defaultRadius: 'md',
  radius: {
    xs: '4px',
    sm: '6px', 
    md: '8px',
    lg: '12px',
    xl: '16px'
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px'
  },

  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.5',
    lg: '1.55',
    xl: '1.6'
  },

  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.3' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.4' },
      h6: { fontSize: '1rem', lineHeight: '1.5' }
    }
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md'
      },
      styles: {
        root: {
          fontWeight: 500
        }
      }
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm'
      }
    },
    TextInput: {
      defaultProps: {
        radius: 'md'
      }
    },
    Select: {
      defaultProps: {
        radius: 'md'
      }
    },
    Textarea: {
      defaultProps: {
        radius: 'md'
      }
    }
  },

  other: {
    lightGray: '#F5F6FC',
    subtext: '#667077',
    pureWhite: '#FFFFFF',
    black: '#000000'
  }
});
