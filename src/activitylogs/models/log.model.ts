import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LogDocument = mongoose.HydratedDocument<Log>; //<name of collection in Mongo>

@Schema({ collection: 'Logs' })
export class Log {
  @Prop()
  folio: string;
  @Prop()
  timestamp: string;
  @Prop()
  message: string;
  @Prop()
  username: string;
  @Prop()
  hotel: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
