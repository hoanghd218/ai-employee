import { Button } from "@/components/ui/button";
import { SITE, CTA_TEXT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
  text?: string;
}

export function CtaButton({
  variant = "primary",
  size = "lg",
  className,
  text,
}: CtaButtonProps) {
  const buttonText = text ?? CTA_TEXT.primary;

  return (
    <Button
      asChild
      size={size}
      className={cn(
        "font-semibold text-base rounded-xl transition-all duration-200",
        variant === "primary" &&
          "bg-orange text-white hover:bg-orange-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        variant === "secondary" &&
          "bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white",
        size === "lg" && "px-8 py-6 text-lg",
        className
      )}
    >
      <a
        href={SITE.tallyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={buttonText}
      >
        {buttonText}
      </a>
    </Button>
  );
}
