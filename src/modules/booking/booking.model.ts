import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

export const VehicleType = {
  Car: "car",
  Truck: "truck",
  SUV: "SUV",
  Van: "van",
  Motorcycle: "motorcycle",
  Bus: "bus",
  ElectricVehicle: "electricVehicle",
  HybridVehicle: "hybridVehicle",
  Bicycle: "bicycle",
  Tractor: "tractor",
};
const bookingSchema = new Schema<TBooking>({
  customer: { type: Schema.Types.ObjectId, ref: "User" },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  slotId: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  manufacturingYear: { type: Number, required: true },
  registrationPlate: { type: String, required: true, unique: true },
  vehicleBrand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleType: {
    type: String,
    enum: Object.values(VehicleType),
    required: true,
  },
});

export const Booking = model<TBooking>("Booking", bookingSchema);
