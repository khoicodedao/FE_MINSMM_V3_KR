/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EA1261",
        secondary: "#0FD05F",
        warning: "#FFA500",
        accent: "#3D17E8",
        background: "#F8F7FA",
        text: {
          primary: "#212121",
          secondary: "#666270",
        },
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      button: {
        primary: {
          backgroundColor: "#EA1261",
          color: "#FFFFFF",
          hover: {
            backgroundColor: "#D8104D",
          },
        },
        secondary: {
          backgroundColor: "#0FD05F",
          color: "#FFFFFF",
          hover: {
            backgroundColor: "#0ED04F",
          },
        },
      },
      background: {
        primary: "#EA1261",
        secondary: "#0FD05F",
        warning: "#FFA500",
        accent: "#3D17E8",
        background: "#F8F7FA",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      screens: {
        'xl1428': '1428px', // width > 1427px
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
