import { slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

const postBookingInToDb = async (userInfo: any, playLoad: any) => {
  const playLoadCopy = { ...playLoad };
  const customer = userInfo;
  const bookingData = {
    customer,
    serviceId: playLoadCopy.serviceId,
    slotId: playLoadCopy.slotId,
  };

  const postData = await Booking.create(bookingData);
  await slot.updateMany(
    { _id: { $in: playLoad.slotId } },
    { $set: { isBooked: "booked" } },
    { multi: true }
  );

  return postData;
};
// ! get all booking by admin
const getAllBooking = async () => {
  const result = await Booking.find()
    .populate({
      path: "customer",
    })
    .populate({
      path: "serviceId",
    })
    .populate({
      path: "slotId",
    });

  return result;
};
// ! login user's own booking
const loginUserBooking = async (email: string) => {
  const allOrder = await Booking.find()
    .populate({
      path: "customer",
      select: "name email",
    })
    .populate({
      path: "serviceId",
    })
    .populate({
      path: "slotId",
    });

  const result = allOrder.filter(
    (order: any) => order?.customer?.email === email
  );

  return result;
};
export const bookingService = {
  postBookingInToDb,
  getAllBooking,
  loginUserBooking,
};
