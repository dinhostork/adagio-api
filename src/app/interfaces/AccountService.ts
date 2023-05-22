import User, { UserCreationAttributes } from "../models/User.model";

export interface CreateAccountService {
    createAccount(payload: UserCreationAttributes): Promise<User>;
  }
  