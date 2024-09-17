import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

const QuantityPeople = ({ onSelectQuantity }) => {
  const quantitys = [
    { id: "0", value: "1" },
    { id: "1", value: "2" },
    { id: "2", value: "3" },
    { id: "3", value: "4" },
    { id: "4", value: "5" },
    { id: "5", value: "6" },
    { id: "6", value: "7" },
    { id: "7", value: "8" },
    { id: "8", value: "9" },
    { id: "9", value: "10" },
  ];
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  return (
    <View style={{ margin: 10, padding: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {quantitys.map((quantity, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedQuantity(quantity.value);
              onSelectQuantity(quantity.value);
            }}
            style={{
              width: 80,
              margin: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                borderColor:
                  selectedQuantity === quantity.value ? "#9bcadc" : "gray",
                borderWidth: 0.8,
                padding: 10,
                marginVertical: 10,
                borderRadius: 7,
                backgroundColor: "white",
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              {quantity.value}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuantityPeople;

const styles = StyleSheet.create({});
