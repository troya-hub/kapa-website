// @ts-check
import { defineConfig } from "astro/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import preact from "@astrojs/preact";
import svgr from "vite-plugin-svgr";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			svgr({
				svgrOptions: {
					jsxRuntime: "classic-preact",
					plugins: ["@svgr/plugin-jsx"],
					jsxRuntimeImport: { source: "preact", specifiers: ["h"] },
					exportType: "named",
				},
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},
	},

	adapter: cloudflare(),

	outDir: "_dist",

	integrations: [preact()],
});
