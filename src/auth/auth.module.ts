import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userInfo } from './models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userInfo }])],
  controllers: [LoginController],
})
export class AuthModule {}
