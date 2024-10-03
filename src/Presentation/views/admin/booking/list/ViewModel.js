import { useContext } from "react";
import { AppointmentDetailsContext } from "../../../../context/AppointmentDetailsContext";

const AdminBookingViewModel = () => {
  const { appointmentDetails, getAppointmentDetails, DeleteToAddress } =
    useContext(AppointmentDetailsContext);
  return {
    appointmentDetails,
    getAppointmentDetails,
    DeleteToAddress,
  };
};

export default AdminBookingViewModel;
