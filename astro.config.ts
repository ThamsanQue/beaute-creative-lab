import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://beautecreativelab.online",
  integrations: [sitemap()],
  adapter: vercel({
    isr: {
      exclude: ["/api/*", "/[slug].astro"],
    },
  }),
  vite: {
    resolve: {
      alias: {
        "~": "/src",
        $components: "/src/components",
      },
    },
  },
});
