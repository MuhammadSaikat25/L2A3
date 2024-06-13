import { TService } from "./service.interface";
import { service } from "./service.model";

// !for post a services
const postServiceIntoDB = async (palyLoad: TService) => {
  const result = await service.create(palyLoad);
  return result;
};

// ! get single service by id
const getServiceById = async (id: string) => {
  const result = await service.findById(id);
  return result;
};

const getAllServices = async () => {
  const result = await service.find();
  return result;
};
export const serviceService = {
  postServiceIntoDB,
  getServiceById,
  getAllServices,
};
