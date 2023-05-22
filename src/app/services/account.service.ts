import { UserCreationAttributes } from "../models/User.model";
import { UserRepository } from "../repositories/UserRepository";

export class AccountService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAccount(payload: UserCreationAttributes) {
    const user = await this.userRepository.create(payload);
    return user;
  }

  async findAccountByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
