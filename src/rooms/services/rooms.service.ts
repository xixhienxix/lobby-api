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
    const filter = { Codigo: body.habitacion.Codigo };
    const update = body.habitacion;

    if (body.editar === true) {
      return this.habModel
        .findOneAndUpdate(filter, update)
        .then((data) => {
          console.log('data returned from update qery:', data);
          if (!data) {
            return {
              message: 'No se pudo actualizar los datos intente mas tarde',
            };
          }
          if (data) {
            return { message: 'Habitacion actualizada con exito' };
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      const response = [];
      const errors = [];
      for (let i = 0; i < body.habitacion.Inventario; i++) {
        await this.habModel
          .create({
            Codigo: body.habitacion.Codigo,
            Numero: body.habitacion.Numero[i].nombreHabs,
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
          })
          .then((data) => {
            if (!data) {
              response.push({
                message:
                  'No se pudo agregar la habitacion intente de nuevo mas tarde',
              });
            }
            if (data) {
              return { message: 'Habitaciones Dadas de Alta' };
            }
          })
          .catch((err) => {
            errors.push(err);
            return err;
          });
      }
      if (errors) {
        return errors;
      } else {
        return response;
      }
    }
  }
}
