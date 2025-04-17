// @ts-check
import { defineConfig } from "astro/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
      resolve: {
          alias: {
              "@": path.resolve(__dirname, "src"),
          },
      },
	},

  adapter: cloudflare(),
});