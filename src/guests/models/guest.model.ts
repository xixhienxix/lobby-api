import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GuestDocument = mongoose.HydratedDocument<huespeds>; //<name of collection in Mongo>

@Schema({ collection: 'huespeds' })
export class huespeds {
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
  Amenidades: string[];
  @Prop()
  Tipos_Camas: string[];
  @Prop()
  Inventario: number;
  @Prop()
  Orden: number;
  @Prop()
  URL: string;  
  @Prop()
  hotel: string;
}

export const GuestSchema = SchemaFactory.createForClass(huespeds);
