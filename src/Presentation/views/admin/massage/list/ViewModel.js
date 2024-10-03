import { Alert } from "react-native";
import { useContext, useState } from "react";
import { MassageContext } from "../../../../context/MassageContext";

const AdminMassageListViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { massages, getMassages, remove } = useContext(MassageContext);

  //console.log("Masajes en el viewmodel: " + JSON.stringify(massages));

  const deleteMassage = async (idMassage) => {
    // Mostrar la alerta antes de realizar la operación de eliminación
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this massage?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Eliminación cancelada"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const result = await remove(idMassage);
              setResponseMessage(result.message);
            } catch (error) {
              console.error("Error al eliminar el masaje:", error);
            }
          },
        },
      ],
    );
  };

  return {
    massages,
    responseMessage,
    getMassages,
    deleteMassage,
  };
};

export default AdminMassageListViewModel;
