import * as React from "react";
import { cn } from "./cn";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[rgb(var(--border-rgb)/0.6)] bg-[rgb(var(--surface-rgb)/0.72)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
