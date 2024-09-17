import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

export const RegisterWithImageAuthUseCase = async (user, file) => {
  const authRepository = new AuthRepositoryImpl();
  return await authRepository.registerWithImage(user, file);
};
