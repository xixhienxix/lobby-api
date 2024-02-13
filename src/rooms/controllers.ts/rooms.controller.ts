import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { RolesUserGuard } from 'src/guards/roles.user.guard';

@Controller()
export class RoomsController {
  constructor(private _habitacionService: RoomsService) {}

  @Get('/habitaciones')
  @UseGuards(RolesUserGuard)
  async findAllRooms(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._habitacionService.findAll(hotel);
  }

  @Post('/habitacion/guardar')
  @UseGuards(RolesUserGuard)
  async postRoom(@Body() body, @Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];
    return this._habitacionService.postRoom(hotel, body);
  }
}
