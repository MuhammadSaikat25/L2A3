import { z } from "zod";

// ! validation for create a new services
const createServiceValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().default(false).optional(),
    image: z.string(),
    offers: z
      .array(
        z.object({
          offers: z.string(),
        })
      )
      .optional(),
  }),
});

export default createServiceValidation;

// ! validation for update a services
const updateServiceValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    isDeleted: z.boolean().optional(),
    image: z.string().optional(),
    offers: z
      .array(
        z.object({
          offers: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const serviceValidation = {
  createServiceValidation,
  updateServiceValidation,
};
