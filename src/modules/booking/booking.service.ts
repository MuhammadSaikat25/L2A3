import { Users } from "../users/user.model";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { service } from "../Service/service.model";
import { slot } from "../slot/slot.model";

const postBookingInToDb = async (customerEmail: string, playLoad: TBooking) => {
  // ! get booking user
  const getBookingUser = await Users.findOne({ email: customerEmail });
  // ! booking data
  const bookingData = {
    ...playLoad,
    customer: getBookingUser?._id,
  };
  // ! post booking into db
  const postBooking = await Booking.create(bookingData);
  // * get recent booking data
  const getBookingConform = await Booking.find()
    .populate("serviceId")
    .populate("slotId");
  // * get recent booking data
  const recentBookingData = getBookingConform[getBookingConform.length - 1];

  // ! get recent booking's serviceId
  const bookingConformService =
    getBookingConform[getBookingConform.length - 1].serviceId._id;
  // ! get recent booking's service
  let bookingService = await service.findById(bookingConformService);
  // ! get recent booking's slot
  const bookingConformSlot =
    getBookingConform[getBookingConform.length - 1].slotId;
  const bookingSlot = await slot.findById(bookingConformSlot);

  const result = {
    customer: {
      _id: getBookingUser?._id,
      name: getBookingUser?.name,
      address: getBookingUser?.address,
      phone: getBookingUser?.phone,
    },
    service: {
      _id: bookingService?._id,
      name: bookingService?.name,
      description: bookingService?.description,
      price: bookingService?.price,
      duration: bookingService?.duration,
      isDeleted: bookingService?.isDeleted,
    },
    slot: {
      _id: bookingSlot?._id,
      service: playLoad.serviceId,
      date: bookingSlot?.date,
      startTime: bookingSlot?.startTime,
      endTime: bookingSlot?.endTime,
      isBooked: bookingSlot?.isBooked,
    },
    manufacturingYear: recentBookingData.manufacturingYear,
    _id: recentBookingData._id,
    vehicleType: recentBookingData.vehicleType,
    vehicleBrand: recentBookingData.vehicleBrand,
    vehicleModel: recentBookingData.vehicleModel,
    registrationPlate: recentBookingData.registrationPlate,
  };

  return result;
};

export const bookingService = {
  postBookingInToDb,
};
