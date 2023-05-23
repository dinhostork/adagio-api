import { UserCreationAttributes } from "../models/User.model";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(payload: UserCreationAttributes) {
    const user = await this.userRepository.create(payload);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
