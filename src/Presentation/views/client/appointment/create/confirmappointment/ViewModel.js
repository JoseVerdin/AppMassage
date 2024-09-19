import { useState, useContext } from "react";
import { AppointmentContext } from "../../../../../context/AppointmentContext";
import { MassageContext } from "../../../../../context/MassageContext";
import { UserContext } from "../../../../../context/UserContext";

const calculateTotal = (personSelections) => {
  let total = 0;
  Object.values(personSelections).forEach((person) => {
    total += person.selectedOption.precio;
  });
  return total;
};

const ConfirmAppointViewModel = ({ route, navigation }) => {
  const { personSelections } = route.params;
  const { create } = useContext(AppointmentContext);
  const { massages } = useContext(MassageContext);
  const { user } = useContext(UserContext);

  const [values, setValues] = useState({
    user_id: "",
    massage_id: "",
    opcion_id: "",
    precio: "",
    fecha: "",
    cantidad_personas: "",
    notas: "",
    direccion: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (property, value) => {
    setValues({ ...values, [property]: value });
  };

  const onChangeDate = (e, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false); // Hide date picker
    setShowTimePicker(false); // Hide time picker
  };

  const total = calculateTotal(personSelections);

  const handleConfirmAppointment = async () => {
    // Itera sobre cada selección de persona para crear múltiples citas
    const appointments = Object.keys(personSelections).map((key) => {
      const person = personSelections[key];
      const localDate = new Date(date);
      const formattedDate = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")} ${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")}`;
      return {
        user_id: user.id,
        massage_id: person.selectedMassage.id,
        opcion_id: person.selectedOption.id,
        precio: person.selectedOption.precio,
        fecha: formattedDate,
        cantidad_personas: Object.keys(personSelections).length,
        notas: person.note,
        direccion: values.direccion,
      };
    });

    // Preparar los datos de la cita para enviarlos
    const appointmentData = {
      appointments: JSON.stringify(appointments),
    };
    console.log("Appointment data to be inserted:", appointmentData);

    try {
      const response = await create(appointmentData); // Envía al backend
      setResponseMessage(response.message);
      //navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating appointment:", error);
      setResponseMessage(error.message || "Error al crear el masaje");
    }
  };

  return {
    ...values,
    responseMessage,
    total,
    personSelections,
    date,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onChange,
    onChangeDate,
    handleConfirmAppointment,
  };
};

export default ConfirmAppointViewModel;
