import { Booking } from "./booking.model";

const postBookingInToDb = async (userInfo: any, playLoad: any) => {
  const playLoadCopy = { ...playLoad };
  const customer = {
    name: userInfo.name,
    email: userInfo.email,
  };

  const bookingData = {
    customer,
    serviceId: playLoadCopy.serviceId,
    slotId: playLoadCopy.slotId,
  };

  const postData = await Booking.create(bookingData);

  return postData;
};
// ! get all booking by admin
const getAllBooking = async () => {
  const result = await Booking.find()
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
