import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { GuestService } from '../services/guest.service';

@Controller()
export class GuestsController {
  constructor(private _GuestService: GuestService) {}

  @Get('/huesped/getAll')
  @UseGuards(RolesUserGuard)
  async findAllGuests(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._GuestService.findAll(hotel);
  }

  @Post('/huesped/save')
  @UseGuards(RolesUserGuard)
  async postReservaton(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._GuestService.postReservation(hotel, body);
  }

  @Post('/disponibilidad/reservas')
  @UseGuards(RolesUserGuard)
  async getDisponibilidad(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._GuestService.getDisponibilidad(hotel, body);
  }

  @Post('/reserva/onreservaresize')
  @UseGuards(RolesUserGuard)
  async onReservationResize(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._GuestService.onReservationResize(hotel, body);
  }

  @Get('/promesas/:folio')
  @UseGuards(RolesUserGuard)
  async findPromesasByFolio(
    @Req() request: Request,
    @Body() body,
  ): Promise<any> {
    const hotel = request.headers['hotel'];
    return this._GuestService.findPromesas(hotel, body);
  }

  @Post('/actualiza/estatus/huesped')
  @UseGuards(RolesUserGuard)
  async updateGuestStatus(@Req() request: Request, @Body() body): Promise<any> {
    const hotel = request.headers['hotel'];
    return this._GuestService.updateStatus(hotel, body);
  }

  @Post('/promesas/update/estatus')
  @UseGuards(RolesUserGuard)
  async updatePromesaStatus(
    @Req() request: Request,
    @Body() body,
  ): Promise<any> {
    const hotel = request.headers['hotel'];
    return this._GuestService.updateStatus(hotel, body);
  }
}
