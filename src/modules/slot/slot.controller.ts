import { RequestHandler } from "express";
import { slotService } from "./slot.service";

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

export const slotController = {
  createSlot,
};
