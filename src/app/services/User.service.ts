import User, { UserCreationAttributes } from "../models/User.model";
import { UserRepository } from "../repositories/UserRepository";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(payload: UserCreationAttributes) {
    const user = await this.userRepository.create(payload);
    user.password = undefined;
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  authenticate(user: User) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: 86400,
    });
  }
}
