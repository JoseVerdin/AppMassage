import { MassageRepositoryImpl } from "../../../Data/repositories/MassageRepository";

export const UpdateMassageUseCase = async (massage) => {
  const massageRepository = new MassageRepositoryImpl();
  return await massageRepository.update(massage);
};
