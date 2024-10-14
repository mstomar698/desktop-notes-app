import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: '350px',
        xs: '400px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1240px',
        xxl: '1340px',
        xlg: '1800px',
      },
      backgroundColor: {
        'background': 'var(--background-color)',
        'header': 'var(--header-color)',
        'primary': 'var(--primary-color)',
        'secondary': 'var(--secondary-color)',
      },
      textColor: {
        'primary': 'var(--body-text-color)'
      },
      borderColor: {
        'primary': 'var(--primary-color)',
        'secondary': 'var(--secondary-color)',
      },
      boxShadow: {
        primary: 'var(--shadow-primary)', 
        secondary: 'var(--shadow-secondary)', 
      },
    },
  },
  plugins: [],
};

export default config;
