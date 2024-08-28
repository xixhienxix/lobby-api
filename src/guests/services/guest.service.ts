import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HuespedDetails, Promesas, huespeds } from '../models/guest.model';
import { estatus, Foliador } from 'src/codes/_models/codes.model';
@Injectable()
export class GuestService {
  constructor(
    @InjectModel(huespeds.name) private guestModel: Model<huespeds>,
    @InjectModel('Foliador') private readonly foliadorModel: Model<Foliador>,
    @InjectModel('Promesas') private readonly promesasModel: Model<Promesas>,
    @InjectModel('Estatus') private readonly estatusModel: Model<estatus>,
    @InjectModel('Detalles_Huesped')
    private readonly huespedDetailsModel: Model<HuespedDetails>,
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
            tarifa: data.data.tarifaSeleccionada[0].Tarifa,
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

  async onModificaHuesped(hotel: string, data: any): Promise<huespeds[]> {
    const huespedModificado = data.data[0];

    try {
      const updatedHuesped = await this.guestModel.findOneAndUpdate(
        { folio: huespedModificado.folio, hotel: hotel },
        {
          $set: {
            ...huespedModificado,
          },
        },
        { new: true }, // This option ensures the modified document is returned
      );

      return updatedHuesped ? [updatedHuesped] : [];
    } catch (err) {
      console.error(err);
      throw new Error('Error updating the guest');
    }
  }

  async getDisponibilidad(hotel: string, params: any): Promise<any> {
    const busqueda = params.params;
    const sinDisponibilidad = [];
    console.log('busqueda: ', busqueda);

    const dispoquery = this.guestModel
      .find({
        hotel: hotel,
        // salida: { $ne: busqueda.initialDate },  Excluir casos donde salida sea igual a initialDate
        $or: [
          // Caso 1: La fecha de llegada de la reservación está dentro del rango proporcionado
          {
            llegada: {
              $gte: busqueda.initialDate,
              $lt: busqueda.endDate,
            },
          },
          // Caso 2: La fecha de salida de la reservación está dentro del rango proporcionado
          {
            salida: {
              $gt: busqueda.initialDate,
              $lte: busqueda.endDate,
            },
          },
          // Caso 3: La reservación abarca completamente el rango proporcionado
          {
            llegada: {
              $lt: busqueda.initialDate,
            },
            salida: {
              $gt: busqueda.endDate,
            },
          },
        ],
      })
      .catch((err) => {
        return err;
      });

    const disponibilidad = await dispoquery.then((doc: any) => {
      console.log('dispoAntes:', doc);
      for (let i = 0; i < doc.length; i++) {
        sinDisponibilidad.push(doc[i]._doc.numeroCuarto);
      }
      return sinDisponibilidad;
    });

    return disponibilidad;
  }

  async postReservation(hotel: string, body: any): Promise<any> {
    const huespedArr = body.huespedInfo;
    const addedDocuments: any[] = [];

    const updatePromises = huespedArr.map(async (element, index) => {
      const folio = element.folio.replace(/\D/g, '');
      const folioIncreses = parseInt(folio) + index;
      element.folio = element.folio.split(/\d+/)[0] + folioIncreses;

      const huesped = { ...element, hotel };

      try {
        const data = await this.guestModel.create(huesped);
        console.log('data returned from update query:', data);
        if (!data) {
          return {
            message: 'No se pudo actualizar los datos intente mas tarde',
          };
        }
        addedDocuments.push(data); // Collect the added document
        return { message: 'Habitacion actualizada con exito' };
      } catch (err) {
        console.log(err);
        return err;
      }
    });

    // Wait for all guest updates to complete
    await Promise.all(updatePromises);

    // Update the foliadorModel
    const folio = huespedArr[0].folio.replace(/\D/g, '');
    const folioIncreses = parseInt(folio) + huespedArr.length;
    const letraFolio = huespedArr[0].folio.split(/\d+/)[0];
    const filter = { hotel: hotel, Letra: letraFolio };
    const update = { Folio: folioIncreses };

    try {
      const data = await this.foliadorModel.findOneAndUpdate(filter, update);
      if (!data) {
        return {
          message: 'No se pudo actualizar los datos intente mas tarde',
          addedDocuments,
        };
      }
      return { message: 'Folio actualizado con exito', addedDocuments };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // Huesped

  async updateHuesped(hotel: string, body: any): Promise<huespeds[]> {
    console.log('update Huesped', body);
    return this.guestModel
      .findOneAndUpdate(
        { folio: body.data.folio, hotel: hotel },
        {
          $set: {
            estatus: body.huesped.estatus,
            noches: body.huesped.noches,
            numeroCuarto: body.huesped.numeroCuarto,
            llegada: body.huesped.llegada,
            salida: body.huesped.salida,
            habitacion: body.huesped.habitacion,
            tarifa: body.huesped.tarifa,
            pendiente: body.huesped.pendiente,
            porPagar: body.huesped.porPagar,
            tipoHuesped: body.huesped.tipoHuesped,
            nombre: body.huesped.nombre,
            email: body.huesped.email,
            telefono: body.huesped.telefono,
            notas: body.huesped.notas,
            ID_Socio: body.huesped.ID_Socio,
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

  //PROMESAS

  async findPromesas(hotel: string, folio: any): Promise<huespeds[]> {
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
    return this.guestModel
      .findOneAndUpdate(
        { folio: body.huesped.folio, hotel: hotel },
        {
          $set: {
            llegada: body.huesped.llegada,
            salida: body.huesped.salida,
            tarifa: body.huesped.tarifa,
            numeroCuarto: body.huesped.numeroCuarto,
            habitacion: body.huesped.habitacion,
            notas: body.huesped.notas,
            estatus: body.huesped.estatus,
          },
        },
      )
      .then((data) => {
        if (!data) {
          console.log(data);
          return;
        }
        if (data) {
          console.log(data);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  // HUESPED DETAILS

  async getDetails(hotel: string): Promise<HuespedDetails[]> {
    return this.huespedDetailsModel
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

  async getDetailsById(
    hotel: string,
    folio: string,
  ): Promise<HuespedDetails[]> {
    return this.huespedDetailsModel
      .findOne({ ID_Socio: folio, hotel: hotel })
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

  async postDetails(hotel: string, body: any): Promise<HuespedDetails[]> {
    console.log('body post huesped details', body);
    return this.huespedDetailsModel
      .findOneAndUpdate(
        {
          ID_Socio: body.ID_Socio,
          hotel: hotel,
        },
        {
          $set: {
            ID_Socio: body.ID_Socio,
            Nombre: body.Nombre,
            email: body.email,
            telefono: body.telefono,
            tipoHuesped: body.tipoHuesped,
            fechaNacimiento: body.fechaNacimiento,
            trabajaEn: body.trabajaEn,
            tipoDeID: body.tipoDeID,
            numeroDeID: body.numeroDeID,
            direccion: body.direccion,
            pais: body.pais,
            ciudad: body.ciudad,
            codigoPostal: body.codigoPostal,
            lenguaje: body.lenguaje,
            notas: body.notas,
          },
        },
        { upsert: true },
      )
      .then((data) => {
        if (!data) {
          console.log(data);
          return;
        }
        if (data) {
          console.log(data);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async updateEstatusHuesped(hotel: string, body: any): Promise<any> {
    console.log('body----------------------->: ', body);
    let estatusActualizado = body.estatus;
    switch (body.estatus) {
      case '1':
        estatusActualizado = 'Huesped en Casa';
        break;
      case '2':
        estatusActualizado = 'Reserva Sin Pago';
        break;
      case '3':
        estatusActualizado = 'Reserva Confirmada';
        break;
      case '4':
        estatusActualizado = 'Check-Out';
        return this.guestModel
          .updateOne(
            { folio: body.folio },
            {
              $set: {
                estatus: estatusActualizado,
                pendiente: body.huesped.pendiente,
                porPagar: body.huesped.porPagar,
                noches: body.huesped.noches,
                hotel: hotel,
              },
            },
          )
          .then((data) => {
            if (!data) {
              console.log(data);
              return;
            }
            if (data) {
              console.log(data);
              return data;
            }
          })
          .catch((err) => {
            return err;
          });
        break;
      case '5':
        estatusActualizado = 'Uso Interno';
        break;
      case '6':
        estatusActualizado = 'Bloqueo / Sin Llegadas';
        break;
      case '7':
        estatusActualizado = 'Reserva Temporal';
        break;
      case '8':
        estatusActualizado = 'Esperando Deposito';
        break;
      case '9':
        estatusActualizado = 'Deposito Realizado';
        break;
      case '10':
        estatusActualizado = 'Totalmente Pagada';
        break;
      case '11':
        estatusActualizado = 'No Show';
        break;
      case '12':
        estatusActualizado = 'Reserva Cancelada';
        break;
    }
    console.log('folio', body.folio);
    console.log('hotel', hotel);
    console.log('estatusActualizado', estatusActualizado);
    return this.guestModel
      .updateOne(
        { folio: body.huesped.folio, hotel: hotel },
        { $set: { estatus: estatusActualizado } },
      )
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log('Update successful:', data);
          return data;
        } else {
          console.log('No document was updated:', data);
          return;
        }
      })
      .catch((err) => {
        console.error('Update failed:', err);
        throw err; // Re-throw the error to handle it further up the chain if needed
      });
  }
}
