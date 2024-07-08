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
  Llegada: Date;
  @Prop()
  Salida: Date;
  @Prop()
  Plan: string;
  @Prop({ type: Object })
  Politicas: any;
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
  @Prop({ type: Object })
  Tarifa_Especial_1: any;
  @Prop({ type: Object })
  Tarifa_Especial_2: any;
  @Prop({ type: Object })
  Tarifa_Sin_Variantes: any;
  @Prop({ type: Object })
  Tarifa_Extra_Sin: any;
  @Prop({ type: Object })
  Tarifa_Extra_Con: any;
  @Prop({ type: Object })
  Visibilidad: any;
  @Prop({ type: Object })
  Cancelacion: any;
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
