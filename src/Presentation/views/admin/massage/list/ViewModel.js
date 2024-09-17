import { useContext, useState } from "react";
import { MassageContext } from "../../../../context/MassageContext";

const AdminMassageListViewModel = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const { massages, getMassages, remove } = useContext(MassageContext);

  //console.log("Masajes en el viewmodel: " + JSON.stringify(massages));

  const deleteMassage = async (idMassage) => {
    const result = await remove(idMassage);
    setResponseMessage(result.message);
  };

  return {
    massages,
    responseMessage,
    getMassages,
    deleteMassage,
  };
};

export default AdminMassageListViewModel;
