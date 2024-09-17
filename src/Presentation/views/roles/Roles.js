import { Dimensions } from "react-native";
import React, { useContext } from "react";
import RolesItem from "./Item";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { UserContext } from "../../context/UserContext";

const RolesScreen = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { user } = useContext(UserContext);
  //console.log("Roles del usuario: " + JSON.stringify(user?.roles));
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
      }}
    >
      <Carousel
        loop={false}
        width={width}
        height={height / 2}
        autoPlay={false}
        data={user?.roles}
        renderItem={({ item }) => (
          <RolesItem
            rol={item}
            height={420}
            width={300}
            navigation={navigation}
          />
        )}
        scrollAnimationDuration={1000}
      />
    </GestureHandlerRootView>
  );
};

export default RolesScreen;
