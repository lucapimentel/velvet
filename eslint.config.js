import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "storybook-static"] },
  ...tseslint.configs.recommended,
);
