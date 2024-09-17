import { Text, TextInput, View, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

export const ConfirmAppointScreen = ({ route }) => {
  const { personSelections } = route.params;
  console.log("Person Selections:", JSON.stringify(personSelections, null, 2));

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (e, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); // Hide date picker
    setShowTimePicker(false); // Hide time picker
  };

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
            height: 100,
            borderColor: "gray",
            borderWidth: 0.7,
            borderRadius: 5,
            marginTop: 8,
          }}
          multiline={true}
        ></TextInput>
      </View>

      <View style={{ margin: 15, padding: 10 }}>
        <Text>Selected date:</Text>
        <Button
          title="Select Date"
          onPress={() => setShowDatePicker(true)}
          style={{}}
        />

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text>{date.toDateString()}</Text>
      </View>

      <View style={{ margin: 15, padding: 10 }}>
        <Text>Selected time:</Text>
        <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text>{date.toLocaleTimeString()}</Text>
      </View>

      <Pressable
        //onPress={}
        style={{
          justifyContent: "center",
          backgroundColor: "#9bcadc",
          padding: 10,
          margin: 15,
          borderRadius: 5,
          marginTop: 100,
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
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
