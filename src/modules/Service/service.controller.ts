import { RequestHandler } from "express";
import { serviceService } from "./service.service";

const createService: RequestHandler = async (req, res) => {
  try {
    const result = await serviceService.postServiceIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const getServiceById: RequestHandler = async (req, res, next) => {
  try {
    const result = await serviceService.getServiceById(req.params.id);
    res.status(result?200:404).json({
      success: result ? true : false,
      message: result ? "Service retrieved successfully" : "No Data Found",
      data: result ? result : [],
    });
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  createService,
  getServiceById,
};
