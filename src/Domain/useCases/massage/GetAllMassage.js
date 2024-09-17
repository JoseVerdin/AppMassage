import { MassageRepositoryImpl } from "../../../Data/repositories/MassageRepository";

const { getAll } = new MassageRepositoryImpl();

export const GetAllMassageUseCase = async () => {
  return await getAll();
};
