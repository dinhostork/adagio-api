import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../interfaces/auth";
import { UserService } from "../services/User.service";

export class AuthController {
  constructor(private readonly accountService: UserService) {}

  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: AuthPayload = req.body;

      const user = await this.accountService.findUserByEmail(payload.email);

      const token = this.accountService.authenticate(user!);

      return res.status(200).json({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
