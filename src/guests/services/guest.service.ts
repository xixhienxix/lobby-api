import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { huespeds } from '../models/guest.model';
@Injectable()
export class GuestService {
  constructor(@InjectModel(huespeds.name) private guestModel: Model<huespeds>) {}

  async findAll(hotel: string): Promise<huespeds[]> {
    return this.guestModel
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

  async findbyCode(hotel: string, code:string): Promise<huespeds[]> {
    return this.guestModel
      .find({ habitacion:code, hotel: hotel })
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
