import { UserModel } from "../../../models/user";
import { faker } from "@faker-js/faker";
import { v4 as uuidV4 } from "uuid";
import { DataBase } from "../data-base";
import { PaginatedList } from "../paginated-list";

export class UsersDb implements DataBase<UserModel>, PaginatedList<UserModel> {
  private users: UserModel[] = [];

  constructor(numberOfUsers: number) {
    this.users = [...new Array(numberOfUsers)].map(() => ({
      id: uuidV4().replace(/-/g, ""),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    }));
    this.users.push({
      id: uuidV4().replace(/-/g, ""),
      avatar: faker.image.avatar(),
      email: "test@gmail.com",
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    });
  }

  get(id: string) {
    return this.users.find((user) => user.id === id);
  }

  list() {
    return [...this.users];
  }

  add(user: Omit<UserModel, "id">): void {
    const id = uuidV4().replace(/-/g, "");
    this.users.push({ ...user, id });
  }

  edit(id: string, newUserData: Partial<Omit<UserModel, "id">>): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0) throw new Error(`user ${id} not found`);
    this.users[userIndex] = { ...this.users[userIndex], ...newUserData };
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getPaginatedData(pageIndex: number, pageSize: number) {
    if (pageSize < 1) throw new Error("invalid page size");
    const totalPages = Math.ceil(this.users.length / pageSize);
    if (pageIndex > 0 && pageIndex <= totalPages) {
      const firstElementIndex = (pageIndex - 1) * pageSize;
      const lastElementIndex = pageIndex * pageSize;
      const data: UserModel[] = this.users.slice(
        firstElementIndex,
        lastElementIndex
      );
      return {
        page: pageIndex,
        per_page: pageSize,
        total: this.users.length,
        total_pages: totalPages,
        data,
      };
    } else {
      const data: UserModel[] = this.users.slice(0, pageSize);
      return {
        page: 1,
        per_page: pageSize,
        total: this.users.length,
        total_pages: totalPages,
        data,
      };
    }
  }
}
