import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/Presentation/navigator/MainStackNavigator";

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default StackNavigator;
