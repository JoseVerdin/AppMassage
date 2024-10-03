import { ApiMassage } from "../sources/remote/api/ApiMassage";

export class AppointmentDetailsRepositoryImpl {
  async getAll() {
    try {
      const response = await ApiMassage.get("/appointmentDetails/getAll");
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async findById(id) {
    try {
      const response = await ApiMassage.get(
        `/appointmentDetails/findById/${id}`,
      );
      console.log(response.data);
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error;
      console.log("ERROR: " + JSON.stringify(e.response?.data));
      return Promise.resolve([]);
    }
  }

  async updateToStatus(direccion) {
    try {
      const response = await ApiMassage.put("/appointment/updateToStatus", {
        direccion: direccion,
      });
      return Promise.resolve(JSON.stringify(response.data));
    } catch (error) {
      let e = error;
      console.log("ERROR update status: " + JSON.stringify(e.response?.data));
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async deleteToAddress(direccion) {
    try {
      const response = await ApiMassage.delete(
        `/appointment/delete/${direccion}`,
      );
      return Promise.resolve(JSON.stringify(response.data));
    } catch (error) {
      let e = error;
      console.log(
        "ERROR delete appointment: " + JSON.stringify(e.response?.data),
      );
      const apiError = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }
}
