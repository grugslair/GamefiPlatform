const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', '1.125rem'],
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.5rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.25rem', '1.875rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.375rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '3.75rem'],
        '6xl': ['3.75rem', '4.5rem'],
      },
      colors: {
        yellow400: "#FAC515",
        yellow500: "#EAAA08",
        success50: "#E8FFE4",
        success300: "#74E17A",
        success600: "#1E9E3E",
        success700: "#15873D",
        primary50: "#FFF2E8",
        primary100: "#FBE7D8",
        primary500: "#CA5D50",
        primary600: "#B54639",
        primary700: "#9B2C29",
        gray100: "#F2F4F7",
        gray300: "#D0D5DD",
        gray400: "#98A2B3",
        gray500: "#667085",
        gray600: "#475467",
        gray700: "#344054",
        grayCool25: "#FCFCFD",
        grayCool300: "#B9C0D4",
        grugBlack: "#0B0B0B",
        grugCardBackground: "#151011",
        grugCardBackground20: "#151011e6",
        grugAltCardBackground10: "#68121E1A",
        grugBorder: "#b546394d",
      },
      fontFamily: {
        avara: ["Avara", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      textShadow: {
        grugLg: "0px 4px 5px rgba(0, 0, 0, 0.2)",
        grugSm: "0px 2px 10px rgba(0, 0, 0, 0.4)",
      },
      screens: {
        mobile: '360px',
        tablet: '834px',
        desktop: '1280px',
        largeDesktop: '1440px',
        secondSectionFit: '1550px',
      }
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
}
