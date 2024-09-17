import { View, ToastAndroid, FlatList, Text } from "react-native";
import React, { useEffect } from "react";
import useViewModel from "./ViewModel";
import { AdminMassageListItem } from "./Item";

export const AdminMassageListScreen = () => {
  const { massages, responseMessage, deleteMassage } = useViewModel();

  //console.log("Masajes en el screen MassageList: " + JSON.stringify(massages));
  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={{ backgroundColor: "white" }}>
      {massages && massages.length > 0 ? (
        <FlatList
          data={massages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AdminMassageListItem massage={item} remove={deleteMassage} />
          )}
        />
      ) : (
        <Text>No se encontraron masajes</Text>
      )}
    </View>
  );
};
