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
    console.log(params);
    const llegadaIsoDate = new Date(params.fechaInicial).toISOString();
    const salidaIsoDate = new Date(params.fechaFinal).toISOString();
    console.log('llegadaIsoDate', llegadaIsoDate);
    console.log('salidaIsoDate', salidaIsoDate);

    return this.dispoModel
      .find({
        Llegada: {
          $gte: new Date(params.fechaInicial),
          $lt: new Date(params.fechaFinal),
        },
        hotel: params.hotel,
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

  async getAvailavility(hotel: string, params): Promise<any> {

    const numeroCuarto = params.numCuarto
    const codigoCuarto = params.codigoCuarto
    const cuarto = params.cuarto
    const dias = params.dias
    const folio = params.folio

    let dispoquery; 

    console.log(params.initialDate)
    console.log(params.endDate)
    console.log("HOTEL: ",hotel)

    let mySet = new Set();
    let sinDisponibilidad=[];
    let setArray=[]

    //Estatus:0=No Disponible (Ni Llegadas ni Salidas)
    //Estatus:1=Disponible
    //Estatus:2=No Llegadas
    //Estatus:3=No Salidas
    //Estatus:4=Fuera de Servicio

    if(cuarto != '1'){
      dispoquery = this.dispoModel.find({
        $and: [
          {
            $or:[
              {
                Llegada: {
                $gte: new Date(params.initialDate) 
                }
              },
              {
                Salida: {
                $lte: new Date(params.endDate)
                }
              },
            ]
          },
          {        
            hotel: hotel,
          },
          {
            Cuarto:codigoCuarto
          }
        ]
      }).catch((err) => {
        return err;
      });
    }else{
      dispoquery = this.dispoModel.find({ 
        $and: [
        {
          $or:[
            {
              Llegada: {
              $gte: new Date(params.initialDate) 
              }
            },
            {
              Salida: {
              $lte: new Date(params.endDate)
              }
            },
          ]
        },
        {        
          hotel: hotel,
        }
      ]
      }).catch((err) => {
             return err;
           });
    }

    const disponibilidad = await dispoquery.then((doc:any)=> {
                                  for(let i=0;i<doc.length;i++){
                                      sinDisponibilidad.push(doc[i]._doc.Habitacion)
                                    }
                                  return sinDisponibilidad;
                                  })

  return disponibilidad

  }
}
