import { AppointmentDetailsRepositoryImpl } from "../../../Data/repositories/AppointmentDetailsRepository";

const { getAll } = new AppointmentDetailsRepositoryImpl();

export const GetAllAppointmentDetailsUseCase = async () => {
  return await getAll();
};
