import { Alert } from "react-native";
import { createContext, useState, useEffect, useContext } from "react";
import { GetAllAppointmentDetailsUseCase } from "../../Domain/useCases/appointmentDetails/GetAllAppointmentDetails";
import { FindByIdAppointmentDetailsUseCase } from "../../Domain/useCases/appointmentDetails/FindByIdAppointmentDetails";
import { UpdateToStatusAppointmentUseCase } from "../../Domain/useCases/appointment/UpdateToStatusAppointment";
import { GetAllAppointmentUseCase } from "../../Domain/useCases/appointment/GetAllAppointment";
import { CreateAppointmentUseCase } from "../../Domain/useCases/appointment/CreateAppointment";
import { DeleteAppointmentUseCase } from "../../Domain/useCases/appointment/DeleteAppointment";
import { GetDateAppointmentUseCase } from "../../Domain/useCases/appointment/GetDateAppointment";
import { UserContext } from "../context/UserContext";

export const AppointmentDetailsContext = createContext({});

export const AppointmentDetailsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [appointmentDetailsId, setAppointmentDetailsId] = useState([]);
  const [massages, setMassages] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const result = await GetDateAppointmentUseCase();
      console.log("Resultado del context getDateAppointment: ", result); // Este console.log debe mostrar las fechas
      if (result && result.length > 0) {
        setBookedSlots(result);
        console.log("Fechas obtenidas:", result); // Aquí también podrías verificar si hay datos
      } else {
        console.log("No se recibieron fechas");
      }
    };

    fetchBookedSlots();
  }, []); // Asegúrate de que este useEffect no esté perdiendo dependencias

  useEffect(() => {
    if (massages.length === 0) {
      getMassages();
    }
  }, []);

  useEffect(() => {
    if (appointmentDetails.length === 0) {
      getAppointmentDetails();
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      FindByIdAppointmentDetails(user.id); // Pasar el userId
    }
  }, [user.id]);

  useEffect(() => {
    if (appointmentDetails.direccion) {
      UpdateToStatusAppointmentUseCase(appointmentDetails.direccion); // Pasar la direccion
    }
  }, [appointmentDetails.direccion]);

  const getMassages = async () => {
    const result = await GetAllAppointmentUseCase();
    if (result && result.length > 0) {
      setMassages(result);
      //console.log("Se han establecido los masajes");
    } else {
      //console.log("No se recibieron masajes");
    }
  };

  const create = async (appointment) => {
    try {
      const response = await CreateAppointmentUseCase(appointment);
      setAppointmentDetailsId(response);
      await getMassages();
      await FindByIdAppointmentDetails(user.id);
      return response;
    } catch (error) {
      //console.error("Error in create:", error);
      throw error; // Re-throw the error to be caught in the view model
    }
  };
  /*----------------------------------------------------------------------------------------------------*/
  const getAppointmentDetails = async () => {
    const result = await GetAllAppointmentDetailsUseCase();
    //console.log("Resultado del context:", result);
    if (result && result.length > 0) {
      setAppointmentDetails(result);
      //console.log("Se han establecido las reservas");
    } else {
      //console.log("No se recibieron reservas");
    }
  };

  const getDateAppointment = async () => {
    const result = await GetDateAppointmentUseCase();
    console.log("Resultado del context getDateAppointment: ", result);
    if (result && result.length > 0) {
      const parsedSlots = result.map((slot) => {
        const dateObj = new Date(slot.fecha);
        const date = dateObj.toISOString().split("T")[0]; // '2024-10-09'
        const time = dateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }); // '10:00'
        return { date, time };
      });
      setBookedSlots(parsedSlots);
      console.log("Se han establecido las fechas:", parsedSlots);
    } else {
      console.log("No se recibieron fechas");
    }
  };

  const FindByIdAppointmentDetails = async (id) => {
    const result = await FindByIdAppointmentDetailsUseCase(id);
    //console.log("Resultado del context con id:", result);
    if (result && result.data && result.data.length > 0) {
      setAppointmentDetailsId(result.data); // Acceder a la propiedad 'data'
      //console.log("Se han establecido las reservas con id");
      return result.data;
    } else {
      //console.log("No se recibieron reservas con id");
    }
  };

  const updateToStatus = async (direccion) => {
    try {
      const response = await UpdateToStatusAppointmentUseCase(direccion);
      await getAppointmentDetails();
      return response;
    } catch (error) {
      console.error("Error to update:", error);
      throw error; // Re-throw the error to be caught in the view model
    }
  };

  const DeleteToAddress = async (direccion) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete all appointments at ${direccion}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await DeleteAppointmentUseCase(direccion);
              await getAppointmentDetails();
              await FindByIdAppointmentDetails(user.id);
              //console.log("Deleted successfully:", response);
            } catch (error) {
              //console.error("Error deleting appointments:", error);
              throw error; // Manejo de error
            }
          },
        },
      ],
    );
  };

  const refreshAppointmentDetails = async () => {
    if (user.id) {
      const result = await FindByIdAppointmentDetails(user.id);
      //console.log("Refreshed appointments:", result);
      return result;
    }
  };
  return (
    <AppointmentDetailsContext.Provider
      value={{
        massages,
        appointmentDetails,
        appointmentDetailsId,
        bookedSlots,
        getMassages,
        create,
        getAppointmentDetails,
        getDateAppointment,
        FindByIdAppointmentDetails,
        updateToStatus,
        DeleteToAddress,
        refreshAppointmentDetails,
      }}
    >
      {children}
    </AppointmentDetailsContext.Provider>
  );
};
