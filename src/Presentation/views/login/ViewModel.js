import { useState, useContext } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";
import { Alert } from "react-native";
import { UserContext } from "../../context/UserContext";

const LoginViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    correo: "",
    contrasena: "",
  });

  const { user, saveUserSessionContext } = useContext(UserContext);

  const onChange = (property, value) => {
    setValues({ ...values, [property]: value });
  };

  let response = {};
  const login = async () => {
    if (isValidForm()) {
      response = await LoginAuthUseCase(values.correo, values.contrasena);
      //console.log("RESPONSE login: " + JSON.stringify(response));
      if (response.success) {
        const userData = response.data;
        //console.log("Datos del usuario a guardar: ", userData);
        await saveUserSessionContext(userData);
      } else {
        Alert.alert("Password or Email incorrect");
        setErrorMessage(response.message);
      }
    }
  };

  const isValidForm = () => {
    if (values.correo === "") {
      Alert.alert("Ingresa el correo electronico");
      return false;
    }
    if (values.contrasena === "") {
      Alert.alert("Ingresa la contraseña");
      return false;
    }

    return true;
  };

  return {
    ...values,
    user,
    onChange,
    login,
    errorMessage,
  };
};

export default LoginViewModel;
