import type { Config } from "tailwindcss";

export default {
  content: [
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gold-fade":
          "linear-gradient(90deg,rgba(255, 222, 0, 1) 0%, rgba(188, 164, 0, 0.16) 31%, rgba(153, 133, 0, 0) 100%)",
      },
      colors: {
        bg: "#1E1E1E",
        "dark-brown": "#1D1D1F",
        card: "#242424",
        primary: "#FFDE00",
        "light-gray": "#797979",
      },

      fontSize: {
        heading: [
          "50px",
          {
            lineHeight: "67px",
            fontWeight: "700",
          },
        ],
        "heading-sm": [
          "26px",
          {
            lineHeight: "32px",

            fontWeight: "600",
          },
        ],
        subheading: [
          "40px",
          {
            lineHeight: "55px",
            fontWeight: "700",
          },
        ],
        "subheading-sm": [
          "28px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],
        title: [
          "22px",
          {
            lineHeight: "36px",
            fontWeight: "500",
          },
        ],
        "title-sm": [
          "18px",
          {
            lineHeight: "27px",
            fontWeight: "500",
          },
        ],
        "section-title": [
          "32px",
          {
            lineHeight: "40px",
            fontWeight: "600",
          },
        ],
        "section-title-sm": [
          "22px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        subtitle: [
          "24px",
          {
            lineHeight: "36px",
            fontWeight: "600",
          },
        ],
        "subtitle-sm": [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        subtitle2: [
          "18px",
          {
            lineHeight: "30px",
            fontWeight: "400",
          },
        ],
        "subtitle2-sm": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        subtitle3: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        "subtitle3-sm": [
          "13px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        "card-title": [
          "17px",
          {
            lineHeight: "22px",
            fontWeight: "500",
          },
        ],
        "card-title-sm": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        content: [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "content-sm": [
          "15px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
