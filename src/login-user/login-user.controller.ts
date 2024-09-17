import { Controller } from '@nestjs/common';
import { LoginUserService } from './login-user.service';

@Controller('login-user')
export class LoginUserController {
  constructor(private readonly loginUserService: LoginUserService) {}
}
