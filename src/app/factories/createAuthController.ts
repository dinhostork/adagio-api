import { AuthController } from "../controllers/AuthController";
import { UserDao } from "../dao/user.dao";
import { UserService } from "../services/User.service";

export const createAuthController = () => {
  const userRepository = new UserDao();
  const accountService = new UserService(userRepository);

  return new AuthController(accountService);
};
