import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { SignupDTO } from './dtos/signup.dto';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signUp(signupData: SignupDTO) {

    const {name,email, password} = signupData;
    // cehck if email is in use
    const emailInUse = await this.UserModel.findOne({
      email: signupData.email,
    });

    if(emailInUse){
        throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
        name,
        email,
        password: hashedPassword
    })
  }

  async signIn(loginDto: LoginDTO)
  {
    // const {email, password} = loginDto;
    const findUser = await this.UserModel.findOne({
        email: loginDto.email,
      });
    
    if(!findUser){
        throw new BadRequestException('User Not Found');
    }

    const isPasswordMatch = await bcrypt.compare(loginDto.password, findUser.password);
    if(!isPasswordMatch){
        throw new BadRequestException('Invalid Password');
    }
    return findUser;
    
  }
}
