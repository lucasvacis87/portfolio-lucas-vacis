import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  plugins: [react()],
  base: isActions && repoName ? `/${repoName}/` : "/"
});
