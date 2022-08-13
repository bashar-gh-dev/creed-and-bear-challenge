import axios from "axios";
import UserModel from "../shared/user.model";

type PaginatedUserData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserModel[];
};
type UserGetResponse = { data: UserModel };
type UserEditResponse = {
  data: {
    status: string;
  };
};
type UserCreateResponse = {
  data: {
    status: string;
  };
};
type UsersDeleteResponse = {
  data: {
    status: string;
  };
};

export default class UsersService {
  private baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://c-n-b-challenge.herokuapp.com/api/users"
      : `http://localhost:${process.env.PORT || 5000}/api/users`;

  async listUsers(page: number) {
    return axios
      .get(`${this.baseUrl}`, { params: { page } })
      .then((res) => res.data as PaginatedUserData);
  }

  async getUser(userId: string) {
    return axios
      .get(`${this.baseUrl}/${userId}`)
      .then((res) => res.data as UserGetResponse);
  }

  async updateUser(userId: string, user: Partial<Omit<UserModel, "id">>) {
    return axios
      .patch(`${this.baseUrl}/${userId}`, user)
      .then((res) => res.data as UserEditResponse);
  }

  async createUser(user: Omit<UserModel, "id">) {
    return axios
      .post(`${this.baseUrl}`, user)
      .then((res) => res.data as UserCreateResponse);
  }

  async deleteUsers(usersIds: string[]) {
    return axios
      .patch(`${this.baseUrl}`, { usersIds })
      .then((res) => res.data as UsersDeleteResponse);
  }
}
