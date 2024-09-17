import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import useViewModel from "./ViewModel";
import { ModalPickImage } from "../../../../components/ModalPickImage";
import { RoundedButton } from "../../../../components/RoundedButton";
import styles from "./Styles";

export const AdminMassageUpdateScreen = ({ navigation, route }) => {
  const { massage } = route.params;
  console.log(massage);
  const {
    nombre,
    descripcion,
    imagen,
    options,
    onChange,
    takePhoto,
    pickImage,
    updateMassage,
    onChangeOption,
    addOption,
    loading,
    responseMessage,
  } = useViewModel(massage);
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
          {Array.isArray(options) && options.length > 0 ? (
            options.map((option, index) => (
              <View key={option.id || index} style={styles.optionContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../../../../../assets/time.png")}
                    style={styles.formImage2}
                  />
                  <TextInput
                    placeholder="Duration in minutes"
                    value={option.duracion.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      onChangeOption(index, "duracion", text)
                    }
                    placeholderTextColor="black"
                    style={styles.optionInput}
                  />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../../../../../assets/price.png")}
                    style={styles.formImage2}
                  />
                  <TextInput
                    placeholder="Price"
                    value={option.precio.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      onChangeOption(index, "precio", text)
                    }
                    placeholderTextColor="black"
                    style={styles.optionInput}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noOptionsText}>No options available</Text>
          )}
          <RoundedButton text="Add Option" onPress={addOption} />

          <View style={styles.buttonContainer}>
            <RoundedButton
              text="UPDATE MASSSAGE"
              onPress={() => updateMassage()}
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

export default AdminMassageUpdateScreen;
