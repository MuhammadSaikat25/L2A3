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

// const getCustomer = await Users.findOne({ email: customerEmail });
// const BookingData = { ...bookingData, customer: getCustomer?._id };
// let result = await Booking.create(BookingData);
// const getBooking=service.find()
// console.log(getBooking)

// console.log(getBooking)
// let newResult = await (await result.populate("serviceId")).populate("slotId");

// const bookingAllData = {
//   service:{
//     _id:newResult.serviceId._id,
//     name:newResult.serviceId.name
//   },
//   customer: getCustomer,
// };
// console.log(bookingAllData)
// return bookingAllData;
