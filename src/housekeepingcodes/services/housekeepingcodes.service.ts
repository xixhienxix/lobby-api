import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Foliador } from 'src/codes/_models/codes.model';
import { HouseKeeping } from '../models/housekeeping.model';
@Injectable()
export class HouseKeepingService {
  constructor(@InjectModel(HouseKeeping.name) private houseKeepingModel: Model<HouseKeeping>) {}

  async findAll(hotel: string): Promise<HouseKeeping[]> {
    return this.houseKeepingModel
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

