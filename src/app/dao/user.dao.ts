import User, { UserCreationAttributes } from "../models/User.model";
import { UserRepository } from "../repositories/UserRepository";

export class UserDao implements UserRepository {
  async create(payload: UserCreationAttributes): Promise<User> {
    const user = await User.create(payload);
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
