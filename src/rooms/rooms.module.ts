import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsSchema, room } from 'src/rooms/models/rooms.model';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers.ts/rooms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: room.name, schema: RoomsSchema }]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
