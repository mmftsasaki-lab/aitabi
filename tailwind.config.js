/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F4EF",
        paper: "#FFFCF8",
        rose: "#C98F8B",
        sage: "#A8B8A0",
        teal: "#2F6F73",
        espresso: "#3A2F2A",
        sky: "#EAF1F2",
        gold: "#B99A5B",
        ink: "#51423B",
        line: "#E7DDD3"
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', '"Yu Mincho"', "serif"],
        sans: ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(58, 47, 42, 0.08)",
        lift: "0 24px 70px rgba(47, 111, 115, 0.14)"
      },
      borderRadius: {
        card: "10px"
      },
      maxWidth: {
        content: "1280px"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease both"
      }
    }
  },
  plugins: []
};
