import axios from "axios";

const instance = axios.create({
  //baseURL: "https://papa-back.onrender.com/",
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(function (response) {
  return response?.data;
});

export default instance;
