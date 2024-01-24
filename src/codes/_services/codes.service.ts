import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { code } from '../_models/codes.model';

@Injectable()
export class CodesService {
  constructor(@InjectModel(code.name) private codeModel: Model<code>) {}

  async findAll(hotel: string): Promise<code[]> {
    return this.codeModel
      .find({ hotel: hotel })
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}
