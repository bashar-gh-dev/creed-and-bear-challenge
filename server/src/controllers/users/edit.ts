import { Request, Response } from "express";
import { UserModel } from "../../models/user";
import { users } from "../../common/fake-db/users/db";

type UserEditRouteParams = { id: string };
type UserEditPayload = Partial<Omit<UserModel, "id">>;
type UserEditResponse = {
  data: {
    status: string;
  };
};

export const userEditController = (
  req: Request<UserEditRouteParams, {}, UserEditPayload, {}>,
  res: Response<UserEditResponse>
) => {
  // valid user id
  if (req.params.id) {
    const { first_name, last_name, avatar, email } = req.body;
    const user = users.get(req.params.id);
    // user found
    if (user) {
      const editedUser = { ...user };
      if (first_name) editedUser.first_name = first_name;
      if (last_name) editedUser.last_name = last_name;
      if (avatar) editedUser.avatar = avatar;
      if (email) editedUser.email = email;
      users.edit(req.params.id, editedUser);
      const response: UserEditResponse = {
        data: {
          status: "success",
        },
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
