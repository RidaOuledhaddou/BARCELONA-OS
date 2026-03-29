import type {
  ModerationStatus,
  SafetyReportKanbanItem,
} from "@dashboard/lib/mock-data";

export const MODERATION_LANES: ModerationStatus[] = [
  "pending",
  "visible",
  "rejected",
  "hidden",
];

export function groupReportsByModerationStatus(
  items: SafetyReportKanbanItem[],
): Record<ModerationStatus, SafetyReportKanbanItem[]> {
  const init: Record<ModerationStatus, SafetyReportKanbanItem[]> = {
    pending: [],
    visible: [],
    rejected: [],
    hidden: [],
  };
  for (const row of items) {
    init[row.moderation_status].push(row);
  }
  return init;
}
