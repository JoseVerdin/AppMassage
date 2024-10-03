import React from "react";
import { AppointmentDetailsProvider } from "../context/AppointmentDetailsContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientBookingList } from "../views/client/booking/list/ClientBookingList";
import { ClientBookingDetailScreen } from "../views/client/booking/detail/BookingDetail";

const Stack = createNativeStackNavigator();

export const ClientBookingNavigator = () => {
  return (
    <AppointmentDetailsState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ClientBookingList"
          component={ClientBookingList}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Bookings",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerStyle: { backgroundColor: "#06b1f0" },
          })}
        />
        <Stack.Screen
          name="ClientBookingDetailScreen"
          component={ClientBookingDetailScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Bookings",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerStyle: { backgroundColor: "#06b1f0" },
          })}
        />
      </Stack.Navigator>
    </AppointmentDetailsState>
  );
};

const AppointmentDetailsState = ({ children }) => {
  return <AppointmentDetailsProvider>{children}</AppointmentDetailsProvider>;
};
