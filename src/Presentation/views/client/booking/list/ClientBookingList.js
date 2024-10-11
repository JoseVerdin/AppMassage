import { Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import { AdminAppointmentDetailsListItem } from "./Item";
import { useNavigation } from "@react-navigation/native";

export const ClientBookingList = () => {
  const navigation = useNavigation();
  const { appointmentDetailsId, refreshAppointmentDetails, DeleteToAddress } =
    useViewModel();
  //console.log("Rendered appointments:", appointmentDetailsId);

  const filteredAppointments = appointmentDetailsId
    ? appointmentDetailsId.filter(
        (appointment) => appointment.detalles_citas[0].estado === "BOOKING",
      )
    : [];

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await refreshAppointmentDetails();
    });
    return unsubscribe; // Cleanup cuando se desmonta
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
