import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AdminAppointmentDetailsListItem = ({
  appointmentDetailsId,
  remove,
}) => {
  const navigation = useNavigation();
  if (appointmentDetailsId.detalles_citas[0].estado !== "BOOKING") {
    return null; // No renderizar nada si no es BOOKING
  }

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
        navigation.navigate("ClientBookingDetailScreen", {
          appointmentDetails: appointmentDetailsId,
        })
      }
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: appointmentDetailsId.detalles_citas[0].imagen }}
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            Address: {appointmentDetailsId.direccion}
          </Text>
          <Text style={styles.description}>
            Total: ${appointmentDetailsId.total_precio}
          </Text>
          <Text style={styles.description}>
            Date adn Time:
            {formatDateTime(appointmentDetailsId.detalles_citas[0].fecha)}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => remove(appointmentDetailsId.direccion)}
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
    marginRight: 30,
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
