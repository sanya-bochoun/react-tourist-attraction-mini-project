/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Thai', 'sans-serif'],
        thai: ['Noto Sans Thai', 'sans-serif'],
        sarabun: ['Sarabun', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        anuphan: ['Anuphan', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.2' }],
        'sm': ['0.875rem', { lineHeight: '1.3' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      colors: {
        // หลัก - สีฟ้า
        'primary': {
          100: '#E6F7FF',
          200: '#BAE7FF',
          300: '#91D5FF',
          400: '#69C0FF',
          500: '#40A9FF',
          600: '#1890FF',
          700: '#096DD9',
          800: '#0050B3',
          900: '#003A8C',
        },
        // รอง - สีเขียวมรกต
        'secondary': {
          100: '#E6FFFB',
          200: '#B5F5EC',
          300: '#87E8DE',
          400: '#5CDBD3',
          500: '#36CFC9',
          600: '#13C2C2',
          700: '#08979C',
          800: '#006D75',
          900: '#00474F',
        },
        // เน้น - สีส้ม (สำหรับปุ่มหรือการเน้น)
        'accent': {
          100: '#FFF7E6',
          200: '#FFE7BA',
          300: '#FFD591',
          400: '#FFC069',
          500: '#FFA940',
          600: '#FF8C00',
          700: '#D46B08',
          800: '#AD4E00',
          900: '#873800',
        },
        // สีข้อความ
        'text': {
          light: '#FFFFFF',
          dark: '#333333',
          muted: '#8C8C8C',
        },
        // สีพื้นหลัง
        'background': {
          light: '#FFFFFF',
          off: '#F5F5F5',
          subtle: '#F0F2F5',
        }
      },
    },
  },
  plugins: [],
} 