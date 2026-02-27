import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-border/40">
    <div className="absolute inset-0 mesh-bg opacity-50" />
    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-lg font-bold font-display">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-accent">
              <Zap size={14} className="text-accent-foreground" />
            </div>
            <span className="text-foreground">Mortgage</span>
            <span className="text-accent">AI</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            AI-powered mortgage pre-qualification for the modern homebuyer.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground">Legal</h4>
          <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Disclaimer</a>
        </div>

        {/* Links 2 */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground">Product</h4>
          <Link to="/calculator" className="text-sm text-muted-foreground hover:text-accent transition-colors">Calculator</Link>
          <Link to="/pre-qualification" className="text-sm text-muted-foreground hover:text-accent transition-colors">Pre-Qualification</Link>
          <Link to="/#faq" className="text-sm text-muted-foreground hover:text-accent transition-colors">FAQ</Link>
        </div>
      </div>

      <div className="mt-12 border-t border-border/40 pt-8">
        <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
          This platform provides estimated mortgage insights and does not constitute financial approval. 
          All calculations are for informational purposes only. © {new Date().getFullYear()} MortgageAI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
