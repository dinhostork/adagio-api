import { AccountController } from "../controllers/AccountController";
import { UserDao } from "../dao/user.dao";
import { AccountService } from "../services/account.service";


export function createAccountController(): AccountController {
    const userRepository = new UserDao();
    const accountService = new AccountService(userRepository);
    return new AccountController(accountService);
  }