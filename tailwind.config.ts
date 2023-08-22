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
      },
    },
  },
  plugins: [],
};
export default config;
