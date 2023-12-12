import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [new webpack.ProvidePlugin({ JSZip: "jszip" }), react()],
});
