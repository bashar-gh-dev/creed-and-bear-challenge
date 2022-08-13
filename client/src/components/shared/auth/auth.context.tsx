import { createContext } from "react";
import UserModel from "../../../shared/user.model";

export type AuthObject = {
  user: UserModel;
} | null;

export const AuthContext = createContext<{
  auth: AuthObject;
  setAuth: (auth: AuthObject) => void;
}>({ auth: null, setAuth: () => {} });
