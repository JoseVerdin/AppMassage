import { Text, TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export const ClientNotesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentPerson = route.params?.currentPerson || 1;
  const [note, setNote] = useState(route.params?.note || "");

  const handleConfirm = () => {
    navigation.navigate("ClientSelectDetailsScreen", {
      updatedNote: note,
      currentPerson: currentPerson,
      quantity: route.params.quantity,
    });
  };
  return (
    <SafeAreaView>
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={30}
          color="black"
          style={{
            padding: 10,
          }}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 45,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Notes for your Therapist
      </Text>

      <View style={{ marginTop: 15, padding: 20, margin: 10 }}>
        <Text style={{ color: "gray", fontSize: 15 }}>
          Notes for Person {currentPerson}
        </Text>
        <TextInput
          onChangeText={setNote}
          value={note}
          placeholder="Enter any additional information, such as focus areas, allergies, or injuries"
          placeholderTextColor="gray"
          style={{ width: "100%", padding: 10 }}
          multiline={true}
        ></TextInput>
      </View>
      <Pressable
        onPress={handleConfirm}
        style={{
          justifyContent: "center",
          backgroundColor: "#9bcadc",
          padding: 10,
          margin: 15,
          borderRadius: 5,
          marginTop: 400,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Confirm
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
