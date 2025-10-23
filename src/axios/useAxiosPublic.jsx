// src/hooks/useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://blog-server-three-inky.vercel.app/", 
});

export default axiosPublic;