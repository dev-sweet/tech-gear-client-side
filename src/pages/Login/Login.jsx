import { useForm } from "react-hook-form";
import loginImg from "../../assets/login.jpg";
import { Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="flex items-center justify-center h-[90vh] gap-10">
      <img className="max-w-[500px]" src={loginImg} alt="" />

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
          <button className="border-1 border-[#2b4190] py-3 w-full text-[#2b4190] mt-5 cursor-pointer text-center">
            <span className="flex items-center justify-center">
              <FcGoogle className="text-3xl " />
              <span>Login with</span>
            </span>
          </button>
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
