import React from "react";
import { AppointmentDetailsProvider } from "../context/AppointmentDetailsContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminBookingList } from "../views/admin/booking/list/AdminBookingList";
import { AdminBookingDetailScreen } from "../views/admin/booking/detail/BookingDetail";

const Stack = createNativeStackNavigator();

export const AdminBookingNavigator = () => {
  return (
    <AppointmentDetailsState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AdminBookingList"
          component={AdminBookingList}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Bookings",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerStyle: { backgroundColor: "#06b1f0" },
          })}
        />
        <Stack.Screen
          name="AdminBookingDetailScreen"
          component={AdminBookingDetailScreen}
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
