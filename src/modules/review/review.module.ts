import { RequestHandler } from "express";
import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  review: String,
  star: Number,
  user: Object,
});

export const ReviewModel = model("review", reviewSchema);

export const postReview: RequestHandler = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await ReviewModel.create(body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error,
    });
  }
};
export const getAllReviews: RequestHandler = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await ReviewModel.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error,
    });
  }
};
