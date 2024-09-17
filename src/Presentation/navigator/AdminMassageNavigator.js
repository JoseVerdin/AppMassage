import React from "react";
import { MassageProvider } from "../context/MassageContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminMassageCreateScreen } from "../views/admin/massage/create/MassageCreate";
import { AdminMassageListScreen } from "../views/admin/massage/list/MassageList";
import { AdminMassageUpdateScreen } from "../views/admin/massage/update/MassageUpdate";
import { TouchableOpacity, Image } from "react-native";

const Stack = createNativeStackNavigator();

export const AdminMassageNavigator = () => {
  return (
    <MassageState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AdminMassageListScreen"
          component={AdminMassageListScreen}
          options={({ route, navigation }) => ({
            headerShown: true,
            title: "Massages",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerStyle: { backgroundColor: "#06b1f0" },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminMassageCreateScreen")}
              >
                <Image
                  source={require("../../../assets/add.png")}
                  style={{ width: 35, height: 35, tintColor: "white" }}
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="AdminMassageCreateScreen"
          component={AdminMassageCreateScreen}
          options={{
            headerShown: true,
            title: "New Massage",
          }}
        />

        <Stack.Screen
          name="AdminMassageUpdateScreen"
          component={AdminMassageUpdateScreen}
          options={{
            headerShown: true,
            title: "Update Massage",
          }}
        />
      </Stack.Navigator>
    </MassageState>
  );
};

const MassageState = ({ children }) => {
  return <MassageProvider>{children}</MassageProvider>;
};
