import { ScrollView, Text, View, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import useViewModel from "./ViewModel";

export const ClientBookingDetailScreen = ({ route }) => {
  const { appointmentDetails } = route.params;
  const details = appointmentDetails.detalles_citas;
  console.log("DETAILSAPPOINTMENT: " + JSON.stringify(details, null, 2));
  const { total } = useViewModel({ route });
  console.log("TOTAL: " + JSON.stringify(total));
  return (
    <View style={styles.container}>
      <View style={styles.productImage}>
        <Image
          style={{ width: "100%", height: 210 }}
          source={require("../../../../../../assets/detail.jpg")}
        />
      </View>
      <ScrollView style={styles.productDetail}>
        {details.map((detail) => (
          <View key={detail.cita_id} style={styles.productInfo}>
            {/* NOMBRE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: detail.imagen }}
                style={{ width: 45, height: 45, borderRadius: 4 }}
              />
              <Text style={styles.name}>{detail.nombre}</Text>
            </View>
            <View style={styles.divider}></View>

            {/* DESCRIPCION */}
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.descriptionContent}>{detail.descripción}</Text>
            <View style={styles.divider}></View>

            {/* DESCRIPCION */}
            <Text style={styles.descriptionTitle}>Notes:</Text>
            <Text style={styles.descriptionContent}>{detail.notas}</Text>
            <View style={styles.divider}></View>

            {/* PRECIO */}
            <Text style={styles.descriptionTitle}>Price:</Text>
            <Text style={styles.descriptionContent}>${detail.precio}</Text>
            <View style={styles.divider}></View>
          </View>
        ))}
        {/* ORDEN */}
        <View style={styles.productInfo2}>
          <Text style={styles.descriptionTitle}>Your booking</Text>
          <Text style={styles.descriptionContent}>
            Cantidad masajes: {details[0].personas}
          </Text>
          <Text style={styles.descriptionContent}>Precio total: ${total}</Text>
          <View style={styles.divider}></View>
        </View>
      </ScrollView>
    </View>
  );
};
