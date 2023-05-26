import { autenticated } from "../middlewares/autenticated";
import { createUserController } from "../app/factories/createUserController";
import { Router, Request, Response, NextFunction } from "express";
import { ProtectedRequest } from "@/app/interfaces/protectedRequest";

const router = Router();
const slug = "/users";

router.post("/", (req: Request, res: Response, nextFunction: NextFunction) => {
  const userController = createUserController();
  return userController.createUser(req, res, nextFunction);
});

router.use(autenticated);

router.get("/", (req: ProtectedRequest, res: Response, nextFunction: NextFunction) => {
  return res.json({ message: "protected route" });
});

export { router, slug };
