import { ApiMassage } from "../sources/remote/api/ApiMassage";

export class AppointmentRepositoryImpl {
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
}
