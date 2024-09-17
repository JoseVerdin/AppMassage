import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import bodegon from "../../../assets/bodegon.jpg";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Salon and Spa",
      headerStyle: {
        backgroundColor: "#06b1f0",
        height: 100,
      },
      headerTitleStyle: {
        color: "white",
      },
      headerTitleAlign: "center",
    });
  }, []);
  return (
    <SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={bodegon} style={{ width: "100%", height: 250 }} />
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Welcome!
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#06b1f0",
          width: 200,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: "auto",
          borderRadius: 3,
        }}
      >
        <Text
          style={{ color: "white", padding: 10, margin: 5, fontWeight: "600" }}
        >
          GET A MASSAGE
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 15,
          marginVertical: 10,
          borderRadius: 6,
        }}
      >
        <View
          style={{
            backgroundColor: "#D4E7EE",
            marginHorizontal: 35,
            marginVertical: 50,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
              marginHorizontal: 15,
            }}
          >
            Invest in yourself
          </Text>
          <Text
            style={{
              padding: 10,
              margin: 5,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            We are a salon and spa that offers a variety of services to help you
            relax and rejuvenate. Our services include massages, facials, body
            treatments, and more. Whether you are looking to unwind after a long
            day or prepare for a special event, we have the perfect treatment
            for you. Our experienced therapists will work with you to create a
            customized treatment plan that meets your needs and helps you
            achieve your wellness goals. Contact us today to schedule an
            appointment and experience the benefits of our services for
            yourself.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
