import { createUserController } from "../app/factories/createUserController";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/users";

router.post("/", (req: Request, res: Response, nextFunction: NextFunction) => {
  const userController = createUserController()
  return userController.createUser(req, res, nextFunction);
});

export { router, slug };