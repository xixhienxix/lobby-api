import { Injectable } from '@nestjs/common';
import { tarifas } from '../_models/tarifas.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TarifasService {
  constructor(
    @InjectModel(tarifas.name) private tarifasModel: Model<tarifas>,
  ) {}

  async findAllRates(hotel: string): Promise<tarifas[]> {
    return this.tarifasModel
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

  async findAllRackRates(hotel: string): Promise<tarifas[]> {
    return this.tarifasModel
      .find({ Tarifa: 'Tarifa Estandar', hotel: hotel })
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

  async postTarifa(hotel, body): Promise<tarifas[]> {
    return this.tarifasModel
      .create(
        {
          Tarifa: body.tarifa.Tarifa,
          Habitacion: body.tarifa.Habitacion,
          Llegada: body.tarifa.Llegada,
          Salida: body.tarifa.Salida,
          Plan: body.tarifa.Plan,
          Politicas: body.tarifa.Politicas,
          EstanciaMinima: body.tarifa.EstanciaMinima,
          EstanciaMaxima: body.tarifa.EstanciaMaxima,
          TarifaRack: body.tarifa.TarifaRack,
          TarifaXAdulto: body.tarifa.TarifaXAdulto,
          TarifaXNino: body.tarifa.TarifaXNino,
          Estado: body.tarifa.Estado,
          Dias: body.tarifa.Dias,
          Adultos: body.tarifa.Adultos,
          Ninos: body.tarifa.Ninos,
          Descuento: body.tarifa.Descuento,
          Tarifa_Especial_1: body.tarifa.Tarifa_Especial_1,
          Tarifa_Especial_2: body.tarifa.Tarifa_Especial_2,
          Tarifa_Extra_Con: body.tarifa.Tarifa_Extra_Con,
          Tarifa_Extra_Sin: body.tarifa.Tarifa_Extra_Sin,
          Tarifa_Sin_Variantes: body.tarifa.Tarifa_Sin_Variantes,
          Visibilidad: body.tarifa.Visibilidad,
          Cancelacion: body.tarifa.Cancelacion,
          hotel: hotel,
        },
        { new: true, upsert: true },
      )
      .then((data) => {
        if (!data) {
          return {
            message: 'No se pudo Guardar la Tarifa Intente de nuevo mas tarde',
          };
        }
        if (data) {
          console.log('Agregada con exito: ', data);
          return { message: 'Tarifa generada con exito' };
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async updateTarifaBase(hotel, body): Promise<tarifas> {
    const update = body.tarifas;

    return this.tarifasModel
      .findOneAndUpdate(
        {
          hotel: hotel,
          Tarifa: body.tarifas.Tarifa,
          Habitacion: body.tarifas.Habitacion,
        },
        update,
        { upsert: true, setDefaultsOnInsert: true, new: true },
      )
      .then((data) => {
        if (!data) {
          return {
            message: 'No se pudo Guardar la Tarifa Intente de nuevo mas tarde',
          };
        }
        if (data) {
          console.log('Agregada con exito: ', data);
          return { message: 'Tarifa generada con exito' };
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async updateTarifaEspecial(hotel, body): Promise<tarifas> {
    const update = body.tarifas;

    return this.tarifasModel
      .findOneAndUpdate(
        {
          hotel: hotel,
          Tarifa: body.tarifas.Tarifa,
          Habitacion: body.tarifas.Habitacion,
        },
        update,
        { upsert: true, setDefaultsOnInsert: true, new: true },
      )
      .then((data) => {
        if (!data) {
          return {
            message: 'No se pudo Guardar la Tarifa Intente de nuevo mas tarde',
          };
        }
        if (data) {
          console.log('Agregada con exito: ', data);
          return { message: 'Tarifa generada con exito' };
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async deleteTarifa(hotel, tarifa: string): Promise<any> {
    return this.tarifasModel
      .deleteOne({ Tarifa: tarifa, hotel: hotel })
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
