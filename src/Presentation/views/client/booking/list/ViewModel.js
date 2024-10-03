import { useContext } from "react";
import { AppointmentDetailsContext } from "../../../../context/AppointmentDetailsContext";

const ClientBookingViewModel = () => {
  const {
    appointmentDetailsId,
    FindByIdAppointmentDetails,
    refreshAppointmentDetails,
    DeleteToAddress,
  } = useContext(AppointmentDetailsContext);

  return {
    appointmentDetailsId,
    FindByIdAppointmentDetails,
    refreshAppointmentDetails,
    DeleteToAddress,
  };
};

export default ClientBookingViewModel;
