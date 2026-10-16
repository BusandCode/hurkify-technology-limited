import * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "mb-1.5 block text-xs font-semibold tracking-wide text-mist-600",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
