tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-dark": "var(--primary-dark)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                "background-light": "var(--background-light)",
                "background-dark": "var(--background-dark)",
                surface: "var(--surface)",
                "surface-light": "var(--surface-light)",
            },
            fontFamily: {
                display: ["Lexend", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "0.75rem",
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                full: "9999px",
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
                '2xl': '40px',
                '3xl': '64px',
            },
            boxShadow: {
                'glow': '0 0 20px var(--glow-primary)',
                'glow-lg': '0 0 40px var(--glow-primary)',
                'inner-glow': 'inset 0 0 20px var(--glow-primary)',
            }
        },
    },
};
