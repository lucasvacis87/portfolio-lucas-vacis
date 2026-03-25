import { createViewportPresets } from "./contracts";

export const testViewports = createViewportPresets("testViewports", {
  mobile: {
    width: 390,
    height: 844
  }
} as const);
