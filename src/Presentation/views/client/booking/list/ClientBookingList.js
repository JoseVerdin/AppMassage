import { Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import { AdminAppointmentDetailsListItem } from "./Item";

export const ClientBookingList = () => {
  const { appointmentDetailsId, refreshAppointmentDetails, DeleteToAddress } =
    useViewModel();
  console.log("Rendered appointments:", appointmentDetailsId);

  const filteredAppointments = appointmentDetailsId
    ? appointmentDetailsId.filter(
        (appointment) => appointment.detalles_citas[0].estado === "BOOKING",
      )
    : [];
  useEffect(() => {
    const refresh = async () => {
      await refreshAppointmentDetails();
    };
    refresh();
  }, []);
  return (
    <View style={{ backgroundColor: "white" }}>
      {filteredAppointments && filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.direccion}
          renderItem={({ item }) => (
            <AdminAppointmentDetailsListItem
              appointmentDetailsId={item}
              remove={DeleteToAddress}
            />
          )}
        />
      ) : (
        <Text>No se encontraron reservas!</Text>
      )}
    </View>
  );
};
