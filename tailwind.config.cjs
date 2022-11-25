/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primaryDark: "rgba(33, 33, 33, 1)",
        secondaryDark: "rgba(36, 36, 36, 1)",
      },
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        320: "320px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        300: "300px",
        350: "350px",
        620: "620px",
      },
      screens: {
        ssm: "470px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        darktext: "rgba(219, 219, 219, 1)",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        scrollBg1: "rgba(255,191,128,0.1)",
        scrollBg2: "rgba(255,46,0,0.1)",
      },
      boxShadow: {
        menu: "6px 0px 20px 2px rgba(75, 80, 84, 0.4)",
        buttonCart: "0px 14px 40px -5px rgba(232, 232, 232, 0.5)",
        button: "rgba(232, 232, 232, 0.24) 0px 3px 8px;"
      },
      zIndex: {
        max: 999999,
        medium: 100
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
