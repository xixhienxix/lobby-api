import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestService } from './services/guest.service';
import { GuestSchema, PromesasSchema, huespeds } from './models/guest.model';
import { GuestsController } from './controllers/guest.controller';
import { FoliadorSchema } from 'src/codes/_models/codes.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: huespeds.name, schema: GuestSchema },
      { name: 'Foliador', schema: FoliadorSchema },
      { name: 'Promesas', schema: PromesasSchema },
    ]),
  ],
  controllers: [GuestsController],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestModule {}
