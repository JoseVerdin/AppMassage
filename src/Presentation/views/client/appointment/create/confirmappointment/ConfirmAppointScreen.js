import {
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import useViewModel from "./ViewModel";

export const ConfirmAppointScreen = ({ route, navigation }) => {
  const {
    direccion,
    responseMessage,
    total,
    personSelections,
    date,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onChange,
    onChangeDate,
    handleConfirmAppointment,
  } = useViewModel({ route, navigation });

  console.log("Person Selections:", JSON.stringify(personSelections, null, 2));

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <SafeAreaView>
      <View style={{ margin: 15, padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Enter your Address:
        </Text>
        <TextInput
          placeholder="Your address"
          style={{
            width: "100%",
            height: 150,
            borderColor: "gray",
            borderWidth: 0.7,
            borderRadius: 5,
            marginTop: 8,
            padding: 6,
          }}
          multiline={true}
          onChangeText={(text) => onChange("direccion", text)}
          value={direccion}
        />
      </View>

      <View
        style={{
          margin: 15,
          padding: 10,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>Selected date:</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={{
            backgroundColor: "#9bcadc",
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Select Date
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={{ marginTop: 10 }}>{date.toDateString()}</Text>
      </View>

      <View
        style={{
          margin: 15,
          padding: 10,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>Selected time:</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={{
            backgroundColor: "#9bcadc",
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Select Time
          </Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={{ marginTop: 10 }}>{date.toLocaleTimeString()}</Text>
      </View>

      {/* Mostrar el total a pagar */}
      <View style={{ margin: 15, padding: 10, marginTop: 60 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Total to Pay: ${total.toFixed(2)}
        </Text>
      </View>

      <Pressable
        onPress={handleConfirmAppointment}
        style={{
          justifyContent: "center",
          backgroundColor: "#06b1f0",
          padding: 10,
          margin: 15,
          borderRadius: 5,
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
          CONTINUE
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
