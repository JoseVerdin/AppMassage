import { createContext, useState, useEffect } from "react";
import { GetAllAppointmentUseCase } from "../../Domain/useCases/appointment/GetAllAppointment";

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

  return (
    <AppointmentContext.Provider
      value={{
        massages,
        getMassages,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
