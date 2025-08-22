import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive magnetic-hover btn-morph",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-3d hover:bg-primary/90 hover:shadow-neobrutal",
        destructive:
          "bg-destructive text-white shadow-3d hover:bg-destructive/90 hover:shadow-neobrutal focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-3d hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-3d hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        
        /* New 2025 Variants */
        glass:
          "glass text-primary-foreground hover:bg-primary/20 hover:backdrop-blur-lg border-white/20",
        
        neobrutal:
          "bg-primary text-primary-foreground shadow-neobrutal border-2 border-foreground hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-transform",
        
        gradient:
          "bg-mesh-primary text-white shadow-3d hover:bg-mesh-secondary",
        
        success:
          "bg-success-gradient text-white shadow-3d hover:brightness-110",
        
        warning:
          "bg-warning-gradient text-white shadow-3d hover:brightness-110",
        
        error:
          "bg-error-gradient text-white shadow-3d hover:brightness-110",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-4 rounded-xl",
        sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        xl: "h-14 rounded-2xl px-10 has-[>svg]:px-8 text-lg font-semibold",
  icon: "size-10 rounded-xl",
  "icon-sm": "size-8 rounded-lg",
  "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
