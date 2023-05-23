import { Request, Response } from "express";
import { UserCreationAttributes } from "../models/User.model";
import {
  BadRequestError,
  InternalServerError,
} from "../../utils/errors/httpErrors";
import { UserService } from "../services/User.service";
import * as Yup from "yup";

export class UserController {
  constructor(private readonly accountService: UserService) {}

  async createUser(request: Request, response: Response, next: any) {
    try {
      const payload: UserCreationAttributes = request.body;

      if (!payload.email || !payload.password) {
        throw new BadRequestError("Missing email or password");
      }

      if(Yup.string().email().required().isValidSync(payload.email) === false){
        throw new BadRequestError("Invalid email");
      }
      

      if (await this.accountService.findUserByEmail(payload.email)) {
        throw new BadRequestError("Email already exists");
      }

      const user = await this.accountService.createUser(payload);
      return response.json(user);
    } catch (err: any) {
      next(err);
    }
  }
}
