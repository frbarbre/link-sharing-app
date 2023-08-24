import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#633CFF',
        'pale-purple': '#BEADFF',
        'light-purple': '#EFEBFF',
        'dark-gray': '#333333',
        'medium-gray': '#737373',
        'light-gray': '#D9D9D9',
        'near-white': '#FAFAFA',
        red: '#FF3939',
      },
      boxShadow: {
        'purple-shadow': '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
        box: '0px 0px 32px 0px rgba(0, 0, 0, 0.10)',
      },
      maxHeight: {
        'sm-screen': 'calc(100svh - 75.6px - 112px)',
        'md-screen': 'calc(100svh - 79.6px - 162px)',
        'sm-phone': 'calc(100svh - 79.6px - 112px + 83px)',
        'md-phone': 'calc(100svh - 79.6px - 162px + 94px)',
      },
      minHeight: {
        'sm-screen': 'calc(100svh - 75.6px - 112px)',
        'md-screen': 'calc(100svh - 79.6px - 162px)',
        'sm-phone': 'calc(100svh - 79.6px - 112px + 83px)',
        'md-phone': 'calc(100svh - 79.6px - 162px + 94px)',
        "sm-preview": 'calc(100svh - 79.6px)',
        "md-preview": 'calc(100svh - 79.6px - 24px)',
      },
      height: {
        'sm-screen': 'calc(100svh - 75.6px - 112px)',
        'md-screen': 'calc(100svh - 79.6px - 162px)',
        'sm-phone': 'calc(100svh - 79.6px - 112px + 83px)',
        'md-phone': 'calc(100svh - 79.6px - 162px + 94px)',
        'sm-no-link': 'calc(100svh - 358px)',
        'md-no-link': 'calc(100svh - 418px)',
      },
      screens: {
        md: '768px',
        lg: '1440px',
      },
    },
  },
  plugins: [],
};
export default config;
