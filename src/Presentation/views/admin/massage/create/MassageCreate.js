import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./Styles";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { RoundedButton } from "../../../../components/RoundedButton";
import useViewModel from "./ViewModel";

export const AdminMassageCreateScreen = () => {
  const {
    nombre,
    descripcion,
    responseMessage,
    loading,
    imagen,
    options,
    onChange,
    takePhoto,
    pickImage,
    createMassage,
    addOption,
    onChangeOption,
  } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== "") {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
      >
        {imagen === "" ? (
          <Image
            style={styles.image}
            source={require("../../../../../../assets/massageImage.png")}
          />
        ) : (
          <Image source={{ uri: imagen }} style={styles.image} />
        )}
      </TouchableOpacity>

      <View style={styles.form}>
        <ScrollView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../../../../assets/masaje.png")}
              style={styles.formImage}
            />
            <TextInput
              placeholder="Name"
              value={nombre}
              keyboardType="default"
              onChangeText={(text) => onChange("nombre", text)}
              placeholderTextColor="black"
              style={{
                fontSize: nombre ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../../../../assets/descripcion.png")}
              style={styles.formImage2}
            />
            <TextInput
              placeholder="Description"
              value={descripcion}
              keyboardType="default"
              onChangeText={(text) => onChange("descripcion", text)}
              placeholderTextColor="black"
              style={{
                fontSize: descripcion ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>
          <Text style={{ marginTop: 15, fontSize: 17, fontWeight: "bold" }}>
            Enter your options
          </Text>

          {options.map((option, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../../../../assets/time.png")}
                  style={styles.formImage2}
                />
                <TextInput
                  placeholder="Duration in minutes"
                  value={option.duracion}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    onChangeOption(index, "duracion", text)
                  }
                  placeholderTextColor="black"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 150,
                    marginVertical: 10,
                  }}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../../../../assets/price.png")}
                  style={styles.formImage2}
                />
                <TextInput
                  placeholder="Price"
                  value={option.precio}
                  keyboardType="numeric"
                  onChangeText={(text) => onChangeOption(index, "precio", text)}
                  placeholderTextColor="black"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 150,
                    marginVertical: 10,
                  }}
                />
              </View>
            </View>
          ))}
          <RoundedButton text="Add Option" onPress={addOption} />

          <View style={styles.buttonContainer}>
            <RoundedButton
              text="CREATE MASSSAGE"
              onPress={() => createMassage()}
            />
          </View>
        </ScrollView>
      </View>

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
    </View>
  );
};
