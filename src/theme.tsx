import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    bg: '#080c21',
    primary: '#F24C4C',
    border: '#212437',

    themeGray: {
      50: '#080c21', // Dark
      100: '#14182c', // Dark Accent
      200: '#1c1f33', // Dark Accent2
      300: '#4c4c4c', // Darker
      400: '#6b6b6b', // Gray Dark
      500: 'silver', // Gray
      600: '#d2d2d2', // Gray light
      700: '#e5e5e5', // Gray lighter
      800: '#f2f2f2', // Light accent
      900: '#fafafa', // Light
    },
  },
  styles: {
    global: {
      body: {
        bg: 'bg',
        color: 'themeGray.900',
        transition: 'all .3s',
      },

      a: {
        transition: 'all .3s',
      },

      'a:hover': {
        color: 'primary',
        textDecoration: 'none !important',
      },

      'img.zoom': {
        transition: 'all .3s',
      },

      'img.zoom:hover': {
        transform: 'scale(1.04)',
      },

      '.content-md': {
        '> :first-child': {
          mt: 0,
        },

        ul: {
          ml: 6,
          pt: 4,
        },

        p: {
          pt: 6,
        },

        'p code': {
          bg: 'themeGray.200',
          color: 'themeGray.800',
          px: 2,
          py: 1,
        },

        'h1, h2, h3, h4, h5, h6': {
          fontWeight: '700',
          fontSize: 'xl',
          pt: 8,
        },

        h1: {
          fontSize: '4xl',
        },

        h2: {
          fontSize: '3xl',
        },

        h3: {
          fontSize: '2xl',
        },

        h4: {
          fontSize: 'xl',
        },

        'h5, h6': {
          fontSize: 'lg',
        },

        pre: {
          bg: 'themeGray.100',
          p: 4,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: 'border',
          mt: 4,
        },

        blockquote: {
          p: 8,
          pt: 4,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: 'border',
          mt: 4,
        },

        'blockquote > p': {
          color: 'themeGray.700',
          fontStyle: 'italic',
          fontWeight: '400',
          fontSize: 'xl',
        },
      },
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  components: {
    Alert: {
      variants: {
        toastSuccess: {
          container: {
            bg: 'rgba(255, 255, 255, 0.1)',
          },
          title: {
            fontWeight: '400',
          },
        },
        toastError: {
          container: {
            bg: 'red.600',
          },
          title: {
            fontWeight: '400',
          },
        },
      },
    },
  },
});

export default theme;
