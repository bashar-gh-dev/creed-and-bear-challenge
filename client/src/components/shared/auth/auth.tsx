import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth";
import { AuthContext, AuthObject } from "./auth.context";

const Auth = (props: any) => {
  const [auth, setAuth] = useState<AuthObject>(null);
  const [loading, setLoading] = useState(false);
  const authGuardContextValue = { auth, setAuth };

  useEffect(() => {
    (async () => {
      // when login
      if (auth?.user.email) {
        localStorage.setItem("email", auth.user.email);
      }
      const savedAuthData = localStorage.getItem("email");
      // when state is already updated
      if (savedAuthData === auth?.user.email) return;
      // only firs time if there is previous auth data
      if (savedAuthData) {
        const authService = new AuthService();
        setLoading(true);
        const authData = await authService.login(savedAuthData);
        if (authData.data.user.id) {
          setAuth({ user: authData.data.user });
        } else {
          localStorage.removeItem("email");
          setAuth(null);
        }
        setLoading(false);
      }
    })();
  }, [auth]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <AuthContext.Provider value={authGuardContextValue}>
          {props.children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default Auth;
