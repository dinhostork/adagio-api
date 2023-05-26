import { createAuthController } from "../app/factories/createAuthController";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/auth";

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const authController = createAuthController();
  return await authController.authenticate(req, res, next);
});

export { router, slug };
