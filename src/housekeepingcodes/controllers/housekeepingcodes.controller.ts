import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { HouseKeepingService } from '../services/housekeepingcodes.service';

@Controller()
export class HouseKeepingCodesController {
  constructor(private _housekeepingCodesService: HouseKeepingService) {}

  @Get('/codigos/housekeeping')
  @UseGuards(RolesUserGuard)
  async findAllGuests(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._housekeepingCodesService.findAll(hotel);
  }

}
