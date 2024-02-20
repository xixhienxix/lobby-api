import { Injectable } from '@nestjs/common';
import { tarifas } from '../_models/tarifas.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TarifasService {
  constructor(
    @InjectModel(tarifas.name) private tarifasModel: Model<tarifas>,
  ) {}

  async postTarifa(hotel, body): Promise<tarifas[]> {
    console.log(body.tarifas);
    body.tarifas.hotel = hotel;
    return this.tarifasModel
      .findOneAndUpdate({ Tarifa: body.tarifas.Tarifa }, body.tarifas)
      .then((data) => {
        if (!data) {
          return {
            message: 'No se pudo Guardar la Tarifa Intente de nuevo mas tarde',
          };
        }
        if (data) {
          return { message: 'Tarifa generada con exito' };
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
