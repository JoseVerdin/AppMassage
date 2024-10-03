import { AppointmentDetailsRepositoryImpl } from "../../../Data/repositories/AppointmentDetailsRepository";

const { deleteToAddress } = new AppointmentDetailsRepositoryImpl();

export const DeleteAppointmentUseCase = async (direccion) => {
  return await deleteToAddress(direccion);
};
