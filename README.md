# Velvet

A React component library. It owns appearance and accessibility.

**9.4 kB gzipped**

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

The accent is two tokens, not one. `--velvet-accent` fills a shape and only has
to reach 3:1 against the page; `--velvet-accent-text` is the same colour used as
a label and has to reach 4.5:1, which usually means a lighter value in dark mode.
Override both, or an active `NavLink` turns unreadable on dark.

Overriding a token from your app? Declare it on `body`, not `:root`: the dark
theme here lives on `:root[data-theme="dark"]` and outranks a bare `:root` rule
in your stylesheet.

## The one exception to the Radix rule

Every interactive component sits on a Radix primitive, except `Autocomplete`.
Radix has no combobox, and wrapping `Popover` around a text input makes the two
fight over focus. So `Autocomplete` implements the ARIA combobox pattern by hand:
`role="combobox"` on the input, a `listbox` of `option`s, and
`aria-activedescendant` for keyboard navigation. Deliberate, not an oversight.

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
