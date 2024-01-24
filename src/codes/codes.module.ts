import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodesController } from './controllers/codes.controller';
import { CodesService } from './_services/codes.service';
import { CodesSchema, code } from './_models/codes.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: code.name, schema: CodesSchema }]),
  ],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule {}
