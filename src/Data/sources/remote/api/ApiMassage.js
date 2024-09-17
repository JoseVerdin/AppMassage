import axios from "axios";

const ApiMassage = axios.create({
  baseURL: "http://192.168.1.103:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
ApiMassage.interceptors.request.use((request) => {
  //console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

ApiMassage.interceptors.response.use((response) => {
  //console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

const ApiMassageForImage = axios.create({
  baseURL: "http://192.168.1.103:3000/api",
  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
});

export { ApiMassage, ApiMassageForImage };
