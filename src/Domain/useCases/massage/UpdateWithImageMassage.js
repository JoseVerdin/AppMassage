import { MassageRepositoryImpl } from "../../../Data/repositories/MassageRepository";

export const updateWithImageMassageUseCase = async (massage, file) => {
  const massageRepository = new MassageRepositoryImpl();
  return await massageRepository.updateWithImage(massage, file);
};
