import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/component/**/*.component.test.tsx"],
    setupFiles: ["tests/setup/component.setup.ts"]
  }
});
