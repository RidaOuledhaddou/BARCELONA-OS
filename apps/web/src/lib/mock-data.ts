/**
 * Schema-aligned view types for dashboard UIs (royale_one 001–003).
 * Seed rows and loaders belong here later — intentionally no mock payloads.
 */

export type ModerationStatus =
  | "pending"
  | "visible"
  | "rejected"
  | "hidden";

export type SafetyReportKanbanItem = {
  id: string;
  type_id: string;
  type_code: string;
  type_label: string;
  description: string | null;
  latitude: number;
  longitude: number;
  moderation_status: ModerationStatus;
  user_id: string | null;
  created_at: string;
  pillar_extensions: Record<string, unknown>;
};

export type PlaceScoreTableRow = {
  place_id: string;
  place_name: string;
  dimension_id: string;
  dimension_code: string;
  dimension_label: string;
  score: number;
  rule_version: string | null;
  calculated_at: string;
  details: Record<string, unknown>;
};

export type RiskZoneMapItem = {
  id: string;
  area_geojson: unknown;
  risk_score: number;
  source: "official" | "crowd" | "inferred" | "blended";
};

export type JourneyComparisonOption = {
  id: string;
  mode: "metro" | "taxi" | "hybrid" | "walk";
  label: string;
  duration_min: number;
  cost_eur: number;
  risk_band: "low" | "medium" | "high";
  summary_bullets: string[];
};

export type DriverRow = {
  id: string;
  license_number: string | null;
  verified: boolean;
  status: "offline" | "online" | "busy" | "suspended";
};

export type DriverJobOffer = {
  id: string;
  pickup_label: string;
  pickup_zone: string;
  pickup_risk_band: "low" | "medium" | "high";
  eta_min: number;
  distance_km: number;
  estimated_earnings_eur: number;
};

export type DemandPulseCell = {
  id: string;
  inferred_score: number;
  label: string;
  time_window?: string;
};

export type ShiftTimelineWindow = {
  id: string;
  starts_at: string;
  ends_at: string;
  demand_index: number;
  label: string;
};

export type PlaceRow = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  price_level: number | null;
  is_active: boolean;
};
