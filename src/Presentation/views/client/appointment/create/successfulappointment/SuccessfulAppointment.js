import { Text, View, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import { RoundedButton } from "../../../../../components/RoundedButton";

export const SuccessfulAppointment = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../../../../assets/comprobado.png")}
      />

      <Text style={styles.description}>
        Your appointment was successfully processed
      </Text>

      <Text style={styles.info}>
        Check the status of your purchase in the MY BOOKINGS section.
      </Text>

      <Text style={styles.description}>
        Once the therapists have completed the service, they will be paid the
        total amount.
      </Text>

      <View style={styles.button}>
        <RoundedButton
          text="FINISH"
          onPress={() => navigation.replace("ClientSelectQuantityScreen")}
        />
      </View>
    </View>
  );
};
