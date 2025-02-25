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
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

// create an auth context
export const AuthContext = createContext(null);
const auth = getAuth(app);

// auth provider
const AuthProvider = ({ children }) => {
  // user and loading state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  //   create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
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
    loginUser,
    loginWithGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
