import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const service = model<TService>("Service", serviceSchema);
