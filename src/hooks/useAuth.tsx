import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase/clientApp";
import nookies from "nookies";
import { User } from "firebase/auth";

export const useAuth = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    user ? setUserCookie(user) : nookies.set(undefined, "token", "");
    setLoading(false);
  }, [user]);

  const setUserCookie = async (user: User) => {
    const token = await user.getIdToken();
    nookies.set(undefined, "token", token);
    nookies.set(undefined, "uid", user.uid);
  };
  return {
    user,
    loading,
  };
};
