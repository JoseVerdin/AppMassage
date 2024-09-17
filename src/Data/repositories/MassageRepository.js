import mime from "mime";
import {
  ApiMassage,
  ApiMassageForImage,
} from "../sources/remote/api/ApiMassage";

export class MassageRepositoryImpl {
  async getAll() {
    //console.log("Ejecutando getAll");
    try {
      const response = await ApiMassage.get("/massages/getAll");
      //console.log("Respuesta completa:", response);
      //console.log("Datos recibidos:", response.data); // Verifica si aquí hay datos
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async create(massage, file) {
    try {
      let data = new FormData();
      data.append("imagen", {
        uri: file.uri,
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri),
      });
      data.append("massage", JSON.stringify(massage));
      const response = await ApiMassageForImage.post("/massages/create", data);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log("ERROR create: ", error);
      return Promise.reject(error);
      /*let e = error;
      console.log("ERROR create: " + JSON.stringify(e.response?.data));
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);*/
    }
  }

  async update(massage) {
    try {
      const response = await ApiMassage.put("/massages/update", massage);
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR update: " + JSON.stringify(e.response?.data));
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async updateWithImage(massage, file) {
    try {
      let data = new FormData();
      data.append("imagen", {
        uri: file.uri,
        name: file.uri.split("/").pop(),
        type: mime.getType(file.uri),
      });
      data.append("massage", JSON.stringify(massage));
      const response = await ApiMassageForImage.put(
        "/massages/updateWithImage",
        data,
      );
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR updateWithImage: " + JSON.stringify(e.response?.data));
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async remove(id) {
    try {
      const response = await ApiMassage.delete(`/massages/delete/${id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }
}
