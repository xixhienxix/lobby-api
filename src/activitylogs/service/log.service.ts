import { Injectable } from '@nestjs/common';
import { Log } from '../models/log.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel('Log') private logModel: Model<Log>) {}

  async getLogsByUser(hotel: string) {
    try {
      return this.logModel
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
    } catch (err) {
      console.error('Error fetching logs:', err);
      throw err;
    }
  }

  async postLogs(hotel: string, body: any) {
    console.log('Hotel', hotel);
    body.logEntry.hotel = hotel;
    // const model = {
    //   hotel: hotel,
    //   timestamp: body.logEntry.timestamp,
    //   message: body.logEntry.message,
    //   username: body.logEntry.username,
    //   folio: body.logEntry.folio,
    // };
    await this.logModel
      .create(body.logEntry)
      .then((data) => {
        if (!data) {
          return;
        }
        if (data) {
          console.log('POST activity', data);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }
}
