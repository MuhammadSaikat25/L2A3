import { RequestHandler } from "express";
import { bookingService } from "./booking.service";

const createBooking: RequestHandler = async (req, res, next) => {
  const customerEmail = req.user.email;
  const bookingData = req.body;

  try {
    const result = await bookingService.postBookingInToDb(
      customerEmail,
      bookingData
    );
    res.status(200).json({
      statusCode: 200,
      message: "Booking successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bookingController = {
  createBooking,
};
