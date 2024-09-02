import { RequestHandler } from "express";
import { bookingService } from "./booking.service";
import AppError from "../../error/AppError";
require("dotenv").config();
const stripe = require("stripe")(process.env.SK);

const createBooking: RequestHandler = async (req, res, next) => {
 
  const customer = req?.user;
  const bookingData = req.body.paymentInfo;

  try {
    if (bookingData) {
      if ("id" in bookingData) {
        const paymentIntentId = bookingData.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );
        if (paymentIntent.status !== "succeeded") {
          return next(new AppError(400, "payment not authorized"));
        }
      }
    }

    const result = await bookingService.postBookingInToDb(
      customer!,
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

const stripePk: RequestHandler = (req, res, next) => {
  res.status(200).json({
    pk: process.env.PK,
  });
};

const payment: RequestHandler = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Coding Hero",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error: any) {
    next(new AppError(400, error.message));
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  loginUserBooking,
  stripePk,
  payment,
};
