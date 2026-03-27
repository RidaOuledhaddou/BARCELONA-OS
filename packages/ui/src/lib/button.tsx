import * as React from "react";
import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_0_1px_rgba(255,255,255,0.05),0_18px_50px_rgb(var(--button-shadow-rgb)/0.24)] hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))]",
  secondary:
    "border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl hover:bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-[var(--fg)] hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-xs",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg-rgb))] disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
