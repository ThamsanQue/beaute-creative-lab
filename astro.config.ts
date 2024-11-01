import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://beautecreativelab.online",
  integrations: [sitemap()],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        "~": "/src",
        $components: "/src/components",
      },
    },
  },
});
