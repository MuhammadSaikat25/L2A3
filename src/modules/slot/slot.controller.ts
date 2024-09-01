import { RequestHandler } from "express";
import { slotService } from "./slot.service";
import { slot } from "./slot.model";

const createSlot: RequestHandler = async (req, res, next) => {
  const result = await slotService.postSlotInToDb(req.body);
  try {
    res.status(200).json({
      success: true,
      message: "Slots created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAvailableSlot: RequestHandler = async (req, res, next) => {
  const result = await slotService.getAvailableSlot(req.query);
  try {
    res.json({
      success: true,
      message: "Available slots retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getServiceSlot: RequestHandler = async (req, res, next) => {
  const result = await slotService.getServiceSlot(req.params.id);
  res.status(200).json({
    success: true,
    message: "slot got successful",
    data: result,
  });
};

const updateSlot: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const status = req.params.status;

  try {
    const result = await slot.findOneAndUpdate(
      { _id: id },
      { isBooked: status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      data: error,
    });
  }
};
export const slotController = {
  createSlot,
  getAvailableSlot,
  getServiceSlot,
  updateSlot,
};
