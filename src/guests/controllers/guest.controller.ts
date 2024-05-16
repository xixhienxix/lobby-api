import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { GuestService } from '../services/guest.service';

@Controller()
export class GuestsController {
  constructor(private _GuestService: GuestService) {}

  @Get('/reportes/huesped')
  @UseGuards(RolesUserGuard)
  async findAllGuests(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._GuestService.findAll(hotel);
  }

}
