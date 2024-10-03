const calculateTotal = (details) => {
  let total = 0;
  details.forEach((detail) => {
    total += detail.precio;
  });
  return total;
};

const ClientBookingDetailViewModel = ({ route }) => {
  const { appointmentDetails } = route.params;
  const details = appointmentDetails.detalles_citas;
  const total = details ? calculateTotal(details) : 0;
  return {
    total,
  };
};

export default ClientBookingDetailViewModel;
