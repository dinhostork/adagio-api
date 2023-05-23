import { UserController } from "../controllers/UserController";
import { UserDao } from "../dao/user.dao";
import { UserService } from "../services/User.service";


export function createUserController(): UserController {
    const userRepository = new UserDao();
    const accountService = new UserService(userRepository);
    return new UserController(accountService);
  }