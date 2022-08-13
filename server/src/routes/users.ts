import { Router } from "express";
import { userCreateController } from "../controllers/users/create";
import { usersDeleteController } from "../controllers/users/delete";
import { userEditController } from "../controllers/users/edit";
import { userGetController } from "../controllers/users/get";
import { usersListController } from "../controllers/users/list";

export const usersRoute = Router();

usersRoute.get("/api/users/:id", userGetController);
usersRoute.patch("/api/users/:id", userEditController);
usersRoute.get("/api/users", usersListController);
usersRoute.post("/api/users", userCreateController);
usersRoute.patch("/api/users", usersDeleteController);
