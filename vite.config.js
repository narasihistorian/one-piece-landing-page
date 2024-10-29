import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@DrukFont": path.resolve(__dirname, "/font/druk-font.otf"),
    },
    extensions: [".js", ".ts", ".tsx", ".jsx"],
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "/index.html"),
        about: resolve(__dirname, "/about.html"),
        luffy: resolve(__dirname, "/luffy.html"),
        zoro: resolve(__dirname, "/zoro.html"),
        nami: resolve(__dirname, "/nami.html"),
        ussop: resolve(__dirname, "/ussop.html"),
        sanji: resolve(__dirname, "/sanji.html"),
        chooper: resolve(__dirname, "/chooper.html"),
        robin: resolve(__dirname, "/robin.html"),
        franky: resolve(__dirname, "/franky.html"),
        brook: resolve(__dirname, "/brook.html"),
        jinbe: resolve(__dirname, "/jinbe.html"),
      },
    },
  },
});
