import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

//import { AdminMassageListScreen } from "../views/admin/list/MassageList";
import ProfileScreen from "../views/profile/ProfileScreen";
import { AdminMassageNavigator } from "./AdminMassageNavigator";
import { AdminBookingNavigator } from "./AdminBookingNavigator";
import { TouchableOpacity, Image } from "react-native";

export const AdminTabsNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="AdminMassageNavigator"
        component={AdminMassageNavigator}
        options={({ route, navigation }) => ({
          title: "Massages",
          tabBarActiveTintColor: "#06b1f0",
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          tabBarLabel: "Massages",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5 name="bed" size={24} color="#06b1f0" />
            ) : (
              <MaterialCommunityIcons
                name="bed-outline"
                size={24}
                color="black"
              />
            ),
          headerStyle: { backgroundColor: "#06b1f0" },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminMassageCreateScreen")}
            >
              <Image
                source={require("../../../assets/add.png")}
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 15,
                  tintColor: "white",
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Tab.Screen
        name="AdminBookingNavigator"
        component={AdminBookingNavigator}
        options={{
          tabBarLabel: "Bookings",
          tabBarActiveTintColor: "#06b1f0",
          headerShown: false,
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
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: "#06b1f0",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-circle" size={24} color="#06b1f0" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
