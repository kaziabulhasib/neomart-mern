import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load env from parent folder
  const env = loadEnv(mode, "../", "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
    define: {
      // Make the publishable key available in React
      "import.meta.env.VITE_STRIPE_PUBLISH_KEY": JSON.stringify(
        env.VITE_STRIPE_PUBLISH_KEY
      ),
    },
  };
});
