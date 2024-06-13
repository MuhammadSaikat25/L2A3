import { RequestHandler } from "express";
import { serviceService } from "./service.service";

const createService: RequestHandler = async (req, res) => {
  const result = await serviceService.postServiceIntoDB(req.body);
  try {
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

export const serviceController = {
  createService,
};
