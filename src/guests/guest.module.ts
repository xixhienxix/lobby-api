import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestService } from './services/guest.service';
import { GuestSchema, huespeds } from './models/guest.model';
import { GuestsController } from './controllers/guest.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: huespeds.name, schema: GuestSchema }]),
  ],
  controllers: [GuestsController],
  providers: [GuestService],
  exports: [GuestService]
})
export class GuestModule {}
