import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../app/controllers/AuthController";
import { UserDao } from "../app/dao/user.dao";
import { UserService } from "../app/services/User.service";

const router = Router();
const slug = "/auth";

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserDao();
    const accountService = new UserService(userRepository);

    const authController = new AuthController(accountService);
    return await authController.authenticate(req, res, next);
  }
);

export { router, slug };