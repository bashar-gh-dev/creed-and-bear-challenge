import axios from "axios";
import UserModel from "../shared/user.model";

type LoginResponse = { data: { status: string; user: UserModel } };

export default class AuthService {
  private baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://c-n-b-challenge.herokuapp.com/api/auth/login"
      : `http://localhost:${process.env.PORT || 5000}/api/auth/login`;

  async login(email: string) {
    return axios
      .post(`${this.baseUrl}`, { email })
      .then((res) => res.data as LoginResponse);
  }
}
