const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onAdminClick }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accentViolet/10 bg-charcoal/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
        
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-2.5 text-white transition-all">
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-gradient-to-br from-accentViolet to-violet-600 shadow-md shadow-accentViolet/20">
            <span className="text-sm font-bold text-white">MA</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Maniar <span className="text-accentViolet-light font-medium">Academy</span>
          </span>
        </a>

        {/* Links */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ label, href }) => (
            <li key={href} className="group relative">
              <a
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {label}
                {/* Underline Slide Transition */}
                <span className="absolute left-4 right-4 bottom-0 h-0.5 w-0 bg-accentViolet transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}