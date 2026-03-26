import { z } from "zod";

export const DispatchJobSchema = z.object({
  id: z.string(),
  passengerName: z.string(),
  pickupZone: z.string(),
  destinationZone: z.string(),
  priority: z.enum(["standard", "priority", "vip"]),
  etaMinutes: z.number().int().nonnegative(),
  createdAt: z.string(),
});

export type DispatchJob = z.infer<typeof DispatchJobSchema>;

export const HotelCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  district: z.string(),
  occupancy: z.number().min(0).max(100),
  averageNightlyRate: z.number().nonnegative(),
});

export type HotelCard = z.infer<typeof HotelCardSchema>;
