import { z } from "zod";

const createSlotValidation = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z.string().default("available"),
  }),
});

export const slotValidation = {
  createSlotValidation,
};
