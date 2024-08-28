import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bloqueos } from '../_models/bloqueos.model';
@Injectable()
export class BloqueosService {
  constructor(
    @InjectModel('Bloqueos') private readonly bloqueosModel: Model<Bloqueos>,
  ) {}
  async findAll(hotel: string): Promise<Bloqueos[]> {
    return this.bloqueosModel
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
  async createBloqueo(hotel: string, body: any) {
    const bloqueo = {
      Habitacion: body.Habitacion,
      Cuarto: body.Cuarto,
      Desde: body.Desde,
      Hasta: body.Hasta,
      Estatus: body.bloqueoState,
      Comentarios: body.Comentarios,
      hotel: hotel, // Add if needed
    };

    try {
      const data = await this.bloqueosModel.create(bloqueo);

      if (!data) {
        return {
          message: 'No se pudo actualizar los datos, intente más tarde',
        };
      }

      return {
        message: 'Bloqueo guardado con éxito',
        document: data,
      };
    } catch (err) {
      console.error('Error creating document:', err);
      return {
        message: 'Error al crear el documento',
        error: err.message,
      };
    }
  }
}
