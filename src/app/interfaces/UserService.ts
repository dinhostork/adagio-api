import User, { UserCreationAttributes } from "../models/User.model";

export interface CreateUserService {
    createUser(payload: UserCreationAttributes): Promise<User>;
  }
  