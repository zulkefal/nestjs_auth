import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDTO } from './dtos/signup.dto';
import { LoginDTO } from './dtos/login.dto';
import { PasswordDTO } from './dtos/password.dto';
import { RefreshTokenDTO } from './dtos/refreshToken.dto';
import { AuthGuard } from 'src/gurads/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')// /auth/login
  async login(@Body() loginData: LoginDTO){
    return this.authService.signIn(loginData);
  }

//SignUp
@Post('signup') // /auth/signup
async signUp(@Body() signupData: SignupDTO){
  return this.authService.signUp(signupData);
}

@Post('update-password') // /auth/update-password
async updatePassword(@Body() updatePassDto: PasswordDTO){
  return this.authService.updatePassword(updatePassDto);
}

@Get('refresh')
async refreshToken(@Body() refreshToken: RefreshTokenDTO){
  return this.authService.findRefreshToken(refreshToken.token);
}

@UseGuards(AuthGuard)
@Get('allUser')
async getAllUser(){
  return this.authService.getAllUser();
}

// @Post('logout')
// @HttpCode(HttpStatus.OK)
// async logout(@Res() res: Response) {
//   return this.authService.logOut();
// }


//LOGIN
//Refresh Token
}
