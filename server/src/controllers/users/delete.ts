import { Request, Response } from "express";
import { users } from "../../common/fake-db/users/db";
import { isArray } from "util";

type UsersDeletePayload = { usersIds: string[] };
type UsersDeleteResponse = {
  data: {
    status: string;
  };
};

export const usersDeleteController = (
  req: Request<{}, {}, UsersDeletePayload, {}>,
  res: Response<UsersDeleteResponse>
) => {
  // valid request payload
  if (
    req.body.usersIds &&
    isArray(req.body.usersIds) &&
    req.body.usersIds.length > 0
  ) {
    req.body.usersIds.forEach((userId) => {
      users.delete(userId);
    });
    const response: UsersDeleteResponse = {
      data: {
        status: "success",
      },
    };
    return res.send(response);
  }
  // bad request payload
  else {
    return res.sendStatus(404);
  }
};
