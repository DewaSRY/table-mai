import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common/", import.meta.url)),
      "@lib": fileURLToPath(new URL("./src/lib/", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components/", import.meta.url)
      ),
    },
  },
});
