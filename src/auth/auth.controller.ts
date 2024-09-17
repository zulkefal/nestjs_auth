import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/signup.dto';
import { get } from 'http';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//SignUp

@Post('signup') // /auth/signup
async signUp(@Body() signupData: SignupDTO){
  return this.authService.signUp(signupData);
}

@Get('login')// /auth/login
async login(@Body() loginData: LoginDTO){
  return this.authService.signIn(loginData);
}

//LOGIN
//Refresh Token
}
