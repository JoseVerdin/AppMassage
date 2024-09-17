import { AppointmentRepositoryImpl } from "../../../Data/repositories/AppointmentRepository";

const { getAll } = new AppointmentRepositoryImpl();

export const GetAllAppointmentUseCase = async () => {
  return await getAll();
};
