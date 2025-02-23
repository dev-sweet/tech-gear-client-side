import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const handleClick = () => {
    loginWithGoogle()
      .then((data) => console.log(data))
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
