import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Calculator", href: "/calculator" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight font-display">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
            <Zap size={16} className="text-accent-foreground" />
          </div>
          <span className="text-foreground">Mortgage</span>
          <span className="text-accent">AI</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/10 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="ml-4 gradient-accent text-accent-foreground shadow-md hover:shadow-lg hover:brightness-110 transition-all" id="start-assessment-btn">
            <Link to="/pre-qualification">Start Assessment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="rounded-lg p-2 hover:bg-muted md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-card/95 backdrop-blur-xl px-4 pb-4 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block rounded-lg py-3 px-3 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="mt-3 w-full gradient-accent text-accent-foreground">
            <Link to="/pre-qualification" onClick={() => setMobileOpen(false)}>Start Assessment</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
