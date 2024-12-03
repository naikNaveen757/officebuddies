module.exports = {
  darkMode: 'class', 
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}', 
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'dark-background': '#121212',
        'dark-text': '#f5f5f5',
        'light-background': '#ffffff',
        'light-text': '#000000',
      },
    },
  },
  plugins: [],
};
