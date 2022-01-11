import axios from "axios";

export const urlDevelopment = "http://localhost:81/"

const api = axios.create({
  baseURL: urlDevelopment + "basic-react-crud-back-end/index.php/usuarios/",
});

export default api;
