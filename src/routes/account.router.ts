import { AccountController } from "../app/controllers/AccountController";
import { UserDao } from "../app/dao/user.dao";
import { AccountService } from "../app/services/account.service";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/users";

router.post("/", (req: Request, res: Response, nextFunction: NextFunction) => {
  const userRepository = new UserDao();
  const accountService = new AccountService(userRepository);
  const accountController = new AccountController(accountService);
  return accountController.createAccount(req, res, nextFunction);
});

export { router, slug };