import { useState, useContext } from "react";
import { MassageContext } from "../../../../context/MassageContext";
import * as ImagePicker from "expo-image-picker";

const AdminMassageUpdateViewModel = (massage) => {
  const [values, setValues] = useState({
    ...massage,
    options: massage.options || [],
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { update, updateWithImage } = useContext(MassageContext);

  const onChange = (property, value) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeOption = (index, property, value) => {
    const updatedOptions = [...values.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [property]: value,
    };
    setValues({ ...values, options: updatedOptions });
  };

  const addOption = () => {
    const newOption = { duracion: "", precio: "" };
    setValues((prevValues) => ({
      ...prevValues,
      options: [...(prevValues.options || []), newOption],
    }));
  };

  const updateMassage = async () => {
    setLoading(true);
    let response = {};
    if (values.imagen?.includes("https://")) {
      // ACTUALIZAR SIN IMAGEN
      response = await update(values);
    } else {
      // ACTUALIZAR CON IMAGEN
      response = await updateWithImage(values, file);
    }
    setLoading(false);
    setResponseMessage(response.message);
  };

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
  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    updateMassage,
    onChangeOption,
    addOption,
    loading,
    responseMessage,
  };
};

export default AdminMassageUpdateViewModel;
