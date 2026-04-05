/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        // Marca Snacktopia
        brand: {
          yellow:     '#ffcc00',
          'yellow-dark': '#e6b800',
          black:      '#000000',
          'gray-light': '#f8f9fa',
          'gray-mid':   '#6c757d',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      },
      boxShadow: {
        card:   '0 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.14)',
        lateral: '-2px 0 8px rgba(0,0,0,0.15)',
      },
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  plugins: [],
};