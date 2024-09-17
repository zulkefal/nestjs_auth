import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
