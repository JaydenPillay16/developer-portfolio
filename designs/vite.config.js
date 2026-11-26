import { defineConfig } from "vite";
export default defineConfig({
  build: { outDir: "assets", emptyOutDir: false, lib: { entry: "study.js", name: "JPStudy", formats: ["iife"], fileName: () => "study.js" } }
});
