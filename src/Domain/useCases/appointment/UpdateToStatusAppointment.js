import { AppointmentDetailsRepositoryImpl } from "../../../Data/repositories/AppointmentDetailsRepository";

const { updateToStatus } = new AppointmentDetailsRepositoryImpl();

export const UpdateToStatusAppointmentUseCase = async (direccion) => {
  return await updateToStatus(direccion);
};
