import User, { UserCreationAttributes } from "../models/User.model";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(payload: UserCreationAttributes): Promise<User>;
}
