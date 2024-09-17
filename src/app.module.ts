import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUserModule } from './login-user/login-user.module';
import { LoginUserModule } from './login-user/login-user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestJsAuth'),AuthModule, LoginUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
