import { MassageRepositoryImpl } from "../../../Data/repositories/MassageRepository";

export const CreateMassageUseCase = async (massage, file) => {
  const massageRepository = new MassageRepositoryImpl();
  return await massageRepository.create(massage, file);
};
