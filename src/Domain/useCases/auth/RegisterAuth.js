import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const { register } = new AuthRepositoryImpl();

export const RegisterAuthUseCase = async (user) => {
  return await register(user);
};
