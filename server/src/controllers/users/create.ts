import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { users } from "../../common/fake-db/users/db";

type UserCreatePayload = Partial<Omit<UserModel, "id">>;
type UserCreateResponse = {
  data: {
    status: string;
  };
};

export const userCreateController = (
  req: Request<{}, {}, UserCreatePayload, {}>,
  res: Response<UserCreateResponse>
) => {
  const { first_name, last_name, avatar, email } = req.body;
  // valid payload
  if (first_name && last_name && avatar && email) {
    users.add({ first_name, last_name, avatar, email });
    const response: UserCreateResponse = {
      data: {
        status: "success",
      },
    };
    return res.send(response);
  }
  // invalid payload
  else {
    return res.sendStatus(400);
  }
};
