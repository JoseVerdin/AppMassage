import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const RolesItem = ({ rol, navigation, height, width }) => {
  const handlePress = () => {
    //console.log("ROL SELECCIONADO (dentro de handlePress):", rol.name);
    if (rol.name === "ADMIN") {
      //console.log("Redirigiendo a AdminTabsNavigator");
      navigation.replace("AdminTabsNavigator");
    } else if (rol.name === "CLIENT") {
      //console.log("Redirigiendo a ClientTabsNavigator");
      navigation.replace("ClientTabsNavigator");
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...styles.container, height: height, width: width }}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: rol.imagen }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{rol.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RolesItem;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 7,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  titleContainer: {
    height: 50,
    backgroundColor: "blue",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
  },
});
