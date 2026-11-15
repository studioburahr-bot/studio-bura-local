import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // Case study text styles, named after the Figma text styles. Weight is set separately (font-bold).
      // Sizes that change below md read CSS variables set in src/index.css, so one class covers both.
      fontSize: {
        hero: ["var(--text-hero)", { lineHeight: "var(--text-hero-lh)", letterSpacing: "0" }],
        statement: ["var(--text-statement)", { lineHeight: "var(--text-statement-lh)", letterSpacing: "0" }],
        "heading-3": ["var(--text-heading-3)", { lineHeight: "var(--text-heading-3-lh)", letterSpacing: "0" }],
        body: ["var(--text-body)", { lineHeight: "var(--text-body-lh)", letterSpacing: "0" }],
        "body-sm": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
        label: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0" }],
        // Same size as label for now; kept separate so annotations can change on their own.
        annotation: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0" }],
        // Diagram card text, and the diagram's small mono tags (with font-mono: the system monospace stack).
        diagram: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0" }],
        "diagram-mono": ["0.625rem", { lineHeight: "0.75rem", letterSpacing: "0" }],
      },
      colors: {
        // Case study colours, named after the Figma colour variables.
        // ink and surface reuse the site's foreground/background; the accents are set per project
        // (CSS variables on the case study's page wrapper, values in src/data/projects.ts).
        ink: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--ink-muted))",
        },
        surface: {
          DEFAULT: "hsl(var(--background))",
          // Light grey: text and borders on project-accent, and grey backgrounds behind ink-muted text.
          muted: "hsl(var(--surface-muted))",
        },
        // Thin decorative lines (annotation leader lines).
        line: "hsl(var(--line))",
        "project-accent": {
          DEFAULT: "hsl(var(--project-accent))",
          strong: "hsl(var(--project-accent-strong))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      boxShadow: {
        // Phone screenshots in case studies (Figma's phone shadow, rounded to whole px).
        phone: "0 12px 32px -14px rgb(17 17 20 / 0.22), 0 1px 4px rgb(17 17 20 / 0.05)",
      },
      maxWidth: {
        container: "1400px",
        hero: "768px",
        sheet: "384px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "flipIn": {
          "0%": {
            transform: "rotateY(-90deg)",
            opacity: "0",
          },
          "100%": {
            transform: "rotateY(0deg)",
            opacity: "1",
          },
        },
        "page-turn": {
          "0%": {
            opacity: "0",
            transform: "translateX(60px) rotateY(-15deg)",
          },
          },
        "page-turn-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-60px) rotateY(15deg)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) rotateY(0deg)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flipIn": "flipIn 0.5s ease-in-out",
        "page-turn": "page-turn 0.5s ease-out forwards",
        "page-turn-left": "page-turn-left 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
