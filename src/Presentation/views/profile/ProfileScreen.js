import { Text, Pressable, Image, View, Alert } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import styles from "./Styles";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, removeUserSessionContext } = useContext(UserContext);
  const Logout = async () => {
    Alert.alert(
      "Confirm Logout", // Título del alert
      "Are you sure you want to log out?", // Mensaje del alert
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await removeUserSessionContext();
              navigation.navigate("Login");
            } catch (error) {
              console.error("Error al cerrar sesión: ", error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
  const isAdmin = user?.roles?.some((role) => role.name === "ADMIN");
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/spa.jpg")}
        style={styles.imageBackground}
      />
      {isAdmin ? (
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Pressable
            style={styles.logout}
            onPress={() => {
              Logout();
            }}
          >
            <Image
              source={require("../../../../assets/logout.png")}
              style={styles.logoutImage}
            />
          </Pressable>
          <Pressable
            style={styles.change}
            onPress={() => navigation.replace("Roles")}
          >
            <Image
              source={require("../../../../assets/exchange.png")}
              style={styles.logoutImage}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={styles.logout}
          onPress={() => {
            Logout();
          }}
        >
          <Image
            source={require("../../../../assets/logout.png")}
            style={styles.logoutImage}
          />
        </Pressable>
      )}

      <View style={styles.logoContainer}>
        {user?.imagen !== "" && (
          <Image source={{ uri: user?.imagen }} style={styles.logoImage} />
        )}
      </View>

      <View style={styles.form}>
        <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: "bold" }}>
          Information
        </Text>
        <View style={styles.formInfo}>
          <Image
            source={require("../../../../assets/email.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.correo}</Text>
            <Text style={styles.formTextDescription}>Your email address</Text>
          </View>
        </View>

        <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 70 }}>
          <Image
            source={require("../../../../assets/phone.png")}
            style={styles.formImage}
          />
          <View style={styles.formContent}>
            <Text>{user?.telefono}</Text>
            <Text style={styles.formTextDescription}>Phone</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
