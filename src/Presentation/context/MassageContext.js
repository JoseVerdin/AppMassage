import { createContext, useState, useEffect } from "react";
import { CreateMassageUseCase } from "../../Domain/useCases/massage/CreateMassage";
import { DeleteMassageUseCase } from "../../Domain/useCases/massage/DeleteMassage";
import { UpdateMassageUseCase } from "../../Domain/useCases/massage/UpdateMassage";
import { GetAllMassageUseCase } from "../../Domain/useCases/massage/GetAllMassage";
import { updateWithImageMassageUseCase } from "../../Domain/useCases/massage/UpdateWithImageMassage";

export const MassageContext = createContext({});

export const MassageProvider = ({ children }) => {
  const [massages, setMassages] = useState([]);

  useEffect(() => {
    if (massages.length === 0) {
      //console.log("useEffect ejecutándose para cargar los masajes");
      getMassages();
    }
  }, []);

  const getMassages = async () => {
    //console.log("Iniciando la petición de masajes");
    const result = await GetAllMassageUseCase();
    //console.log("Resultado de la petición de masajes:", result);
    if (result && result.length > 0) {
      setMassages(result);
      console.log("Se han establecido los masajes");
    } else {
      console.log("No se recibieron masajes");
    }
  };

  const create = async (massage, file) => {
    try {
      const response = await CreateMassageUseCase(massage, file);
      getMassages();
      return response;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  };

  const update = async (massage) => {
    const response = await UpdateMassageUseCase(massage);
    getMassages();
    return response;
  };

  const updateWithImage = async (massage, file) => {
    const response = await updateWithImageMassageUseCase(massage, file);
    getMassages();
    return response;
  };

  const remove = async (id) => {
    const response = await DeleteMassageUseCase(id);
    getMassages();
    return response;
  };

  return (
    <MassageContext.Provider
      value={{
        massages,
        getMassages,
        create,
        update,
        updateWithImage,
        remove,
      }}
    >
      {children}
    </MassageContext.Provider>
  );
};
