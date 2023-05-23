import { createAccountController } from "@/app/factories/createAccountController";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/users";

router.post("/", (req: Request, res: Response, nextFunction: NextFunction) => {
  const accountController = createAccountController()
  return accountController.createAccount(req, res, nextFunction);
});

export { router, slug };