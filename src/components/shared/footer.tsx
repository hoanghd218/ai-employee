import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-8 pb-20 md:pb-8 sm:px-6 text-center">
        <p className="font-heading text-lg font-bold text-white mb-2">
          {SITE.name}
        </p>
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
