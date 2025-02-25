import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GoogleLogin = ({ from }) => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const location = from || "/";
  const handleClick = () => {
    loginWithGoogle()
      .then((data) => {
        if (data.user.email) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successfully!.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location, { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={handleClick}
      className="border-1 border-[#2b4190] py-3 w-full text-[#2b4190] mt-5 cursor-pointer text-center"
    >
      <span className="flex items-center justify-center">
        <FcGoogle className="text-3xl " />
        <span>Login with</span>
      </span>
    </button>
  );
};

export default GoogleLogin;
