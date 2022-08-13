import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { users } from "../../common/fake-db/users/db";

type UserGetRouteParams = { id: string };
type UserGetResponse = { data: UserModel };

export const userGetController = (
  req: Request<UserGetRouteParams, {}, {}, {}>,
  res: Response<UserGetResponse>
) => {
  // valid user id
  if (req.params.id) {
    const user = users.get(req.params.id);
    // user found
    if (user) {
      const response: UserGetResponse = { data: user };
      return res.send(response);
    }
    // user not found
    else {
      return res.sendStatus(404);
    }
  }
  // invalid user id "bad request"
  else {
    return res.sendStatus(400);
  }
};
