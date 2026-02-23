import { SITE } from "@/lib/constants";
import { CtaButton } from "./cta-button";

export function Navbar() {
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-40 w-full border-b border-border/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="font-heading text-xl font-bold text-navy">
          {SITE.name}
        </a>
        <CtaButton
          size="default"
          text="Đăng Ký Ngay"
          className="hidden md:inline-flex text-sm px-5 py-2"
        />
      </div>
    </nav>
  );
}
