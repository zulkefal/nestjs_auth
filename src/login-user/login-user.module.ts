import { Module } from '@nestjs/common';
import { LoginUserService } from './login-user.service';
import { LoginUserController } from './login-user.controller';

@Module({
  controllers: [LoginUserController],
  providers: [LoginUserService],
})
export class LoginUserModule {}
