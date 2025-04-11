import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5050",
  // baseURL: "https://tech-gear-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
