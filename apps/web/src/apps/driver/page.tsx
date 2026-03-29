import { DriverDemandPulseHeatmap } from "@dashboard/components/features/driver/DriverDemandPulseHeatmap";

export function DriverDashboardHome() {
  return (
    <DriverDemandPulseHeatmap jobs={[]} demandCells={[]} shiftWindows={[]} />
  );
}
