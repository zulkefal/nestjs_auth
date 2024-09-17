import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { SignupDTO } from './dtos/signup.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';
import { PasswordDTO } from './dtos/password.dto';
import { RefreshToken } from './schema/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name) private readonly RefreshTokenNodel: Model<RefreshToken>,
  ) {}
  async signUp(signupData: SignupDTO) {
    const { name, email, password } = signupData;
    // cehck if email is in use
    const emailInUse = await this.UserModel.findOne({
      email: signupData.email,
    });

    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return 'User Created';
  }

  async signIn(loginDto: LoginDTO) {
    // const {email, password} = loginDto;
    const findUser = await this.UserModel.findOne({
      email: loginDto.email,
    });

    if (!findUser) {
      throw new BadRequestException('User Not Found');
    }

    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      findUser.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const accessTo= this.generateUserTokens(findUser._id);

    return accessTo;
  }

  async updatePassword(updatePassDto: PasswordDTO) {
    const findUser = await this.UserModel.findOne({
      email: updatePassDto.email,
    });

    if (!findUser) {
      throw new BadRequestException('User Not Found');
    }

    const hashedPassword = await bcrypt.hash(updatePassDto.newPassword, 10);

    await this.UserModel.updateOne(
      { email: updatePassDto.email },
      { password: hashedPassword },
    );
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1d' });
    // const refreshToken = uuidv4();
    // await this.storeRefreshToken(refreshToken, userId);
    // await this.storeRefreshToken(userId);
    return {
      accessToken 
      };

    // return {
    //   accessToken,
    //   refreshToken
    // };
  }

  async storeRefreshToken (userId){
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenNodel.create({
      userId,
      expiryDate
    });
  }

  async findRefreshToken(refreshToken:string){
    const token = await this.RefreshTokenNodel.findOne({token: refreshToken});
    if(!token){
      throw new BadRequestException('Invalid Token');
    }
    if(token.expiryDate < new Date()){
      throw new BadRequestException('Token Expired');
    }

    return this.generateUserTokens(token.userId);
  }

  async getAllUser(){
    return this.UserModel.find();
  }

  async logOut(token: string) {
    // await this.RefreshTokenNodel.delete({ token });
    return 'Logged Out';
  }
}
