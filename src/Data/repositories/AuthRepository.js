import mime from "mime";
import {
  ApiMassage,
  ApiMassageForImage,
} from "../sources/remote/api/ApiMassage";

export class AuthRepositoryImpl {
  async register(user) {
    try {
      const response = await ApiMassage.post("/users/create", user);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log("ERROR: " + JSON.stringify(error.response?.data));
      const apiError = JSON.parse(JSON.stringify(error.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async registerWithImage(user, file) {
    try {
      let data = new FormData();
      data.append("imagen", {
        uri: file.uri,
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri),
      });
      data.append("user", JSON.stringify(user));
      const response = await ApiMassageForImage.post(
        "/users/createWithImage",
        data,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Failed to register" };
    }
  }

  async login(correo, contrasena) {
    try {
      const response = await ApiMassage.post("/users/login", {
        correo: correo.trim(),
        contrasena: contrasena.trim(),
      });
      return response.data;
    } catch (error) {
      console.log("ERROR: " + JSON.stringify(error.response?.data));
      const apiError = JSON.parse(JSON.stringify(error.response?.data));
      return Promise.resolve(apiError);
    }
  }
}
