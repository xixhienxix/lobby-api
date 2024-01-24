import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type HabitacionDocument = mongoose.HydratedDocument<room>; //<name of collection in Mongo>

@Schema()
export class room {
  @Prop()
  _id: string;
  @Prop()
  Codigo: string;
  @Prop()
  Numero: string;
  @Prop()
  Descripcion: string;
  @Prop()
  Estatus: number;
  @Prop()
  Camas: number;
  @Prop()
  Adultos: number;
  @Prop()
  Ninos: number;
  @Prop()
  Tarifa: number;
  @Prop()
  Tipo: string;
  @Prop()
  Vista: string;
  @Prop()
  Amenidades: [];
  @Prop()
  Tipos_Cama: [];
  @Prop()
  Inventario: number;
  @Prop()
  Orden: number;
  @Prop()
  URL: string;
  @Prop()
  hotel: string;
}

export const RoomsSchema = SchemaFactory.createForClass(room);
