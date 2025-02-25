import { useForm } from "react-hook-form";
import loginImg from "../../assets/login.jpg";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/GoogelLogin/GoogleLogin";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
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
            position: "top-end",
            icon: "success",
            title: "Login successfully!.",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong!.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="lg:px-20 px-10 lg:flex md:flex items-center justify-center h-[90vh] gap-10">
      <img className="lg:max-w-[500px]" src={loginImg} alt="" />

      <div className="min-w-[400px] p-10 shadow shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl text-center font-semibold">Login </h1>

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
            className="bg-[#2b4190] py-3 w-full text-white mt-5 cursor-pointer"
            type="submit"
          />
        </form>
        <div className="pt-5">
          <Divider>or</Divider>
          <GoogleLogin from={from} />
          <p className="pt-5">
            Didn't registered yet?{" "}
            <Link className="text-blue-600 font-semibold" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
