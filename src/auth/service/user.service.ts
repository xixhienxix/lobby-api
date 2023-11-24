import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { usuario } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(usuario.name) private userModel: Model<usuario>) {}
  //@InjectConnection() private connection: Connection

  async findAll(): Promise<usuario[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<usuario> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
