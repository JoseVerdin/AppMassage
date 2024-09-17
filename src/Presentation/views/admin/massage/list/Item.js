import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AdminMassageListItem = ({ massage, remove }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: massage.imagen }} />

        <View style={styles.info}>
          <Text style={styles.title}>{massage.nombre}</Text>
          <Text style={styles.description}>{massage.descripcion}</Text>
          {massage.options && massage.options.length > 0 && (
            <Text
              style={styles.optionsCount}
            >{`${massage.options.length} option(s)`}</Text>
          )}
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AdminMassageUpdateScreen", {
                massage: massage,
              })
            }
          >
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/edit.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => remove(massage.id)}>
            <Image
              style={styles.actionImage}
              source={require("../../../../../../assets/trash.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 120,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 15,
  },
  description: {
    color: "gray",
    fontSize: 12,
    marginTop: 3,
  },
  actionContainer: {
    marginRight: 50,
  },
  actionImage: {
    width: 35,
    height: 35,
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 30,
    flex: 1,
  },
});
