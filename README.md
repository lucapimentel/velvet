# Velvet

A React component library. It owns appearance and accessibility, and nothing else.

**7.6 kB gzipped**, zero runtime styling, no Tailwind required. Every interactive
component sits on a Radix primitive, and axe checks every story in Storybook.

```bash
npm i @lucapimentel/velvet
```

```tsx
import "@lucapimentel/velvet/styles.css";
import { Field, Input, Button } from "@lucapimentel/velvet";

<Field label="Budget" hint="Whole dollars." error={errors.budget}>
  {(control) => <Input {...control} value={budget} onChange={onChange} />}
</Field>
<Button variant="primary">Save plan</Button>
```

Not using React? `@lucapimentel/velvet/tokens.css` is the token layer on its own,
plain custom properties with no dependencies.

## Theming

Every colour resolves through a semantic token, so an app restyles Velvet without
reading its source:

```css
:root { --velvet-accent: #0f766e; }
```

Dark mode follows `prefers-color-scheme` by default. Set `data-theme="dark"` or
`data-theme="light"` on `<html>` to override it.

## What Velvet does not do

- **Charts.** Pull in a charting library directly.
- **Layout.** Tailwind or your own CSS handles page structure. Velvet ships
  components, not a grid.
- **Form state, data fetching, routing.** `Field` takes an `error` string and has
  never heard of react-hook-form.
- **App-specific widgets.** A component with one consumer belongs in that app.
- **The page shell.** Velvet ships `NavLink`, `PageHeader` and `EmptyState`. It does
  not ship an `AppBar` or a `SideNav` — every app arranges its own bar out of the
  parts, because the arrangement is the thing that differs.

## Development

```bash
npm run dev     # Storybook on :6006
npm test        # Vitest
npm run build   # dist/
```
