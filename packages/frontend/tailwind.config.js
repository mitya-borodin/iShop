module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        orange: {
          500: "#ff3e00",
        },
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
    textColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
};
