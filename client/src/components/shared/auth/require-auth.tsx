import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { Navigate } from "react-router-dom";

const RequireAuth = (props: any) => {
  const authState = useContext(AuthContext);
  return authState.auth?.user.id ? props.children : <Navigate to={"/login"} />;
};

export default RequireAuth;
