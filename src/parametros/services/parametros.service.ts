import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Parametros } from '../models/parametros.model';
import { Model } from 'mongoose';

@Injectable()
export class ParametrosService {
  constructor(
    @InjectModel('Parametros') private parametrosModel: Model<Parametros>,
  ) {}

  async getAll(hotel: string): Promise<Parametros> {
    return this.parametrosModel
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

  async postParametros(hotel: string, body: any) {
    const filter = { hotel: hotel };
    await this.parametrosModel
      .updateOne(filter, body.parametros, { upsert: true })
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
