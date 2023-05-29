import User, { UserCreationAttributes, UserWithoutPassword } from "../models/User.model";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(payload: UserCreationAttributes): Promise<UserWithoutPassword>;
}
