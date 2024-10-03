import { AppointmentDetailsRepositoryImpl } from "../../../Data/repositories/AppointmentDetailsRepository";

const { findById } = new AppointmentDetailsRepositoryImpl();

export const FindByIdAppointmentDetailsUseCase = async (id) => {
  return await findById(id);
};
