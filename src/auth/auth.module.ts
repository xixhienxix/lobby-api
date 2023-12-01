import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usuario, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: usuario.name, schema: UserSchema }]),
  ],
  controllers: [LoginController],
})
export class AuthModule {}
