import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../views/HomeScreen";
import StoreScreen from "../views/StoreScreen";
import ProfileScreen from "../views/profile/ProfileScreen";
import { ClientAppointmentNavigator } from "../navigator/ClientAppointmentNavigator";
import { ClientBookingNavigator } from "../navigator/ClientBookingNavigator";

export const ClientTabsNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarActiveTintColor: "#06b1f0",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#06b1f0" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="ClientAppointmentNavigator"
        component={ClientAppointmentNavigator}
        options={{
          tabBarLabel: "Appointments",
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
        name="ClientBookingNavigator"
        component={ClientBookingNavigator}
        options={{
          tabBarLabel: "Bookings",
          tabBarActiveTintColor: "#06b1f0",
          headerShown: false,
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
