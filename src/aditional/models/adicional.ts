import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type AdicionalDocument = mongoose.HydratedDocument<code>; //<name of collection in Mongo>

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

export const AdicionalSchema = SchemaFactory.createForClass(code);