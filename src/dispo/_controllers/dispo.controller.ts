import { DisponibilidadService } from '../_services/dispo.service';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';

@Controller()
export class DispoController {
  constructor(private _disponibilidadService: DisponibilidadService) {}

  @Get('/disponibilidad/booking')
  findAllRooms(@Query() params) {
    return this._disponibilidadService.getDisponibilidadBooking(params);
  }

  @Get('/reportes/disponibilidad')
  findAvaibility(@Query() params, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._disponibilidadService.getAvailavility(hotel, params);
  }

  @Post('/disponibilidad/booking')
  postDisponibilidad(@Body() body) {
    return this._disponibilidadService.postDisponibilidadBooking(body);
  }
}
