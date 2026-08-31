import { Slot } from "@radix-ui/react-slot";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./NavLink.module.css";

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page. Sets `aria-current="page"`, not just a colour. */
  active?: boolean;
  /** Render the single child instead of an anchor. Use it to pass your router's link. */
  asChild?: boolean;
}

/**
 * Velvet knows nothing about routing. Wrap your router's link with `asChild`:
 *
 *     <NavLink asChild active={pathname === "/plans"}>
 *       <Link href="/plans">Plans</Link>
 *     </NavLink>
 */
export function NavLink({ active = false, asChild = false, className, ...rest }: NavLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      aria-current={active ? "page" : undefined}
      className={cn(styles.link, active && styles.active, className)}
      {...rest}
    />
  );
}
