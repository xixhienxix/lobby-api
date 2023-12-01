import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { usuario } from '../models/user.model';
import { JWTSECRET } from '../../environments/environment';
import { AuthenticationGuard } from 'src/guards/auth.guard';
import { jwtDecode } from 'jwt-decode';
import { Request } from 'express';
import { DateTime } from 'luxon';
@Controller()
export class LoginController {
  constructor(@InjectModel(usuario.name) private userModel: Model<usuario>) {}

  @Post('/api/login')
  async login(
    @Body('username') username: string,
    @Body('password') plainTextPassword: string,
  ): Promise<any> {
    const usuariosResultQuery = await this.userModel
      .findOne({ username: username, password: plainTextPassword })
      .lean()
      .then((db_res) => {
        if (db_res) {
          return db_res;
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return new Promise((resolve) => {
      if (!usuariosResultQuery) {
        resolve({ mensaje: 'usuario inexistente' });
        return;
      }
      const authJwtToken = jwt.sign(
        { usuariosResultQuery },
        JWTSECRET.JWTSECRET,
        {
          expiresIn: '30m',
        },
      );
      usuariosResultQuery.accessToken = authJwtToken;

      resolve(usuariosResultQuery);

      // password(plainTextPassword).verifyAgainst(
      //   usuariosResultQuery.passwordHash,
      //   (err: any, verified: any) => {
      //     if (!verified) {
      //       reject(new UnauthorizedException());
      //     }

      //     const authJwtToken = jwt.sign(
      //       { usuariosResultQuery },
      //       JWTSECRET.JWTSECRET,
      //       {
      //         expiresIn: '30m',
      //       },
      //     );
      //     resolve({ authJwtToken });
      //   },
      // );
    });
  }

  @Get('/api/getUserByToken')
  // @UseGuards(AuthenticationGuard)
  async getUserByToken(@Req() request: Request): Promise<any> {
    const token = request.headers.authorization;
    const hotel = request.headers['content-location'];
    console.log('hotel:  ', hotel);
    const decoded = jwtDecode(token);
    return decoded;
  }
}
