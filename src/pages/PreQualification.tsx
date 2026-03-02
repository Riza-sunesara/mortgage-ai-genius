import { useState, useEffect, useRef } from "react";
import { BrainCircuit, Clock, CheckCircle2, Loader2, ArrowRight, Home, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
=======
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { purchaseFlow, refinanceFlow, ChatFlowStep } from "@/utils/chatFlow";
import AuthModal from "@/components/AuthModal";
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

interface ChatEntry {
  id: number;
<<<<<<< HEAD
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
=======
  type: "bot" | "user" | "result";
  text?: string;
}

type LoanGoal = "buying" | "refinancing";

type ConversationPhase = "loan_goal" | "flow" | "done";

interface PrequalificationAnswers {
  loan_goal: LoanGoal | "";
  state?: string;
  property_value?: number;
  income?: number;
  monthly_debt?: number;
  credit_score?: number;
  current_loan_balance?: number;
  current_interest_rate?: number;
  cash_out_amount?: number;
  purchase_timeline?: string;
  employment_status?: string;
  down_payment?: string;
  property_type?: string;
  property_usage?: string;
  first_time_buyer?: boolean;
  dti_estimate?: number;
}

const PreQualification = () => {
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [conversationPhase, setConversationPhase] =
    useState<ConversationPhase>("loan_goal");
  const [activeFlow, setActiveFlow] = useState<ChatFlowStep[] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<PrequalificationAnswers>({
    loan_goal: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [expertInsight, setExpertInsight] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, analyzing]);

  // Start the conversation
  useEffect(() => {
    if (initialized.current) return;
<<<<<<< HEAD
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
=======

    // Wait for auth to resolve before showing auth UI
    if (loading) return;

    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const checkExistingApplication = async () => {
      const { data: existingApp, error: existingError } = await supabase
        .from("mortgage_applications")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingError) {
        console.error(
          "Error checking existing application:",
          (existingError as any).message ?? existingError,
          (existingError as any).details,
          (existingError as any).hint,
        );
      }

      if (existingApp) {
        navigate("/dashboard");
        return;
      }

      initialized.current = true;
      setAuthModalOpen(false);

      const timeout = setTimeout(() => {
        setEntries([
          {
            id: 1,
            type: "bot",
            text: "Welcome! I'll guide you through a quick pre-qualification assessment. This takes about 3–5 minutes.",
          },
        ]);
        setTimeout(() => {
          setEntries((prev) => [
            ...prev,
            {
              id: 2,
              type: "bot",
              text: "Great to have you here. What is your primary goal today?",
            },
          ]);
          setConversationPhase("loan_goal");
        }, 800);
      }, 400);
    };

    void checkExistingApplication();
  }, [user, loading, navigate]);

  const computeDti = (updated: PrequalificationAnswers) => {
    if (
      typeof updated.income === "number" &&
      updated.income > 0 &&
      typeof updated.monthly_debt === "number"
    ) {
      const dti =
        (updated.monthly_debt / (updated.income / 12)) * 100;
      return Number.isFinite(dti) ? dti : undefined;
    }
    return undefined;
  };

  const downPaymentToNumber = (value: unknown): number | null => {
    if (typeof value !== "string") return null;
    const v = value.trim();
    if (!v) return null;
    if (v === "<5%") return 3;
    if (v === "5-10%") return 7.5;
    if (v === "10-20%") return 15;
    if (v === ">20%") return 20;
    const numeric = Number(v.replace("%", ""));
    return Number.isFinite(numeric) ? numeric : null;
  };



  const handleLoanGoalSelect = (label: string, value: LoanGoal) => {
    if (finished || analyzing) return;

    setValidationError(null);

    setEntries((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: label },
    ]);

    const selectedFlow = value === "buying" ? purchaseFlow : refinanceFlow;

    setAnswers((prev) => ({
      ...prev,
      loan_goal: value,
    }));
    setActiveFlow(selectedFlow);
    setCurrentStepIndex(0);
    setConversationPhase("flow");

    if (selectedFlow.length > 0) {
      const firstStep = selectedFlow[0];
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            text: firstStep.question,
          },
        ]);
      }, 400);
    }
  };

  const handleFlowAnswer = async (
    step: ChatFlowStep,
    rawValue: string,
    label?: string,
  ) => {
    if (finished || analyzing || !activeFlow) return;

    let storedValue: string | number | boolean | null = rawValue;

    if (step.type === "number") {
      const numeric = Number(rawValue);
      if (
        Number.isNaN(numeric) ||
        (typeof step.min === "number" && numeric < step.min) ||
        (typeof step.max === "number" && numeric > step.max)
      ) {
        setValidationError(
          `Please enter a valid value between ${step.min} and ${step.max}.`,
        );
        return;
      }
      storedValue = numeric;
    }

    if (step.key === "first_time_buyer") {
      storedValue = rawValue === "yes" || String(rawValue).toLowerCase() === "true";
    }

    setValidationError(null);

    const userDisplayText = label ?? rawValue;

    setEntries((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: userDisplayText },
    ]);

    setAnalyzing(true);

    const updatedAnswers = {
      ...answers,
      [step.key]: storedValue,
    };

    const dti = computeDti(updatedAnswers as PrequalificationAnswers);
    if (typeof dti === "number") {
      updatedAnswers.dti_estimate = dti;
    }

    setAnswers(updatedAnswers as PrequalificationAnswers);

    const nextIndex = currentStepIndex + 1;

    if (nextIndex < activeFlow.length) {
      const nextStep = activeFlow[nextIndex];
      setCurrentStepIndex(nextIndex);
      setTimeout(() => {
        setEntries((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "bot",
            text: nextStep.question,
          },
        ]);
      }, 400);
      setInputValue("");
      setAnalyzing(false);
      return;
    }

    try {
      if (!user) {
        setValidationError("Authentication required. Could not save application.");
        return;
      }
      if (!user.email) {
        setValidationError("Your account is missing an email. Please re-login and try again.");
        return;
      }

      // Use the latest answers snapshot for final insert
      const finalAnswers = updatedAnswers as PrequalificationAnswers;

      const finalDti =
        typeof finalAnswers.dti_estimate === "number"
          ? finalAnswers.dti_estimate
          : computeDti(finalAnswers);

      // Schema-safe payload (matches generated Supabase types) and still includes identity.
      // If your DB has extra columns (email/state/etc), we attempt a richer payload first and fall back.
      const basePayload: any = {
        user_id: user.id,
        loan_goal: finalAnswers.loan_goal,
        property_value: finalAnswers.property_value ?? null,
        income: finalAnswers.income ?? null,
        monthly_debt: finalAnswers.monthly_debt ?? null,
        dti_estimate: typeof finalDti === "number" ? finalDti : null,
        credit_score:
          typeof finalAnswers.credit_score === "number"
            ? String(finalAnswers.credit_score)
            : null,
        down_payment: downPaymentToNumber(finalAnswers.down_payment),
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const richPayload: any = {
        ...basePayload,
        email: user.email, // if column exists
        state: finalAnswers.state ?? null, // if column exists
        current_loan_balance: finalAnswers.current_loan_balance ?? null,
        current_interest_rate: finalAnswers.current_interest_rate ?? null,
        cash_out_amount: finalAnswers.cash_out_amount ?? null,
        purchase_timeline: finalAnswers.purchase_timeline ?? null,
        employment_status: finalAnswers.employment_status ?? null,
        property_type: finalAnswers.property_type ?? null,
        property_usage: finalAnswers.property_usage ?? null,
        first_time_buyer:
          typeof finalAnswers.first_time_buyer === "boolean"
            ? finalAnswers.first_time_buyer
            : null,
        stage: "prequalification_completed",
      };

      const attemptInsert = async (payloadToInsert: any) => {
        return await supabase.from("mortgage_applications").insert(payloadToInsert);
      };

      let insertResult = await attemptInsert(richPayload);

      // If the backend rejects unknown columns, retry with base payload.
      if (insertResult.error && typeof insertResult.error.message === "string") {
        const msg = insertResult.error.message.toLowerCase();
        if (msg.includes("column") && msg.includes("does not exist")) {
          console.error(
            "Insert rejected due to schema mismatch. Retrying with base payload.",
            insertResult.error.message,
            (insertResult.error as any).details,
            (insertResult.error as any).hint,
          );
          insertResult = await attemptInsert(basePayload);
        }
      }

      const { error: insertError, status } = insertResult as any;

      if (insertError) {
        console.error(
          insertError.message,
          (insertError as any).details,
          (insertError as any).hint,
        );
        setValidationError("Application could not be saved. Please try again.");
        return;
      }

      const profileSummary = `
Borrower profile:
- Loan goal: ${finalAnswers.loan_goal}
- State: ${finalAnswers.state ?? "N/A"}
- Property value: ${finalAnswers.property_value ?? "N/A"}
- Income: ${finalAnswers.income ?? "N/A"}
- Monthly debt: ${finalAnswers.monthly_debt ?? "N/A"}
- Credit score: ${finalAnswers.credit_score ?? "N/A"}
- Down payment: ${finalAnswers.down_payment ?? "N/A"}
- Employment: ${finalAnswers.employment_status ?? "N/A"}
- Property type: ${finalAnswers.property_type ?? "N/A"}
- Property usage: ${finalAnswers.property_usage ?? "N/A"}
- First-time buyer: ${typeof finalAnswers.first_time_buyer === "boolean"
          ? finalAnswers.first_time_buyer
            ? "Yes"
            : "No"
          : "N/A"
        }
- Estimated DTI: ${typeof finalDti === "number" ? `${finalDti.toFixed(1)}%` : "N/A"
        }`;

      let generatedInsight =
        "Overall, your profile shows promising mortgage potential. Our team will review your information and follow up with tailored options for you.";

      if (status === 201) {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: `Using the following borrower profile data, write a single, professional 'Expert Insight' in 50 to 80 words that highlights how the user's profile stands out (for example, credit strength, debt-to-income ratio, or down payment readiness). The tone should be encouraging, confident, and naturally flow as a final remark at the end of a chat. Do not ask follow-up questions.\n\n${profileSummary}`,
            }),
          });

          const data: { reply?: string; error?: string } =
            await response.json().catch(() => ({}));

          if (data.reply) {
            generatedInsight = data.reply;
          } else if (data.error) {
            console.error("Gemini insight error:", data.error);
          }
        } catch (error) {
          console.error("Error calling Gemini for insight:", error);
        }
      }

      setExpertInsight(generatedInsight);

      setFinished(true);
      setConversationPhase("done");
      setEntries([
        { id: Date.now(), type: "bot", text: generatedInsight || "Analysis complete." },
        { id: Date.now() + 1, type: "result" },
      ]);

      // Redirect after successful completion so dashboard reflects the new record.
      if (status === 201) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 900);
      }
    } finally {
      setAnalyzing(false);
      setInputValue("");
    }
  };

  const renderInput = () => {
    if (finished || conversationPhase === "done") {
      return null;
    }



    if (conversationPhase === "loan_goal") {
      return (
        <div className="mt-4 flex flex-wrap gap-2 pl-11">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleLoanGoalSelect("Buying a Home", "buying")
            }
            className="rounded-xl border-accent/40 text-accent hover:gradient-accent hover:text-accent-foreground hover:border-transparent transition-all duration-200"
          >
            Buying a Home
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleLoanGoalSelect("Refinancing", "refinancing")
            }
            className="rounded-xl border-accent/40 text-accent hover:gradient-accent hover:text-accent-foreground hover:border-transparent transition-all duration-200"
          >
            Refinancing
          </Button>
        </div>
      );
    }

    if (conversationPhase === "flow" && activeFlow) {
      const step = activeFlow[currentStepIndex];

      if (!step) return null;

      switch (step.type) {
        case "options":
          return (
            <div className="mt-4 flex flex-wrap gap-2 pl-11">
              {step.options?.map((opt) => (
                <Button
                  key={opt.value}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    void handleFlowAnswer(step, opt.value, opt.label)
                  }
                  className="rounded-xl border-accent/40 text-accent hover:gradient-accent hover:text-accent-foreground hover:border-transparent transition-all duration-200"
                >
                  {opt.label}
                </Button>
              ))}
              {validationError && (
                <p className="w-full text-xs text-destructive mt-1">
                  {validationError}
                </p>
              )}
            </div>
          );
        case "text":
        case "number":
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleFlowAnswer(step, inputValue);
              }}
              className="mt-4 flex flex-col gap-2 pl-11"
            >
              <div className="flex gap-2">
                <Input
                  type={step.type === "number" ? "number" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  min={step.type === "number" ? step.min : undefined}
                  max={step.type === "number" ? step.max : undefined}
                  className="flex-1 bg-muted/30 border-border/40 text-sm rounded-xl"
                />
                <Button
                  type="submit"
                  className="rounded-xl gradient-accent text-accent-foreground"
                >
                  Continue
                </Button>
              </div>
              {validationError && (
                <p className="text-xs text-destructive">{validationError}</p>
              )}
            </form>
          );
        default:
          return null;
      }
    }

    return null;
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
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

<<<<<<< HEAD
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

=======
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
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
<<<<<<< HEAD
=======

>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
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
<<<<<<< HEAD
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
=======
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
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

<<<<<<< HEAD
=======
              {renderInput()}

>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
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
<<<<<<< HEAD
=======

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
    </main>
  );
};

export default PreQualification;
