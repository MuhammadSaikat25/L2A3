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
// ! get all services
const getAllServices = async () => {
  const result = await service.find();
  return result;
};
// ! delete a service
const deleteAService = async (id: string) => {
  const result = await service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
// ! update service
const updateAService = async (id: string, palyLoad: Partial<TService>) => {
  const result = await service.findByIdAndUpdate(id, palyLoad, { new: true });

  return result;
};

export const serviceService = {
  postServiceIntoDB,
  getServiceById,
  getAllServices,
  updateAService,
  deleteAService,
};
