const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        yellow400: "#FAC515",
        yellow500: "#EAAA08",
        success300: "#74E17A",
        success600: "#1E9E3E",
        primary100: "#FBE7D8",
        primary500: "#CA5D50",
        primary600: "#B54639",
        primary700: "#9B2C29",
        gray100: "#F2F4F7",
        gray300: "#D0D5DD",
        gray400: "#98A2B3",
        gray600: "#475467",
        grayCool25: "#FCFCFD",
        grayCool300: "#B9C0D4",
        grugBlack: "#0B0B0B",
        grugCardBackground: "#151011",
        grugCardBackground20: "#151011e6",
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
