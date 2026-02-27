import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const ApplicationSubmitted = () => {
  const refId = `#MRT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <motion.div
        className="relative w-full max-w-lg"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-2xl shadow-2xl glow-accent overflow-hidden">
          {/* Success gradient strip */}
          <div className="h-1.5 gradient-accent" />

          <div className="flex flex-col items-center p-10 text-center">
            <motion.div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-accent shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 size={40} className="text-accent-foreground" />
            </motion.div>

            <h1 className="font-display text-2xl font-bold text-foreground">Application Submitted Successfully</h1>

            <div className="mt-4 inline-flex items-center rounded-lg bg-muted/50 px-4 py-2">
              <span className="font-mono text-sm text-muted-foreground">Reference ID: {refId}</span>
            </div>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our team will review your submission and contact you shortly.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="flex-1 h-12 rounded-xl">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-1" />
                  Return Home
                </Link>
              </Button>
              <Button asChild className="flex-1 h-12 gradient-accent text-accent-foreground rounded-xl hover:brightness-110 transition-all">
                <Link to="/calculator">
                  <Calculator size={16} className="mr-1" />
                  Recalculate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ApplicationSubmitted;
