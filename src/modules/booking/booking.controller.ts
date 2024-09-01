import { RequestHandler } from "express";
import { bookingService } from "./booking.service";

const createBooking: RequestHandler = async (req, res, next) => {
  const customerEmail = req?.user?.email;
  const bookingData = req.body;

  try {
    const result = await bookingService.postBookingInToDb(
      customerEmail!,
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
const getAllBooking: RequestHandler = async (req, res, next) => {
  const result = await bookingService.getAllBooking();
  try {
    res.status(200).json({
      statusCode: 200,
      message: "All bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const loginUserBooking: RequestHandler = async (req, res, next) => {
  const email = req?.user?.email;
  
  const result = await bookingService.loginUserBooking(email!);
  try {
    res.status(200).json({
      statusCode: 200,
      message: "User bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const bookingController = {
  createBooking,
  getAllBooking,
  loginUserBooking,
};
