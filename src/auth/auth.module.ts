import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usuario, UserSchema } from './models/user.model';
import { HotelsController } from './controllers/hotels.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: usuario.name, schema: UserSchema }]),
  ],
  controllers: [LoginController, HotelsController],
  providers: [UserService],
})
export class AuthModule {}
