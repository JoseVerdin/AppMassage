import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { RegisterWithImageAuthUseCase } from "../../../Domain/useCases/auth/RegisterWithImageAuth";
import { Alert } from "react-native";
import { UserContext } from "../../context/UserContext";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    correo: "",
    telefono: "",
    contrasena: "",
    confirmContrasena: "",
    imagen: "",
  });

  const { user, saveUserSessionContext } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("imagen", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange("imagen", result.assets[0].uri);
      setFile(result.assets[0]);
    }
  };

  const onChange = (property, value) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      setLoading(true);
      // const response = await RegisterAuthUseCase(values);
      const response = await RegisterWithImageAuthUseCase(values, file);
      setLoading(false);
      //console.log("RESPONSE REGISTER: " + JSON.stringify(response));
      if (response.success) {
        const userData = response.data;
        //console.log("Datos del usuario a guardar: ", userData);
        await saveUserSessionContext(userData);
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = () => {
    if (values.correo === "") {
      Alert.alert("Enter your email address");
      return false;
    }
    if (values.telefono === "") {
      Alert.alert("Enter your phone number");
      return false;
    }
    if (values.contrasena === "") {
      Alert.alert("Enter your password");
      return false;
    }
    if (values.confirmContrasena === "") {
      Alert.alert("Enter your password confirmation");
      return false;
    }
    if (values.contrasena !== values.confirmContrasena) {
      Alert.alert("The passwords no match");
      return false;
    }

    return true;
  };

  return {
    ...values,
    user,
    onChange,
    register,
    pickImage,
    takePhoto,
    errorMessage,
    loading,
  };
};

export default RegisterViewModel;
