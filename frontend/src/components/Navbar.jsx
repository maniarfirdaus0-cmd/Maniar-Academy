import { useEffect, useState } from "react";

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accentViolet/10 bg-charcoal/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#hero"
          onClick={closeMenu}
          className="group flex min-w-0 shrink items-center gap-2 text-white transition-all"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accentViolet to-violet-600 shadow-md shadow-accentViolet/20 sm:h-9.5 sm:w-9.5">
            <span className="text-sm font-bold text-white">MA</span>
          </div>
          <span className="truncate text-base font-bold tracking-tight sm:text-lg">
            Maniar{" "}
            <span className="text-accentViolet-light font-medium">Academy</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navLinks.map(({ label, href }) => (
            <li key={href} className="group relative">
              <a
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 w-0 bg-accentViolet transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 p-2 text-slate-300 transition-colors hover:border-accentViolet/30 hover:text-white lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMenuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav-menu"
        className={`overflow-hidden border-accentViolet/10 bg-charcoal/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "max-h-80 border-b opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
