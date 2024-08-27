import { RequestHandler } from "express";
import { serviceService } from "./service.service";

// ! post a service by admin
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
// ! get single service b y id
const getServiceById: RequestHandler = async (req, res, next) => {
  try {
    const result = await serviceService.getServiceById(req.params.id);
    res.status(result ? 200 : 404).json({
      success: result ? true : false,
      message: result ? "Service retrieved successfully" : "No Data Found",
      data: result ? result : [],
    });
  } catch (error) {
    next(error);
  }
};
// ! get all services
const getAllServices: RequestHandler = async (req, res, next) => {
  try {
    const result = await serviceService.getAllServices(req.query);
    res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// ! delete a service
const deleteAService: RequestHandler = async (req, res, next) => {
  try {
    const result = await serviceService.deleteAService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// ! update service by id
const updateAService: RequestHandler = async (req, res, next) => {
  const result = await serviceService.updateAService(req.params.id, req.body);
  try {
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const serviceController = {
  createService,
  getServiceById,
  getAllServices,
  updateAService,
  deleteAService,
};
