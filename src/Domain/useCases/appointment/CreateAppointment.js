import { AppointmentRepositoryImpl } from "../../../Data/repositories/AppointmentRepository";

const { create } = new AppointmentRepositoryImpl();

export const CreateAppointmentUseCase = async (appointment) => {
  return await create(appointment);
};
