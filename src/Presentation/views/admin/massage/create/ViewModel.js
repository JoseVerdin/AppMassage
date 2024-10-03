import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import { MassageContext } from "../../../../context/MassageContext";

const AdminMassageCreateViewModel = () => {
  const [values, setValues] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    options: [{ duracion: "", precio: "" }],
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { create } = useContext(MassageContext);

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
    const newOption = { duracion: "", precio: "" }; // Nueva opción vacía
    setValues({ ...values, options: [...values.options, newOption] });
  };

  const createMassage = async () => {
    setLoading(true);
    try {
      // Validar que los campos no estén vacíos
      if (!values.nombre || !values.descripcion || !values.imagen) {
        throw new Error(
          "El nombre, la descripción y la imagen son obligatorios",
        );
      }

      // Validar que al menos haya una opción con duración y precio
      if (!values.options.some((option) => option.duracion && option.precio)) {
        throw new Error(
          "Debe agregar al menos una opción con duración y precio",
        );
      }

      const response = await create(values, file);
      setResponseMessage(response.message);
      resetForm();
    } catch (error) {
      console.error("Error creating massage:", error);
      setResponseMessage(error.message || "Error al crear el masaje");
    } finally {
      setLoading(false);
    }
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

  const resetForm = () => {
    setValues({
      nombre: "",
      descripcion: "",
      imagen: "",
      options: [{ duracion: "", precio: "" }],
    });
    setFile(null);
  };

  return {
    ...values,
    onChange,
    takePhoto,
    pickImage,
    createMassage,
    addOption,
    onChangeOption,
    loading,
    responseMessage,
    options: values.options,
  };
};

export default AdminMassageCreateViewModel;
