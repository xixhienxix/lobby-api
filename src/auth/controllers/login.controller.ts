import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { usuario } from '../models/user.model';
import { JWTSECRET } from '../../environments/environment';
@Controller()
export class LoginController {
  constructor(@InjectModel(usuario.name) private userModel: Model<usuario>) {}

  @Post('/api/login')
  async login(
    @Body('username') username: string,
    @Body('password') plainTextPassword: string,
  ): Promise<any> {
    const usuariosResultQuery = await this.userModel
      .findOne({ username: username })
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

    return new Promise((resolve, reject) => {
      if (!usuariosResultQuery) {
        reject('usuario inexistente');
      }
      password(plainTextPassword).verifyAgainst(
        usuariosResultQuery.passwordHash,
        (err: any, verified: any) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }
          console.log(JWTSECRET.JWTSECRET);

          const authJwtToken = jwt.sign(
            { username, roles: usuariosResultQuery.password },
            JWTSECRET.JWTSECRET,
            { expiresIn: '30m' },
          );
          resolve({ authJwtToken });
        },
      );
    });
  }
}
