import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-thick border-line font-sans text-label font-bold no-underline shadow-md transition-[translate,box-shadow] duration-100 hover:-translate-px hover:shadow-lg active:translate-1 active:shadow-pressed motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-surface-card text-ink",
        primary: "bg-brand-rust text-on-fill-dark",
        blue: "bg-brand-blue text-on-fill-light",
        violet: "bg-brand-violet text-on-fill-dark",
        brown: "bg-brand-brown text-on-fill-light",
        pink: "bg-brand-pink text-on-fill-dark",
        success: "bg-status-success text-on-fill-dark",
        danger: "bg-status-danger text-on-fill-dark",
        ghost:
          "border-transparent bg-transparent text-ink shadow-none hover:translate-0 hover:underline hover:shadow-none active:translate-0",
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        sm: "min-h-9 border-thin px-3 py-1.5 text-[13px] shadow-sm",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
