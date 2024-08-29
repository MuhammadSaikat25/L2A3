import AppError from "../../error/AppError";
import { TService } from "../Service/service.interface";

import { service as serviceModel } from "../Service/service.model";
import { TSlot } from "./slot.interface";
import { slot } from "./slot.model";

const postSlotInToDb = async (playLoad: TSlot) => {
  const { startTime, endTime, date, service: ServiceId } = playLoad;
  const duration: TService | null = await serviceModel.findById(
    playLoad.service
  );

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (!duration || !duration.duration) {
    throw new AppError(404, "Service duration not found");
  }
  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);
  const totalMinutes = (Number(end) - Number(start)) / 60000;
  const numberOfSlots = totalMinutes / duration?.duration;
  const createSlot = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStart = new Date(start.getTime() + i * duration.duration * 60000);
    const slotEnd = new Date(slotStart.getTime() + duration.duration * 60000);
    const newSlot = await slot.create({
      service: ServiceId,
      date: date,
      startTime: slotStart.toTimeString().substr(0, 5),
      endTime: slotEnd.toTimeString().substr(0, 5),
      isBooked: "available",
    });
    createSlot.push(newSlot);
  }

  return createSlot;
};
// ! get available slot
const getAvailableSlot = async (query: {
  date?: string;
  serviceId?: string;
}) => {
  let newQuery: { date?: string; service?: string } = {};
  if (query.date && query.serviceId) {
    newQuery.date = query.date;
    newQuery.service = query.serviceId;
  } else if (query.date) {
    newQuery.date = query.date;
  } else if (query.serviceId) {
    newQuery.service = query.serviceId;
  } else {
    newQuery = {};
  }
  console.log(newQuery);
  if (!query) {
    const result = await slot.find({
      isBooked: { $in: ["available", "canceled"] },
    });
    return result;
  }
  const result = await slot
    .find({
      ...newQuery,
      isBooked: { $in: ["available", "canceled"] },
    })
    .populate("service");
  return result;
};

const getServiceSlot = async (id: string) => {
  const result = await slot.find({ service: id });
  return result;
};

export const slotService = {
  postSlotInToDb,
  getAvailableSlot,
  getServiceSlot,
};
