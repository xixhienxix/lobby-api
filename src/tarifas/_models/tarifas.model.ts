import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TarifasDocument = mongoose.HydratedDocument<tarifas>; //<name of collection in Mongo>

@Schema({ collection: 'Tarifas' })
export class tarifas {
  @Prop()
  Tarifa: string;
  @Prop()
  Habitacion: string[];
  @Prop()
  Llegada: string;
  @Prop()
  Salida: string;
  @Prop()
  Plan: string;
  @Prop()
  Politicas: string;
  @Prop()
  EstanciaMinima: number;
  @Prop()
  EstanciaMaxima: number;
  @Prop()
  TarifaRack: number;
  @Prop()
  TarifaXAdulto: string[];
  @Prop()
  TarifaXNino: string[];
  @Prop()
  Estado: boolean;
  @Prop()
  Dias: string[];
  @Prop()
  Adultos: number;
  @Prop()
  Ninos: number;
  @Prop()
  Descuento: number;
  @Prop()
  hotel: string;
}

export const TarifasSchema = SchemaFactory.createForClass(tarifas);
