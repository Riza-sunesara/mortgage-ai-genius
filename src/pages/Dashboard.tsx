import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { computeStage } from "@/utils/stageUtils";
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
import {
  LayoutDashboard, FileText, Clock, CheckCircle2, AlertTriangle,
  ArrowRight, Loader2, RefreshCw, Upload
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

interface Application {
  id: string;
  credit_score: string | null;
  loan_goal: string | null;
  status: string | null;
  created_at: string | null;
  property_value: number | null;
  down_payment: number | null;
  income: number | null;
  dti_estimate: number | null;
}

<<<<<<< HEAD
const getDeadline = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const StatusGuidance = ({ status }: { status: string }) => {
  if (status === "pending" || status === "Document Pending") {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-start gap-3">
          <Upload size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-display font-semibold text-foreground">Action Required</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Please upload your ID and Tax Returns. <strong>Deadline: {getDeadline()}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "Underwriting") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
        <div className="flex items-start gap-3">
          <Clock size={20} className="text-accent mt-0.5 shrink-0" />
          <div>
            <h4 className="font-display font-semibold text-foreground">Under Review</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Our team is verifying your data. Please contact us in 5 days for the next step.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (status === "Approved") {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-display font-semibold text-foreground">Congratulations!</h4>
            <p className="text-sm text-muted-foreground mt-1">Your application has been approved.</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
=======
const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const addDays = (iso: string, days: number) => {
  const base = new Date(iso);
  if (Number.isNaN(base.getTime())) return formatDate(new Date());
  base.setDate(base.getDate() + days);
  return formatDate(base);
};

const stageLabel = (stage: string) => stage.split("_").join(" ");

const getActionRequiredText = (params: {
  stage: string;
  created_at: string;
  loan_goal: string | null;
  credit_score: string | null;
  ref_id: string;
}) => {
  const { stage, created_at, loan_goal } = params;
  const goal =
    loan_goal === "refinancing" ? "refinance" : loan_goal === "buying" ? "purchase" : "mortgage";

  if (stage === "prequalification_completed") {
    const deadline = addDays(created_at, 2);
    return `Please upload your ID and Tax Returns. Deadline: ${deadline}`;
  }

  const deadlineDaysByStage: Record<string, number> = {
    contacted: 3,
    document_pending: 5,
    document_submitted: 7,
    underwriting: 10,
    pre_approval: 14,
    closing: 21,
  };

  const prepDeadline = addDays(
    created_at,
    deadlineDaysByStage[stage] ?? 7,
  );

  const baseTail = `Preparation deadline: ${prepDeadline}. A loan officer will contact you shortly to complete this stage.`;

  switch (stage) {
    case "contacted":
      return `Be ready to confirm your employment and income details and a rough estimate of assets/reserves for your ${goal}. ${baseTail}`;
    case "document_pending":
      return `Gather key financial items (recent pay stubs, recent bank statements, and any debt statements) so your file can move forward smoothly. ${baseTail}`;
    case "document_submitted":
      return `Review what you submitted for accuracy and be ready to clarify any recent deposits, job changes, or large liabilities if asked. ${baseTail}`;
    case "underwriting":
      return `Prepare to answer follow-up questions quickly and provide explanations for any credit inquiries, gaps in employment, or unusual deposits. ${baseTail}`;
    case "pre_approval":
      return `Confirm your target price range and down-payment plan, and be ready to provide updated income/asset snapshots if anything changed. ${baseTail}`;
    case "closing":
      return `Plan for final funds needed (cash to close), keep credit and job status stable, and be ready to review closing disclosures before signing. ${baseTail}`;
    default:
      return `Prepare any outstanding details that could help finalize your ${goal} file. ${baseTail}`;
  }
};

const StatusGuidance = ({
  stage,
  created_at,
  loan_goal,
  credit_score,
  ref_id,
}: {
  stage: string;
  created_at: string;
  loan_goal: string | null;
  credit_score: string | null;
  ref_id: string;
}) => {
  const actionText = getActionRequiredText({
    stage,
    created_at,
    loan_goal,
    credit_score,
    ref_id,
  });

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
      <div className="flex items-start gap-3">
        <Upload size={20} className="text-amber-500 mt-0.5 shrink-0" />
        <div>
          <h4 className="font-display font-semibold text-foreground">Action Required</h4>
          <p className="text-sm text-muted-foreground mt-1">{actionText}</p>
        </div>
      </div>
    </div>
  );
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
};

const Dashboard = () => {
  const { user } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("mortgage_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setApps((data as Application[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, [user]);

  const statusIcon = (s: string | null) => {
<<<<<<< HEAD
    if (s === "Approved") return <CheckCircle2 size={16} className="text-green-500" />;
    if (s === "Underwriting") return <Clock size={16} className="text-accent" />;
=======
    if (s === "closing") return <CheckCircle2 size={16} className="text-green-500" />;
    if (s === "underwriting") return <Clock size={16} className="text-accent" />;
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
    return <AlertTriangle size={16} className="text-amber-500" />;
  };

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div className="mb-10" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-4">
            <LayoutDashboard size={14} />
            Application Dashboard
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Your Applications
          </h1>
          <p className="mt-2 text-muted-foreground">Track your mortgage applications and next steps.</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="text-accent animate-spin" />
          </div>
        ) : apps.length === 0 ? (
          <motion.div className="glass rounded-2xl p-12 text-center" initial="hidden" animate="visible" variants={fadeUp}>
            <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-6">Start a pre-qualification assessment to get started.</p>
            <Button asChild className="gradient-accent text-accent-foreground rounded-xl">
              <Link to="/pre-qualification">
                Start Assessment <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {apps.map((app, i) => (
              <motion.div
                key={app.id}
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
<<<<<<< HEAD
                <div className="px-6 py-5 border-b border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {statusIcon(app.status)}
                    <h3 className="font-display font-semibold text-foreground">
                      {app.loan_goal === "buying" ? "Home Purchase" : "Refinance"} Application
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {app.created_at ? new Date(app.created_at).toLocaleDateString() : ""}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{app.status || "Pending"}</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Credit Score</p>
                      <p className="text-sm font-semibold text-foreground">{app.credit_score || "N/A"}</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Goal</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{app.loan_goal || "N/A"}</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ref ID</p>
                      <p className="text-sm font-semibold text-foreground font-mono">#{app.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                  </div>
                  <StatusGuidance status={app.status || "pending"} />
                </div>
=======
                {(() => {
                  const createdAt = app.created_at ?? new Date().toISOString();
                  const stage = computeStage(createdAt);
                  const refId = `#${app.id.slice(0, 8).toUpperCase()}`;
                  return (
                    <>
                      <div className="px-6 py-5 border-b border-border/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {statusIcon(stage)}
                          <h3 className="font-display font-semibold text-foreground">
                            {app.loan_goal === "buying" ? "Home Purchase" : "Refinance"} Application
                          </h3>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="rounded-xl bg-muted/50 p-3">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Stage</p>
                            <p className="text-sm font-semibold text-foreground capitalize">{stageLabel(stage)}</p>
                          </div>
                          <div className="rounded-xl bg-muted/50 p-3">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Credit Score</p>
                            <p className="text-sm font-semibold text-foreground">{app.credit_score || "N/A"}</p>
                          </div>
                          <div className="rounded-xl bg-muted/50 p-3">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Goal</p>
                            <p className="text-sm font-semibold text-foreground capitalize">{app.loan_goal || "N/A"}</p>
                          </div>
                          <div className="rounded-xl bg-muted/50 p-3">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ref ID</p>
                            <p className="text-sm font-semibold text-foreground font-mono">{refId}</p>
                          </div>
                        </div>
                        <StatusGuidance
                          stage={stage}
                          created_at={createdAt}
                          loan_goal={app.loan_goal}
                          credit_score={app.credit_score}
                          ref_id={refId}
                        />
                      </div>
                    </>
                  );
                })()}
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
              </motion.div>
            ))}
            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={fetchApps} className="gap-2 rounded-xl" id="dashboard-refresh-btn">
                <RefreshCw size={14} /> Refresh
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
