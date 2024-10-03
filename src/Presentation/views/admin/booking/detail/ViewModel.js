import { useContext } from "react";
import { AppointmentDetailsContext } from "../../../../context/AppointmentDetailsContext";
const calculateTotal = (details) => {
  let total = 0;
  details.forEach((detail) => {
    total += detail.precio;
  });
  return total;
};

const AdminBookingDetailViewModel = ({ route }) => {
  const { updateToStatus } = useContext(AppointmentDetailsContext);
  const { appointmentDetails } = route.params;
  const details = appointmentDetails.detalles_citas;
  const total = details ? calculateTotal(details) : 0;
  const direccion = appointmentDetails.direccion;
  const update = async () => {
    let response = await updateToStatus(direccion);
    const result = JSON.stringify(response);
    return result;
  };
  return {
    total,
    update,
  };
};

export default AdminBookingDetailViewModel;
