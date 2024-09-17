import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientSelectQuantityScreen } from "../views/client/appointment/create/selectquantity/ClientSelectQuantityScreen";
import { ClientSelectDetailsScreen } from "../views/client/appointment/create/selectdetails/ClientSelectDetailsScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppointmentProvider } from "../context/AppointmentContext";
import { ClientNotesScreen } from "../views/client/appointment/create/notes/NotesScreen";
import { ConfirmAppointScreen } from "../views/client/appointment/create/confirmappointment/ConfirmAppointScreen";

const Stack = createNativeStackNavigator();

export const ClientAppointmentNavigator = () => {
  return (
    <AppointmentState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ClientSelectQuantityScreen"
          component={ClientSelectQuantityScreen}
          options={{
            headerShown: true,
            headerTitle: "Appointments",
            headerTitleStyle: {
              color: "white",
              fontSize: 20,
            },
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#06b1f0",
            },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={24}
                  color="#06b1f0"
                />
              ) : (
                <AntDesign name="calendar" size={24} color="black" />
              ),
          }}
        />
        <Stack.Screen
          name="ClientSelectDetailsScreen"
          component={ClientSelectDetailsScreen}
        />
        <Stack.Screen name="ClientNotesScreen" component={ClientNotesScreen} />
        <Stack.Screen
          name="ConfirmAppointScreen"
          component={ConfirmAppointScreen}
        />
      </Stack.Navigator>
    </AppointmentState>
  );
};

const AppointmentState = ({ children }) => {
  return <AppointmentProvider>{children}</AppointmentProvider>;
};
