import type { Preview, Decorator } from "@storybook/react-vite";
import "../tokens.css";

const withTheme: Decorator = (Story, ctx) => {
  document.documentElement.dataset.theme = ctx.globals.theme;
  return (
    <div style={{ background: "var(--velvet-surface)", color: "var(--velvet-text)", padding: "2rem" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: "light" },
  globalTypes: {
    theme: {
      description: "Velvet theme",
      toolbar: { icon: "circlehollow", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  parameters: { a11y: { test: "error" } },
};

export default preview;
