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
const getAvailableSlot:RequestHandler=async(req,res,next)=>{
  const result=await slotService.getAvailableSlot(req.query)
 try {
  res.json({
    success:true,
    message: "Available slots retrieved successfully",
    data:result
  })
 } catch (error) {
  next(error)
 }
}
export const slotController = {
  createSlot,
  getAvailableSlot
};
