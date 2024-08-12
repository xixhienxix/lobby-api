import { DisponibilidadService } from '../_services/dispo.service';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';

@Controller()
export class DispoController {
  constructor(private _disponibilidadService: DisponibilidadService) {}

  @Get('/disponibilidad/booking')
  findAllRooms(@Query() params) {
    return this._disponibilidadService.getDisponibilidadBooking(params);
  }

  @Post('/reportes/disponibilidad')
  findAvaibility(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._disponibilidadService.getAvailavility(hotel, body);
  }

  @Post('/disponibilidad/booking')
  postDisponibilidad(@Body() body) {
    return this._disponibilidadService.postDisponibilidadBooking(body);
  }
}
