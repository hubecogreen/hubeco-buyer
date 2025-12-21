import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // 'login-bg': "url('/images/auth/auth.webp')",
        // 'plans-bg':"url('/images/about/aboutBanner1.webp')",
      },
      boxShadow:{
        'card-shadow':'0px 5px 20px 0px rgb(127 127 127 / 30%)',
        'hover-card-shadow':'0px 25px 20px 0px rgb(127 127 127 / 30%)',
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: "#8C8C8C",
        primary: "#109989",
        secondary: "#A92449",
        secondaryLight:"#BB0444",
        hoverBg: "#2F318D",
        lightBgColor: "#F4F4F4",
        fontGray: "#4d4d4d",
        lightGraytext:"#6C757D",
        linkBg: "#0077B5",
        blue: "#2E3191",
        pink: "#B90647",
        lightGray: "#EEEEEF",
        borderGray:'#ececec',

        secondaryBg: "#F4F4F4",
        bgGray: "#BCBCBC",
        buttonGray: "#bcbcbc",
        inputColor: "#343435",
        primary2: "#009886",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        red:'#F70000',
        cream:"#FFFEF8",
        brown:"#3d3529",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        tiny: "10px",
        xs: "12px", // Example: Extra Small
        sm: "14px", // Small
        base: "16px", // Base
        lg: "18px", // Large
        xl: "20px", // Extra Large
        big: "24px",
        // "2xl": "24px", // 2 Extra Large
        // "extra-large": "48px",
        // Add more as needed
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
        extrabold: "800",
      },
      padding: {
        xs: "5px", // 5px
        sm: "10px", // 10px
        md: "15px", // 15px
        lg: "20px", // 20px
        xl: "25px", // 25px
        xxl: "40px", // 25px
        "3xl": "60px", // 25px
        "4xl": "80px", // 25px,
        "5xl": "100px", // 25px
        "76": "19rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      screens: {
        'sm': '640px',      // Small devices
        'md': '768px',      // Medium devices (you can redefine this range)
        'lg': '1366px',     // Large devices (now starts from 1366px instead of 1024px)
        'xl': '1536px',     // Extra large devices
        '2xl': '1920px',    // Extra-extra large devices

        // Custom breakpoints for your requirements
        'hd': '1280px',         // 1280x720
        'fhd': '1920px',        // 1920x1080
        'wxga': '1366px',       // 1366x768
        'hdplus': '1536px',     // 1536x864
        'wsxga': '1440px',      // 1440x900
        'tablet-md': '768px',   // 768x1024
        'tablet-lg': '810px',   // 810x1080
        'tablet-xl': '820px',   // 820x1180
        'tablet-wide': '800px', // 800x1280
        'mobile-sm': '320px',   // 360x800
        'mobile-md': '390px',   // 390x844
        'mobile-lg': '393px',   // 393x873
        'mobile-xl': '412px',   // 412x915
        'mobile-xxl': '414px',  // 414x896
            // 'hd': '1280px',         // 1280x720
            // 'fhd': '1920px',        // 1920x1080
            // 'wxga': '1366px',       // 1366x768
            // 'hdplus': '1536px',     // 1536x864
            // 'wsxga': '1440px',      // 1440x900
            // 'tablet-md': '768px',   // 768x1024
            // 'tablet-lg': '810px',   // 810x1080
            // 'tablet-xl': '820px',   // 820x1180
            // 'tablet-wide': '800px', // 800x1280
            // 'tablet-1280': '1280px',// 1280x800
    
            // // New dimensions:
            // 'mobile-sm': '360px',   // 360x800
            // 'mobile-md': '390px',   // 390x844
            // 'mobile-lg': '393px',   // 393x873
            // 'mobile-xl': '412px',   // 412x915
            // 'mobile-xxl': '414px',  // 414x896
          },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['autofill'],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config