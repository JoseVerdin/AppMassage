import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../views/login/LoginScreen";
import RegisterScreen from "../views/register/RegisterScreen";
import RolesScreen from "../views/roles/Roles";
import { AdminTabsNavigator } from "./AdminTabsNavigator";
import { ClientTabsNavigator } from "./ClientTabsNavigator";
import { UserProvider } from "../context/UserContext";
const Stack = createNativeStackNavigator();
export const MainStackNavigator = () => {
  return (
    <UserState>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Roles"
          component={RolesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </UserState>
  );
};

const UserState = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
