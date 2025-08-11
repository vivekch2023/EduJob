import axios from "axios";

const URL_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://edujob-backend.onrender.com",
});

export default URL_API;
