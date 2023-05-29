import User, {
  UserCreationAttributes,
  UserWithoutPassword,
} from "../models/User.model";
import { UserRepository } from "../repositories/UserRepository";

export class UserDao implements UserRepository {
  async create(payload: UserCreationAttributes): Promise<UserWithoutPassword> {
    const user = (await User.create(payload)) as UserWithoutPassword;
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
