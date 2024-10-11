import { AppointmentRepositoryImpl } from "../../../Data/repositories/AppointmentRepository";

const { getDate } = new AppointmentRepositoryImpl();

export const GetDateAppointmentUseCase = async () => {
  return await getDate();
};
