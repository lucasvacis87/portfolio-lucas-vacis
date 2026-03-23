import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { navigationItems } from "../../src/content/site";
import { App } from "../../src/app/App";

describe("App anchor coverage", () => {
  it("renders every section referenced in navigation", () => {
    render(<App />);

    for (const item of navigationItems) {
      expect(document.querySelector(item.href)).not.toBeNull();
    }
  });
});
