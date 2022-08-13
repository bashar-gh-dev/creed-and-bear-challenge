import { Request, Response } from "express";
import { PaginatedData } from "../../common/fake-db/paginated-list";
import { UserModel } from "../../models/user";
import { users } from "../../common/fake-db/users/db";

type UsersListQueryParams = { page: string };
type UsersListResponse = PaginatedData<UserModel>;

const usersListPageSize = 5;

export const usersListController = (
  req: Request<{}, {}, {}, UsersListQueryParams>,
  res: Response<UsersListResponse>
) => {
  const pageIndex = parseInt(req.query.page ?? "1");
  const response = users.getPaginatedData(pageIndex, usersListPageSize);
  return res.send(response);
};
