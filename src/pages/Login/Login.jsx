import { useForm } from "react-hook-form";
import loginImg from "../../assets/login.jpg";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/GoogelLogin/GoogleLogin";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    loginUser(user.email, user.password)
      .then((data) => {
        if (data.user.email) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Login successfully!.",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/invalid-credential).") {
          Swal.fire({
            // position: "top-end",
            icon: "error",
            title: "Invalid email or password.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="lg:px-20 px-10 flex flex-col md:flex-row items-center justify-center md:h-[100vh] gap-10">
      <div className="lg:max-w-[500px] w-full order-2 md:order-1">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img className="max-w-full" src={loginImg} alt="" />
        </motion.div>
      </div>

      <div className="min-w-[400px] xsm:w-full  order-1 md:order-2 ">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-10 shadow shadow-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl text-center font-bold text-gray-700">
              Login
            </h1>

            <div className="pt-3 flex flex-col justify-center gap-3">
              <label htmlFor="email"> Email *</label>
              <input
                className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
                type="email"
                defaultValue=""
                placeholder="Your Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="pt-3 flex flex-col justify-center gap-3">
              <label htmlFor="password"> Password *</label>
              <input
                className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
                defaultValue=""
                placeholder="Your Password"
                type="password"
                {...register("password", { required: true })}
              />
            </div>

            {errors.password && (
              <span className="text-red-500 mt-3">Password is required</span>
            )}

            <input
              className="bg-[#07174e] py-3 w-full text-white  font-semibold mt-5 cursor-pointer transition-all duration-100 ease-in-out hover:bg-[#050f33]"
              type="submit"
            />
          </form>
          <div className="pt-5">
            <Divider>or</Divider>
            <GoogleLogin from={from} />
            <p className="pt-5">
              Didn't registered yet?{" "}
              <Link
                className="text-blue-600 font-semibold hover:text-blue-400 transition-all duration-100 ease-in-out"
                to="/register"
              >
                Register here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
