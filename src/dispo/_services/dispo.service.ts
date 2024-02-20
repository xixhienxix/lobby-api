import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { disponibilidad } from '../_models/dispo.model';
import { Model } from 'mongoose';

@Injectable()
export class DisponibilidadService {
  constructor(
    @InjectModel(disponibilidad.name) private dispoModel: Model<disponibilidad>,
  ) {}

  async postDisponibilidadBooking(body): Promise<any> {
    const llegada = new Date(body.fechaInicial);
    const salida = new Date(body.fechaFinal);

    return this.dispoModel
      .insertMany({
        Cuarto: 'Bingo',
        Habitacion: '102B',
        Estatus: 1,
        Llegada: llegada,
        Salida: salida,
        Estatus_AMA: 'Limpio',
        Folio: '123123',
        hotel: 'Hotel Pokemon ',
      })
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

  async getDisponibilidadBooking(params): Promise<disponibilidad[]> {
    return this.dispoModel
      .find({
        fechaInicial: '16/2/2024',
        fechaFinal: '17/2/2024',
        dias: '1',
        hotel: 'Hotel Pokemon ',
      })
      .then((data) => {
        console.log('dataResponse', data);
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
