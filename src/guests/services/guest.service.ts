import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promesas, huespeds } from '../models/guest.model';
import { Foliador } from 'src/codes/_models/codes.model';
@Injectable()
export class GuestService {
  constructor(
    @InjectModel(huespeds.name) private guestModel: Model<huespeds>,
    @InjectModel('Foliador') private readonly foliadorModel: Model<Foliador>,
    @InjectModel('Promesas') private readonly promesasModel: Model<Promesas>,
  ) {}

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

  async findbyCode(hotel: string, code: string): Promise<huespeds[]> {
    return this.guestModel
      .find({ habitacion: code, hotel: hotel })
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

  async findbyCodeAndDate(hotel: string, code: string): Promise<huespeds[]> {
    return this.guestModel.find({
      hotel: hotel,
      habitacion: code,
      $expr: {
        $gte: [
          {
            $dateFromString: {
              dateString: '$salida',
            },
          },
          new Date(),
        ],
      },
    });
  }

  async onReservationResize(hotel: string, data: any): Promise<huespeds[]> {
    return this.guestModel
      .findOneAndUpdate(
        { folio: data.data.folio, hotel: hotel },
        {
          $set: {
            llegada: data.data.StartTime,
            salida: data.data.EndTime,
            noches: data.data.stayNights,
            tarifa: data.data.Tarifa,
            porPagar: data.data.totalSeleccionado,
            pendiente: data.data.totalSeleccionado,
            habitacion: data.data.cuarto,
            numeroCuarto: data.data.numeroCuarto,
          },
        },
      )
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

  async getDisponibilidad(hotel: string, params: any): Promise<any> {
    const busqueda = params.params;
    const sinDisponibilidad = [];
    const fechaInicial = new Date(busqueda.initialDate);
    const fechaFinal = new Date(busqueda.endDate);

    const dispoquery = this.guestModel
      .find({
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $dateFromString: {
                    dateString: '$llegada',
                  },
                },
                new Date(busqueda.initialDate),
              ],
            },
            {
              $lt: [
                {
                  $dateFromString: {
                    dateString: '$llegada',
                  },
                },
                new Date(busqueda.endDate),
              ],
            },
          ],
        },
      })
      .catch((err) => {
        return err;
      });

    const disponibilidad = await dispoquery.then((doc: any) => {
      for (let i = 0; i < doc.length; i++) {
        sinDisponibilidad.push(doc[i]._doc.numeroCuarto);
      }
      return sinDisponibilidad;
    });

    return disponibilidad;
  }

  async postReservation(hotel: string, body: any): Promise<any> {
    const huespedArr = body.huespedInfo;

    huespedArr.forEach((element, index) => {
      const folio = element.folio.replace(/\D/g, '');
      const folioIncreses = parseInt(folio) + index;
      element.folio = element.folio.split(/\d+/)[0] + folioIncreses;

      const huesped = { ...element, hotel };
      this.guestModel
        .create(huesped)
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
    });

    const folio = huespedArr[0].folio.replace(/\D/g, '');
    const folioIncreses = parseInt(folio) + huespedArr.length;
    const letraFolio = huespedArr[0].folio.split(/\d+/)[0];
    const filter = { hotel: hotel, Letra: letraFolio };
    const update = { Folio: folioIncreses };

    this.foliadorModel
      .findOneAndUpdate(filter, update)
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

  //PROMESAS

  async findPromesas(hotel: string, body: any): Promise<huespeds[]> {
    const folio = body.Folio;
    return this.promesasModel
      .find({ Folio: folio, hotel: hotel })
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

  async updateStatus(hotel: string, body: any): Promise<huespeds[]> {
    const folio = body.folio;
    return this.guestModel
      .updateOne(
        { folio: body.folio, hotel: hotel },
        {
          $set: {
            llegada: body.llegada,
            salida: body.salida,
            tarifa: body.tarifa,
            numeroCuarto: body.numeroCuarto,
            habitacion: body.habitacion,
            notas: body.notas,
            estatus: body.estatus,
          },
        },
      )
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
