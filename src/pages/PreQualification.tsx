import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Clock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const PreQualification = () => (
  <main className="relative min-h-screen">
    <div className="absolute inset-0 mesh-bg" />
    <div className="absolute inset-0 dot-pattern opacity-30" />
    <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div className="mb-10 text-center" initial="hidden" animate="visible" variants={fadeUp}>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
          <BrainCircuit size={14} />
          AI-Guided Process
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Start Your Mortgage Pre-Qualification
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Answer a few structured questions to receive your eligibility estimate.
        </p>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={{ hidden: fadeUp.hidden, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 } } }}>
        <div className="glass rounded-2xl shadow-xl overflow-hidden glow-primary">
          <div className="px-8 py-5 border-b border-border/30 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <BrainCircuit size={18} className="text-accent" />
              Pre-Qualification Assistant
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} />
              ~3-5 min
            </div>
          </div>
          <div className="p-8">
            <div className="flex h-96 items-center justify-center rounded-xl border border-dashed border-border/40 bg-muted/10">
              <p className="text-muted-foreground">Chatbot embed placeholder (Landbot)</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="mt-8 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        This process takes approximately 3–5 minutes. Your data is encrypted and secure.
      </motion.p>
    </div>
  </main>
);

export default PreQualification;
