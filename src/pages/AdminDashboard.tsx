import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { computeStage } from "@/utils/stageUtils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type Stage =
  | "prequalification_completed"
  | "contacted"
  | "document_pending"
  | "document_submitted"
  | "underwriting"
  | "pre_approval"
  | "closing";

const STAGE_ORDER: Stage[] = [
  "prequalification_completed",
  "contacted",
  "document_pending",
  "document_submitted",
  "underwriting",
  "pre_approval",
  "closing",
];

type AdminStatus = "pending" | "in-progress" | "done";

interface AdminApplication {
  id: string;
  user_id: string;
  email?: string | null;
  state?: string | null;
  loan_goal: string | null;
  status: string | null;
  created_at: string | null;
  property_value: number | null;
  credit_score: string | null;
  income?: number | null;
  monthly_debt?: number | null;
  down_payment?: number | null;
  dti_estimate?: number | null;
  employment_status?: string | null;
  property_type?: string | null;
  property_usage?: string | null;
  purchase_timeline?: string | null;
  current_loan_balance?: number | null;
  current_interest_rate?: number | null;
  cash_out_amount?: number | null;
  first_time_buyer?: boolean | null;
}

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

const getStageDeadlineDays = (stage: Stage): number => {
  switch (stage) {
    case "prequalification_completed":
      return 2;
    case "contacted":
      return 3;
    case "document_pending":
      return 5;
    case "document_submitted":
      return 7;
    case "underwriting":
      return 10;
    case "pre_approval":
      return 14;
    case "closing":
    default:
      return 21;
  }
};

const stageLabel = (stage: Stage) => stage.split("_").join(" ");

const getNextStage = (current: Stage): Stage => {
  const index = STAGE_ORDER.indexOf(current);
  if (index === -1 || index === STAGE_ORDER.length - 1) {
    return "closing";
  }
  return STAGE_ORDER[index + 1];
};

const getStageCompletionPercent = (stage: Stage): number => {
  const idx = STAGE_ORDER.indexOf(stage);
  if (idx <= 0) return 0;
  const max = STAGE_ORDER.length - 1;
  return Math.round((idx / max) * 100);
};

const formatNumber = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value)
    ? value.toLocaleString("en-US")
    : "N/A";

const formatPercent = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value.toFixed(1)}%`
    : "N/A";

const buildProfileQuality = (app: AdminApplication): "good" | "average" | "satisfactory" => {
  const credit = app.credit_score ? Number(app.credit_score) : NaN;
  const dti = app.dti_estimate ?? null;

  if (!Number.isNaN(credit) && credit >= 720 && typeof dti === "number" && dti <= 36) {
    return "good";
  }

  if (typeof dti === "number" && dti <= 45) {
    return "satisfactory";
  }

  return "average";
};

const buildHandlingPace = (
  stage: Stage,
  quality: "good" | "average" | "satisfactory",
): "fast" | "medium" | "low" => {
  if (stage === "underwriting" || stage === "pre_approval" || stage === "closing") {
    return "fast";
  }
  if (quality === "good" || quality === "satisfactory") {
    return "medium";
  }
  return "low";
};

const truncateToWordLimit = (text: string, maxWords: number): string => {
  const parts = text.split(/\s+/);
  if (parts.length <= maxWords) return text;
  return `${parts.slice(0, maxWords).join(" ")}…`;
};

const buildInsightText = (app: AdminApplication, stage: Stage): string => {
  const goal = app.loan_goal || "a mortgage";
  const state = app.state || "N/A";
  const value = formatNumber(app.property_value);
  const credit = app.credit_score || "N/A";
  const income = formatNumber(app.income ?? null);
  const monthlyDebt = formatNumber(app.monthly_debt ?? null);
  const dti = formatPercent(app.dti_estimate ?? null);
  const quality = buildProfileQuality(app);
  const pace = buildHandlingPace(stage, quality);

  const firstTime =
    typeof app.first_time_buyer === "boolean"
      ? app.first_time_buyer
        ? "They are a first-time buyer, which may warrant additional education and guidance."
        : "They are not a first-time buyer, suggesting some prior experience with mortgages."
      : "";

  const employment =
    app.employment_status === "self_employed"
      ? "Employment is self‑employed, so documentation depth will matter."
      : app.employment_status === "w2"
      ? "Employment is W‑2 based, which usually simplifies income verification."
      : app.employment_status
      ? `Employment is reported as ${app.employment_status}, so documentation should be checked carefully.`
      : "";

  const timeline = app.purchase_timeline
    ? ` The stated purchase timeline is ${app.purchase_timeline}, so expectations should be aligned with current processing capacity.`
    : "";

  const base = `The applicant applied for ${goal} purpose. The property is located in ${state} with a value of ${value}. Currently at ${stageLabel(stage)} stage, with credit score ${credit}, income ${income}, monthly debt ${monthlyDebt}, and estimated DTI ${dti}. The user profile is ${quality}. Hence, advised to handle at ${pace} pace. ${firstTime} ${employment}${timeline}`.trim();

  return truncateToWordLimit(base, 80);
};

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<AdminApplication[]>([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<{
    app: AdminApplication;
    stage: Stage;
    insight: string;
  } | null>(null);

  const isAdmin = useMemo(() => {
    const role =
      (user as any)?.app_metadata?.role ??
      (user as any)?.user_metadata?.role ??
      (user as any)?.role;
    return role === "admin";
  }, [user]);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setSelectedInsight(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const fetchApps = async () => {
    if (!user || !isAdmin) return;
    setTableLoading(true);
    const { data, error } = await supabase
      .from("mortgage_applications" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error loading applications for admin dashboard:",
        error.message,
        (error as any).details,
        (error as any).hint,
      );
      setApps([]);
    } else {
      const rows = (data ?? []) as unknown as AdminApplication[];
      setApps(rows);
    }
    setTableLoading(false);
  };

  useEffect(() => {
    void fetchApps();
  }, [isAdmin, user]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const channel = supabase
      .channel("mortgage-applications-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mortgage_applications" },
        () => {
          void fetchApps();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const handleStatusChange = async (app: AdminApplication, newStatus: AdminStatus) => {
    if (!user || !isAdmin) return;

    const createdAt = app.created_at ?? new Date().toISOString();
    const currentStage = computeStage(createdAt) as Stage;

    setUpdatingId(app.id);

    try {
      let payload: any = { status: newStatus };

      if (newStatus === "done") {
        const nextStage = getNextStage(currentStage);
        payload = { ...payload, stage: nextStage, status: "pending" };
      }

      const { error } = await supabase
        .from("mortgage_applications" as any)
        .update(payload)
        .eq("id", app.id);

      if (error) {
        console.error(
          "Error updating status from admin dashboard:",
          error.message,
          (error as any).details,
          (error as any).hint,
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (app: AdminApplication) => {
    if (!user || !isAdmin) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this application? This action cannot be undone.",
    );
    if (!confirmed) return;

    setUpdatingId(app.id);
    try {
      const { error } = await supabase
        .from("mortgage_applications" as any)
        .delete()
        .eq("id", app.id);

      if (error) {
        console.error(
          "Error deleting application:",
          error.message,
          (error as any).details,
          (error as any).hint,
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const metrics = useMemo(() => {
    if (!apps.length) {
      return {
        totalApplications: 0,
        pipelineValue: 0,
        activeUsers: 0,
      };
    }

    let pipelineValue = 0;
    let activeUsers = 0;

    const activeUserIds = new Set<string>();

    apps.forEach((app) => {
      if (typeof app.property_value === "number") {
        pipelineValue += app.property_value;
      }
      const createdAt = app.created_at ?? new Date().toISOString();
      const stage = computeStage(createdAt) as Stage;
      if (stage !== "closing") {
        activeUserIds.add(app.user_id);
      }
    });

    activeUsers = activeUserIds.size;

    return {
      totalApplications: apps.length,
      pipelineValue,
      activeUsers,
    };
  }, [apps]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);

  if (!user || !isAdmin) {
    return (
      <main className="relative min-h-screen">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-10 text-center">
            <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">
              Checking admin permissions. If you are not an admin, you will be redirected.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-3">
              <LayoutDashboard size={14} />
              Admin Control Panel
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Monitor the mortgage pipeline, track borrower progress, and manage application
              stages.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              onClick={() => void fetchApps()}
              disabled={tableLoading}
            >
              <RefreshCw size={14} className={tableLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Top summary cards */}
        <motion.div
          className="grid gap-4 sm:grid-cols-3 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="glass rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Applications
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {metrics.totalApplications}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
              <FileText size={18} className="text-accent" />
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pipeline Value
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {formatCurrency(metrics.pipelineValue)}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
              <DollarSign size={18} className="text-accent" />
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Active Users
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {metrics.activeUsers}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
              <Users size={18} className="text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="glass rounded-2xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={16} className="text-accent" />
              <h2 className="font-display text-sm font-semibold text-foreground">
                Application Pipeline
              </h2>
            </div>
            {tableLoading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 size={14} className="animate-spin text-accent" />
                Syncing…
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[980px]">
              <div className="px-6 py-3 grid grid-cols-[1.2fr,1.5fr,1.1fr,1.1fr,1.2fr,1fr,1.3fr,1.4fr,0.5fr] gap-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground border-b border-border/40">
                <span>User ID</span>
                <span>Email</span>
                <span>State</span>
                <span>Intent</span>
                <span>Current Stage</span>
                <span>Status</span>
                <span>Suggested Deadline</span>
                <span>Progress</span>
                <span className="text-right">Actions</span>
              </div>
              {tableLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 size={28} className="animate-spin text-accent" />
                </div>
              ) : apps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <AlertTriangle size={32} className="mb-3 text-amber-500" />
                  <p className="text-sm font-medium text-foreground">
                    No applications found in the system yet.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Once borrowers complete pre-qualification, their applications will appear here.
                  </p>
                </div>
              ) : (
                apps.map((app) => {
                  const createdAt = app.created_at ?? new Date().toISOString();
                  const stage = computeStage(createdAt) as Stage;
                  const completion = getStageCompletionPercent(stage);
                  const deadline = addDays(createdAt, getStageDeadlineDays(stage));
                  const status = (app.status as AdminStatus | null) ?? "pending";

                  const statusIcon =
                    stage === "closing" ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : stage === "underwriting" ? (
                      <Clock size={14} className="text-accent" />
                    ) : (
                      <AlertTriangle size={14} className="text-amber-500" />
                    );

                  const intentLabel =
                    app.loan_goal === "buying"
                      ? "Home Purchase"
                      : app.loan_goal === "refinancing"
                      ? "Refinance"
                      : app.loan_goal || "N/A";

                  return (
                    <div
                      key={app.id}
                      className="px-6 py-4 grid grid-cols-[1.2fr,1.5fr,1.1fr,1.1fr,1.2fr,1fr,1.3fr,1.4fr,0.5fr] gap-4 items-center border-b border-border/20 last:border-b-0 hover:bg-muted/40 transition-colors"
                    >
                      <div className="text-xs font-mono text-foreground truncate">
                        {app.user_id}
                      </div>
                      <div className="text-xs text-foreground truncate">
                        {app.email || "N/A"}
                      </div>
                      <div className="text-xs text-foreground truncate">
                        {app.state || "N/A"}
                      </div>
                      <div className="text-xs text-foreground truncate">
                        {intentLabel}
                      </div>
                      <div className="text-xs flex items-center gap-2 text-foreground">
                        {statusIcon}
                        <span className="capitalize">{stageLabel(stage)}</span>
                      </div>
                      <div>
                        <select
                          className="text-xs rounded-xl border border-border/60 bg-background px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-1 transition-shadow"
                          value={status}
                          onChange={(e) =>
                            void handleStatusChange(app, e.target.value as AdminStatus)
                          }
                          disabled={updatingId === app.id}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </div>
                      <div className="text-xs text-foreground">{deadline}</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-accent transition-all"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-muted-foreground w-10 text-right">
                          {completion}%
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => void handleDelete(app)}
                          disabled={updatingId === app.id}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Delete application"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>

        {/* AI insight cards */}
        {!tableLoading && apps.length > 0 && (
          <motion.div
            className="mt-8 space-y-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500" />
              AI Insights
            </h3>
            <div className="space-y-3">
              {apps.slice(0, 3).map((app) => {
                const createdAt = app.created_at ?? new Date().toISOString();
                const stage = computeStage(createdAt) as Stage;
                const insight = buildInsightText(app, stage);
                const completion = getStageCompletionPercent(stage);
                return (
                  <div
                    key={`insight-${app.id}`}
                    className="glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative"
                  >
                    <button
                      type="button"
                      aria-label="View full insight"
                      className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                      onClick={() => {
                        setSelectedInsight({ app, stage, insight });
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye size={14} />
                    </button>
                    <div className="flex items-start gap-3 pr-7">
                      <div className="mt-0.5">
                        <AlertTriangle size={16} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          User {app.user_id.slice(0, 6)} •{" "}
                          <span className="capitalize">{stageLabel(stage)}</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {insight}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:min-w-[140px]">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-10 text-right">
                        {completion}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        {isModalOpen && selectedInsight && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0" onClick={() => { setIsModalOpen(false); setSelectedInsight(null); }} />
            <motion.div
              className="relative z-50 w-full max-w-lg max-h-[80vh] glass-strong rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    User {selectedInsight.app.user_id.slice(0, 8)}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Stage: <span className="capitalize">{stageLabel(selectedInsight.stage)}</span> •{" "}
                    Status: {selectedInsight.app.status ?? "pending"}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedInsight(null);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedInsight.insight}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;

