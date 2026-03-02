export function computeStage(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(created.getTime())) {
    return "prequalification_completed";
  }

  const diffMs = now.getTime() - created.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Stages in order:
  // prequalification_completed → contacted → document_pending → document_submitted
  // → underwriting → pre_approval → closing
  if (diffDays <= 2) return "prequalification_completed";
  if (diffDays <= 4) return "contacted";
  if (diffDays <= 7) return "document_pending";
  if (diffDays <= 14) return "document_submitted";
  if (diffDays <= 21) return "underwriting";
  if (diffDays <= 45) return "pre_approval";

  return "closing";
}

