import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default:false },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    offers: [
      {
        offers: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const service = model<TService>("Service", serviceSchema);

