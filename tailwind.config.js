/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pubSans: ["pubSans", "sans-serif"]
      },
      fontSize: {
        'preset1': ['32px', {
          lineHeight: '120%',
          letterSpacing: '0px',
          fontWeight: 'bold'
        }],
        'preset2': ['20px', {
          lineHeight: '120%',
          letterSpacing: '0px',
          fontWeight: 'bold'
        }],
        'preset3': ['16px', {
          lineHeight: '150%',
          letterSpacing: '0px',
          fontWeight: 'bold'
        }],
        'preset4': ['14px', {
          lineHeight: '150%',
          letterSpacing: '0px'
        }],
        'preset5': ['12px', {
          lineHeight: '150%',
          letterSpacing: '0px'
        }],
      },
      colors: {
        "p-beige500": "#98908B",
        "p-beige100": "#F8F4F0",
        "p-grey900": "#201F24",
        "p-grey500": "#696868",
        "p-grey300": "#B3B3B3",
        "p-grey100": "#F2F2F2",
        "s-green": "#277C78",
        "s-yellow": "#F2CDAC",
        "s-cyan": "#82C9D7",
        "s-navy": "#626070",
        "s-red": "#C94736",
        "s-purple": "#826CB0",
        "o-purple": "#AF81BA",
        "o-turquoise": "#597C7C",
        "o-brown": "#93674F",
        "o-magenta": "#934F6F",
        "o-blue": "#3F82B2",
        "o-navy-grey": "#97A0AC",
        "o-army-green": "#7F9161",
        "o-gold": "#CAB361",
        "o-orange": "#BE6C49",
      },
      padding: {
        '500': '40px',
        '400': '32px',
        '300': '24px',
        '250': '20px',
        '200': '16px',
        '150': '12px',
        '100': '8px',
        '50': '4px',
      },
      boxShadow: {
        "dropdown": "0px 0px 15px 2px rgba(0,0,0,0.25)",
      }
    },
  },
  plugins: [],
}

