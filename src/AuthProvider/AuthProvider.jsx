import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// create an auth context
export const AuthContext = createContext(null);
const auth = getAuth(app);

// auth provider
const AuthProvider = ({ children }) => {
  // user and loading state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  //   create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update the user
  const updateUser = (name, img) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img || "",
    });
  };
  // login with email and password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google pop up
  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // logout user
  const logOut = () => {
    return signOut(auth);
  };

  // auth state notation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
      if (currentUser) {
        const user = {
          email: currentUser.email,
        };
        axiosPublic.post("/jwt", user).then((res) => {
          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
            setIsLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setIsLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);
  //   user info
  const userInfo = {
    user,
    isLoading,
    createUser,
    updateUser,
    loginUser,
    loginWithGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
