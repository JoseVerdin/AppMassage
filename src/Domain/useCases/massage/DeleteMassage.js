import { MassageRepositoryImpl } from "../../../Data/repositories/MassageRepository";

export const DeleteMassageUseCase = async (id) => {
  const massageRepository = new MassageRepositoryImpl();
  return await massageRepository.remove(id);
};
