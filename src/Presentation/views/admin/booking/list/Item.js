import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AdminAppointmentDetailsListItem = ({
  appointmentDetails,
  remove,
}) => {
  const navigation = useNavigation();
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdminBookingDetailScreen", {
          appointmentDetails: appointmentDetails,
        })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: appointmentDetails.detalles_citas[0].imagen }}
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            Address: {appointmentDetails.direccion}
          </Text>
          <Text style={styles.description}>
            ${appointmentDetails.total_precio}
          </Text>
          <Text style={styles.description}>
            Date and Time:{" "}
            {formatDateTime(appointmentDetails.detalles_citas[0].fecha)}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          {appointmentDetails.detalles_citas[0].estado === "COMPLETED" ? (
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/comprobado.png")}
            />
          ) : (
            <TouchableOpacity
              onPress={() => remove(appointmentDetails.direccion)}
            >
              <Text
                style={{
                  backgroundColor: "red",
                  borderRadius: 10,
                  color: "white",
                  padding: 5,
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 120,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  description: {
    color: "gray",
    fontSize: 12,
    marginTop: 3,
  },
  actionContainer: {
    marginRight: 50,
  },
  actionImage: {
    width: 35,
    height: 35,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 30,
    flex: 1,
  },
});
