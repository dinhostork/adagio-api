import User, { UserCreationAttributes, UserWithoutPassword } from "../models/User.model";

export interface UserRepository {
  findById(userId: string | undefined): unknown;
  findByEmail(email: string): Promise<User | null>;
  create(payload: UserCreationAttributes): Promise<UserWithoutPassword>;
}
