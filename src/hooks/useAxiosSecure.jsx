import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5050",
  // baseURL: "https://tech-gear-server.onrender.com",
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  // intercepts 401,403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      const status = err.response.status;
      const message = err.response.data.message;
      if (status === 401) {
        Swal.fire({
          title: "Unauthorised Access!",
          text: message,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        logOut().then(() => {
          navigate("/login");
        });
      } else if (status === 403) {
        Swal.fire({
          title: "Restricted!",
          text: message,
          icon: "warning",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#07174e] border-0 text-white rounded-md px-6 py-2 cursor-pointer hover:bg-[#000721]",
          },
        });
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
