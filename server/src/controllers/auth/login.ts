import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { users } from "../../common/fake-db/users/db";

type LoginPayloadPayload = { email: string };
type LoginResponse = { data: { status: string; user: UserModel } };

export const loginController = (
  req: Request<{}, {}, LoginPayloadPayload, {}>,
  res: Response<LoginResponse>
) => {
  // valid user id
  if (req.body.email) {
    const user = users
      .list()
      .filter((user) => user.email === req.body.email)[0];
    // user found
    if (user) {
      const response: LoginResponse = {
        data: { status: "success", user: user },
      };
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
