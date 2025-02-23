import { useForm } from "react-hook-form";
import loginImg from "../../assets/login.jpg";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/GoogelLogin/GoogleLogin";
const Register = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    createUser(user.email, user.password)
      .then((data) => {
        if (data.user.email) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "This user is already exist!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="flex items-center justify-center py-10 gap-10">
      <img className="max-w-[500px]" src={loginImg} alt="" />

      <div className="min-w-[400px] p-8 shadow shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl text-center font-semibold">Register </h1>

          <div className="pt-3 flex flex-col justify-center gap-3">
            <label htmlFor="email"> Name *</label>
            <input
              className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
              type="text"
              defaultValue=""
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <d className="text-red-500 mt-5">Name is required!</d>
          )}
          <div className="pt-3 flex flex-col justify-center gap-3">
            <label htmlFor="email"> Email *</label>
            <input
              className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5"
              type="email"
              defaultValue=""
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 mt-3">{errors.email.message}</span>
          )}
          <div className="pt-3 flex flex-col justify-center gap-3">
            <label htmlFor="password"> Password *</label>
            <input
              className="border-2 border-gray-400 focus:border-[#2b4190] w-full outline-none py-3 px-5 focus:border-2"
              defaultValue=""
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "min length is 6 charecters.",
                },
              })}
            />
          </div>

          {errors.password && (
            <span className="text-red-500 mt-3">{errors.password.message}</span>
          )}

          <input
            className="bg-[#2b4190] py-3 w-full text-white mt-5 cursor-pointer"
            type="submit"
          />
        </form>
        <div className="pt-5">
          <Divider>or</Divider>
          <GoogleLogin />
          <p className="pt-5">
            Already have an account?{" "}
            <Link className="text-blue-600 font-semibold" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
