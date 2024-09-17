import { Pressable, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import QuantityPeople from "../../../../../components/QuantityPeople";

export const ClientSelectQuantityScreen = () => {
  const navigation = useNavigation();
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  const proceedToDetails = () => {
    if (!selectedQuantity) {
      Alert.alert(
        "Empty or invalid",
        "Select a quantity",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("Ok pressed") },
        ],
        {
          cancelable: true,
        },
      );
    }
    if (selectedQuantity) {
      navigation.navigate("ClientSelectDetailsScreen", {
        quantity: parseInt(selectedQuantity, 10),
        currentPerson: 1,
      });
    }
  };
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        How many people?
      </Text>
      {/* Quantity Select People*/}

      <QuantityPeople onSelectQuantity={setSelectedQuantity} />

      <Pressable
        onPress={proceedToDetails}
        style={{
          marginTop: 400,
          width: 200,
          borderRadius: 5,
          backgroundColor: "#9bcadc",
          padding: 7,
          marginHorizontal: "auto",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
