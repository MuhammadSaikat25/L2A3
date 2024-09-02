import { Schema, model } from "mongoose";


const bookingSchema = new Schema(
  {
    customer:{ type: Schema.Types.ObjectId, ref: "User" },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    slotId: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
  },
  {
    timestamps: true,
  }
);

export const Booking = model("Booking", bookingSchema);
