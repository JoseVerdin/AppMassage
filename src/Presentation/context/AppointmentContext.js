import { createContext, useState, useEffect } from "react";
import { GetAllAppointmentUseCase } from "../../Domain/useCases/appointment/GetAllAppointment";
import { CreateAppointmentUseCase } from "../../Domain/useCases/appointment/CreateAppointment";

export const AppointmentContext = createContext({});

export const AppointmentProvider = ({ children }) => {
  const [massages, setMassages] = useState([]);

  useEffect(() => {
    if (massages.length === 0) {
      getMassages();
    }
  }, []);

  const getMassages = async () => {
    const result = await GetAllAppointmentUseCase();
    if (result && result.length > 0) {
      setMassages(result);
      console.log("Se han establecido los masajes");
    } else {
      console.log("No se recibieron masajes");
    }
  };

  const create = async (appointment) => {
    try {
      const response = await CreateAppointmentUseCase(appointment);
      getMassages();
      return response;
    } catch (error) {
      console.error("Error in create:", error);
      throw error; // Re-throw the error to be caught in the view model
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        massages,
        getMassages,
        create,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
