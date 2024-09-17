import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

export const LoginAuthUseCase = async (correo, contrasena) => {
  const authRepository = new AuthRepositoryImpl();
  return await authRepository.login(correo, contrasena);
};
