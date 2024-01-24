import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CodesDocument = mongoose.HydratedDocument<code>; //<name of collection in Mongo>

@Schema()
export class code {
  @Prop()
  _id: string;
  @Prop()
  Descripcion: string;
  @Prop()
  Precio: string;
  @Prop()
  Tipo: string;
  @Prop()
  hotel: string;
}

export const CodesSchema = SchemaFactory.createForClass(code);
