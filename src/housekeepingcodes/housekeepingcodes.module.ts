import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoliadorSchema } from 'src/codes/_models/codes.model';
import { HouseKeeping, HouseKeepingSchema } from './models/housekeeping.model';
import { HouseKeepingCodesController } from './controllers/housekeepingcodes.controller';
import { HouseKeepingService } from './services/housekeepingcodes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HouseKeeping.name, schema: HouseKeepingSchema },
    ]),
  ],
  controllers: [HouseKeepingCodesController],
  providers: [HouseKeepingService],
  exports: [HouseKeepingService]
})
export class HouseKeepingModule {}
