import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API,
});

export default httpClient;
