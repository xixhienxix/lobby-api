import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { room } from '../models/rooms.model';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(room.name) private habModel: Model<room>) {}

  async findAll(hotel: string): Promise<room[]> {
    return this.habModel
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

  async postRoom(hotel: string, body: any): Promise<any> {
    return this.habModel.findOneAndUpdate(
      { hotel: hotel, _id: body.habitacion._id },
      {
        Codigo: body.habitacion.Codigo,
        Numero: body.habitacion.Numero,
        Descripcion: body.habitacion.Descripcion,
        Tipo: body.habitacion.Tipo,
        Adultos: body.habitacion.Adultos,
        Ninos: body.habitacion.Ninos,
        Vista: body.habitacion.Vista,
        Camas: body.habitacion.Camas,
        Inventario: body.habitacion.Inventario,
        checkbox: false,
        Orden: body.habitacion.Orden,
        Tarifa: body.habitacion.Tarifa,
        Amenidades: body.habitacion.Amenidades,
        Tipos_Camas: body.habitacion.Tipos_Camas,
        hotel: hotel,
      },
      function (err, result) {
        if (err) {
          return err;
        } else {
          return {
            message: 'Habitaciones Dadas de Alta',
          };
        }
      },
    );
  }
}
