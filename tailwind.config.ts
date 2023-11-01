import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '375px',
        desktop: '1440px'
      },
      colors: {
        primaryPurple: 'hsl(259, 100%, 65%)',
        primaryLightRed: 'hsl(0, 100%, 67%)',

        neutralWhite: 'hsl(0, 0%, 100%)',
        neutralOffWhite: 'hsl(0, 0%, 94%)',
        neutralLightGrey: 'hsl(0, 0%, 86%)',
        neutralSmokeyGrey: 'hsl(0, 1%, 44%)',
        neutralOffBlack: 'hsl(0, 0%, 8%)',
      },
      fontSize: {
        body: '32px'
      }
    },
  },
  plugins: [],
}
export default config
