import { Text, View, FlatList } from "react-native";
import React from "react";
import useViewModel from "./ViewModel";
import { AdminAppointmentDetailsListItem } from "./Item";

export const AdminBookingList = () => {
  const { appointmentDetails, DeleteToAddress } = useViewModel();
  console.log("RESERVAS: " + JSON.stringify(appointmentDetails, null, 2));
  return (
    <View style={{ backgroundColor: "white" }}>
      {appointmentDetails && appointmentDetails.length > 0 ? (
        <FlatList
          data={appointmentDetails}
          keyExtractor={(item) => item.direccion}
          renderItem={({ item }) => (
            <AdminAppointmentDetailsListItem
              appointmentDetails={item}
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
