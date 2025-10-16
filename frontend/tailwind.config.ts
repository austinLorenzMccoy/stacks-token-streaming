import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Liquid Mercury Streams" - Organic, fluid, metallic
        mercury: {
          50: '#F8FAFC',
          100: '#E8EDF2',
          200: '#D1DBE6',
          300: '#A8BBCE',
          400: '#7A94AD',
          500: '#5B7A96',
          600: '#3D5A73',
          700: '#2C4558',
          800: '#1E3142',
          900: '#0F1D2E',
          950: '#070F1A',
        },
        liquid: {
          chrome: '#C0C5CE',
          silver: '#8B92A3',
          steel: '#5B6370',
          slate: '#3D4451',
          void: '#1A1D26',
        },
        flow: {
          teal: '#2DD4BF',
          cyan: '#22D3EE',
          sky: '#38BDF8',
          indigo: '#818CF8',
          violet: '#A78BFA',
        },
      },
      backgroundImage: {
        'mercury-flow': 'linear-gradient(135deg, #5B7A96 0%, #2DD4BF 50%, #818CF8 100%)',
        'liquid-gradient': 'linear-gradient(to right, #2DD4BF, #22D3EE, #38BDF8, #818CF8, #A78BFA)',
        'chrome-shine': 'linear-gradient(110deg, #C0C5CE 0%, #F8FAFC 45%, #C0C5CE 50%, #8B92A3 55%, #C0C5CE 100%)',
        'metallic-texture': 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(192, 197, 206, 0.03) 2px, rgba(192, 197, 206, 0.03) 4px)',
      },
      animation: {
        'mercury-drip': 'mercuryDrip 4s ease-in-out infinite',
        'liquid-wave': 'liquidWave 6s ease-in-out infinite',
        'chrome-reflect': 'chromeReflect 3s linear infinite',
        'ripple': 'ripple 3s ease-out infinite',
        'blob': 'blob 7s infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        mercuryDrip: {
          '0%, 100%': { 
            transform: 'translateY(0) scaleY(1)',
            borderRadius: '50% 50% 50% 50%',
          },
          '50%': { 
            transform: 'translateY(10px) scaleY(1.1)',
            borderRadius: '50% 50% 40% 40%',
          },
        },
        liquidWave: {
          '0%, 100%': { 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg)',
          },
          '50%': { 
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(180deg)',
          },
        },
        chromeReflect: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        ripple: {
          '0%': { 
            transform: 'scale(0.8)',
            opacity: '1',
          },
          '100%': { 
            transform: 'scale(2.4)',
            opacity: '0',
          },
        },
        blob: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': { 
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': { 
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        morph: {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '34%': {
            borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%',
          },
          '67%': {
            borderRadius: '100% 60% 60% 100% / 100% 100% 60% 60%',
          },
        },
      },
      boxShadow: {
        'mercury': '0 4px 20px rgba(91, 122, 150, 0.3), inset 0 1px 0 rgba(248, 250, 252, 0.1)',
        'liquid': '0 8px 32px rgba(45, 212, 191, 0.2), 0 2px 8px rgba(34, 211, 238, 0.15)',
        'chrome': '0 2px 8px rgba(192, 197, 206, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'flow': '0 0 40px rgba(45, 212, 191, 0.3), 0 0 80px rgba(129, 140, 248, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
