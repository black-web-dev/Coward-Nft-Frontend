/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        dark: '#222222',
        main: 'white',
        'opaque-blue': '#0993ec80',
        'transparent-blue': '#0993EC2A',
        'transparent-pink': '#FE5A752A',
        'opaque-pink': '#f338c380',
        'dark-pink': '#221825',
        'dark-blue': '#0F182A',
        'dark-1000': '#0D0415',
        'dark-900': '#161522',
        'dark-850': '#1d1e2c',
        'dark-800': '#202231',
        'dark-700': '#2E3348',
        'dark-600': '#414A6C',
        'dark-500': '#223D5E',
        'dark-400': '#545f7b',
        'low-emphesis': '#575757',
        primary: '#BFBFBF',
        secondary: '#7F7F7F',
        'high-emphesis': '#E3E3E3',
        'higher-emphesis': '#FCFCFD',
      },
      boxShadow: {
        btn: '0 0px 10px 0px rgba(0, 0, 0, 0.3)',
        img: '0px 0px 15px #ff5ea933',
        nft: '0px 0px 15px #9d0c13',
        network: '0px 0px 15px 10px #ff5ea933',
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '100%': '100%',
        '50%': '50%',
        16: '4rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        timer: 'url("/images/coward/timer_background.png")',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        slide: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slide_revert: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        flip: {
          from: { transform: 'rotateX(0deg)', transformOrigin: '50% bottom ' },
          to: { transform: 'rotateX(180deg)', transformOrigin: '50% bottom ' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        slide: 'slide 7s linear infinite',
        slideRevert: 'slide_revert 7s linear infinite',
        flip: 'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      bounce: {
        from: {
          transform: 'translate3d(0, 0, 0)',
        },
        to: {
          transform: 'translate3d(0, 200px, 0)',
        },
      },
    },
  },
  fontFamily: {
    redhat: ['Red Hat Text', 'sans-serif'],
  },
  plugins: [require('@tailwindcss/forms')],
};
