import { useState, useEffect, useRef } from "react";
import { BrainCircuit, Clock, CheckCircle2, Loader2, ArrowRight, Home, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

interface ChatEntry {
  id: number;
  type: "bot" | "user" | "options" | "loading" | "result";
  text?: string;
  options?: { label: string; value: string }[];
}

const STEPS = [
  {
    question: "What is your estimated credit score?",
    options: [
      { label: "720+ Excellent", value: "excellent" },
      { label: "680–719 Good", value: "good" },
      { label: "Below 680", value: "below" },
    ],
  },
  {
    question: "What is your primary goal?",
    options: [
      { label: "Buying a Home", value: "buying" },
      { label: "Refinancing", value: "refinancing" },
    ],
  },
];

const PreQualification = () => {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, analyzing]);

  // Start the conversation
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const timeout = setTimeout(() => {
      setEntries([
        { id: 1, type: "bot", text: "Welcome! I'll guide you through a quick pre-qualification assessment. This takes about 3–5 minutes." },
      ]);
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          { id: 2, type: "bot", text: STEPS[0].question },
          { id: 3, type: "options", options: STEPS[0].options },
        ]);
      }, 800);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  const handleSelect = async (label: string, value: string) => {
    if (finished || analyzing) return;

    const newAnswers = { ...answers };
    if (step === 0) newAnswers.credit_score = value;
    if (step === 1) newAnswers.loan_goal = value;
    setAnswers(newAnswers);

    // Remove options entry, add user answer
    setEntries((prev) => [
      ...prev.filter((e) => e.type !== "options"),
      { id: Date.now(), type: "user", text: label },
    ]);

    const nextStep = step + 1;

    if (nextStep < STEPS.length) {
      setStep(nextStep);
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          { id: Date.now() + 1, type: "bot", text: STEPS[nextStep].question },
          { id: Date.now() + 2, type: "options", options: STEPS[nextStep].options },
        ]);
      }, 600);
    } else {
      // Final step — analyze and save
      setAnalyzing(true);
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          { id: Date.now() + 1, type: "bot", text: "Analyzing your profile..." },
        ]);
      }, 400);

      // Save to Supabase
      if (user) {
        await supabase.from("mortgage_applications").insert({
          user_id: user.id,
          credit_score: newAnswers.credit_score,
          loan_goal: newAnswers.loan_goal,
          status: "pending",
        });
      }

      setTimeout(() => {
        setAnalyzing(false);
        setFinished(true);
        setEntries((prev) => [
          ...prev.filter((e) => e.text !== "Analyzing your profile..."),
          { id: Date.now() + 2, type: "result" },
        ]);
      }, 2500);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setFinished(false);
    setAnalyzing(false);
    setAnswers({});
    initialized.current = false;
    setEntries([]);
    setTimeout(() => {
      initialized.current = true;
      setEntries([
        { id: 1, type: "bot", text: "Welcome! I'll guide you through a quick pre-qualification assessment. This takes about 3–5 minutes." },
      ]);
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          { id: 2, type: "bot", text: STEPS[0].question },
          { id: 3, type: "options", options: STEPS[0].options },
        ]);
      }, 800);
    }, 300);
  };

  const refId = `#AUTO-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
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
            {/* Header */}
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

            {/* Chat area */}
            <div className="p-6 sm:p-8 min-h-[420px] max-h-[520px] overflow-y-auto space-y-4">
              <AnimatePresence mode="popLayout">
                {entries.map((entry) => {
                  if (entry.type === "bot") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3 max-w-[85%]">
                          <div className="mt-1 w-8 h-8 rounded-full gradient-accent flex items-center justify-center shrink-0">
                            <BrainCircuit size={14} className="text-accent-foreground" />
                          </div>
                          <div className="bg-muted/50 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-foreground leading-relaxed">
                            {entry.text}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  if (entry.type === "user") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-end"
                      >
                        <div className="gradient-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 text-sm max-w-[75%]">
                          {entry.text}
                        </div>
                      </motion.div>
                    );
                  }

                  if (entry.type === "options") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex flex-wrap gap-2 pl-11"
                      >
                        {entry.options?.map((opt) => (
                          <Button
                            key={opt.value}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSelect(opt.label, opt.value)}
                            className="rounded-xl border-accent/40 text-accent hover:gradient-accent hover:text-accent-foreground hover:border-transparent transition-all duration-200"
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </motion.div>
                    );
                  }

                  if (entry.type === "result") {
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="pl-11"
                      >
                        <div className="glass-strong rounded-2xl p-6 glow-accent">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                              <CheckCircle2 size={22} className="text-accent" />
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-foreground">Pre-Qualification Complete!</h4>
                              <p className="text-xs text-muted-foreground">Reference ID: {refId}</p>
                            </div>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed mb-5">
                            Based on your inputs, you are a <strong className="text-accent">strong candidate</strong> for a 30-year fixed-rate mortgage! Our team will review your submission and contact you shortly.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              id="prequal-view-dashboard-btn"
                              className="rounded-xl gradient-accent text-accent-foreground gap-1.5"
                              onClick={() => navigate("/dashboard")}
                            >
                              <ArrowRight size={14} /> View Dashboard
                            </Button>
                            <Button
                              id="prequal-return-home-btn"
                              variant="outline"
                              className="rounded-xl gap-1.5"
                              onClick={() => navigate("/")}
                            >
                              <Home size={14} /> Return Home
                            </Button>
                            <Button
                              id="prequal-restart-btn"
                              variant="outline"
                              className="rounded-xl gap-1.5"
                              onClick={handleRestart}
                            >
                              <RefreshCw size={14} /> Restart
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return null;
                })}
              </AnimatePresence>

              {analyzing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full gradient-accent flex items-center justify-center shrink-0">
                      <BrainCircuit size={14} className="text-accent-foreground" />
                    </div>
                    <div className="bg-muted/50 rounded-2xl rounded-tl-md px-5 py-4 flex items-center gap-3">
                      <Loader2 size={18} className="text-accent animate-spin" />
                      <span className="text-sm text-muted-foreground">Analyzing your profile...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
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
};

export default PreQualification;
