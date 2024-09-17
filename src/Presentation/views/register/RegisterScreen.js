import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import useViewModel from "./ViewModel";
import { ModalPickImage } from "../../components/ModalPickImage";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const {
    correo,
    imagen,
    telefono,
    contrasena,
    confirmContrasena,
    loading,
    errorMessage,
    user,
    onChange,
    register,
    pickImage,
    takePhoto,
  } = useViewModel();

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (errorMessage !== "") {
      console.log("Error: ", errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined && user?.id !== "") {
      navigation.replace("ClientTabsNavigator");
    }
  }, [user, navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Register
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a new Account
          </Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            top: "4%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {imagen === "" ? (
              <Image
                source={require("../../../../assets/user_image.png")}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Image
                source={{ uri: imagen }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </TouchableOpacity>

          <Text style={{ fontSize: 16, marginTop: 8, fontWeight: "600" }}>
            SELECT AN IMAGE
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={correo}
              keyboardType="email-address"
              onChangeText={(text) => onChange("correo", text)}
              placeholderTextColor="black"
              style={{
                fontSize: correo ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              keyboardType="numeric"
              value={telefono}
              onChangeText={(text) => onChange("telefono", text)}
              placeholder="Phone No"
              placeholderTextColor="black"
              style={{
                fontSize: contrasena ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={contrasena}
              onChangeText={(text) => onChange("contrasena", text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: contrasena ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              value={confirmContrasena}
              onChangeText={(text) => onChange("confirmContrasena", text)}
              secureTextEntry={true}
              placeholder="Confirm Password"
              placeholderTextColor="black"
              style={{
                fontSize: confirmContrasena ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have a account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <ModalPickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />

      {loading && (
        <ActivityIndicator
          style={{ position: "absolute", bottom: 0, top: 0, right: 0, left: 0 }}
          size="large"
          color={{ color: "#318CE7" }}
        />
      )}
    </SafeAreaView>
  );
};

export default RegisterScreen;
