import axiosClient from "./axiosClient";
const Api = {
  spatient: (data_s) => {
    return axiosClient.post("api/v1/spatient", data_s);
  },
  streatment: (data_t) => {
    return axiosClient.post("api/v1/streatment", data_t);
  },
  addtreatment: (data_a) => {
    return axiosClient.post("api/v1/addtreatment", data_a);
  },
  add: (data_ad) => {
    return axiosClient.post("api/v1/add", data_ad);
  },
  del: (data_ad) => {
    return axiosClient.post("api/v1/del", data_ad);
  },
  log: () => {
    return axiosClient.get("api/v1/log");
  },
  details: () => {
    return axiosClient.get("api/v1/alldocs");
  },
  login: (credentials) => {
    return axiosClient.post("api/v1/login", credentials);
  },
  register: (userData) => {
    return axiosClient.post("api/v1/register", userData);
  },
  getDoctorPatients: (doctorName) => {
    return axiosClient.post("api/v1/doctor-patients", { doctorName });
  },
  getDoctors: () => {
    return axiosClient.get("api/v1/doctors");
  },
  assignDoctor: (data) => {
    return axiosClient.post("api/v1/assign-doctor", data);
  },
  updateRoom: (data) => {
    return axiosClient.put("api/v1/update-room", data);
  },
};
export default Api;
