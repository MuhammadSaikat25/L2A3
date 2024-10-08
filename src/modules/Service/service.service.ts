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
const getAllServices = async (query: any) => {
  const { search, selectedDuration, sort } = query;
  const allService = await service.find();
  const uniqDuration = Array.from(
    new Set(allService?.map((service: any) => service.duration))
  );

  const searchFilter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  let durationFilter = {};
  if (typeof selectedDuration === "string" && selectedDuration.length) {
    const duration = selectedDuration
      .split(",")
      .map((d) => Number(d))
      .filter((d) => !isNaN(d));
    if (duration.length) {
      durationFilter = { duration: { $in: duration } };
    }
  }

  const combinedFilter = { ...searchFilter, ...durationFilter };

  let services = await service.find(combinedFilter);

  if (sort === "default") {
  } else if (sort === "asc") {
    services = await service.find().sort({ price: 1 });
  } else if (sort === "dec") {
    services = await service.find().sort({ price: -1 });
  }
  if (services.length === 0) {
    return await service.find();
  }

  return {
    services,
    uniqDuration,
  };
};
// ! delete a service
const deleteAService = async (id: string) => {
  const result = await service.findByIdAndDelete(id);
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
