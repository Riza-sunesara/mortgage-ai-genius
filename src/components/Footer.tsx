import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <Link to="/" className="text-lg font-bold text-primary">
          Mortgage<span className="text-accent">AI</span>
        </Link>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Disclaimer</a>
        </div>
        <p className="max-w-xl text-xs text-muted-foreground">
          This platform provides estimated mortgage insights and does not constitute financial approval. 
          All calculations are for informational purposes only.
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MortgageAI. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
