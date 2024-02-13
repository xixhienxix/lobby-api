import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { CodesService } from '../_services/codes.service';

@Controller()
export class CodesController {
  constructor(private _codesService: CodesService) {}

  @Get('/codigos/getAll')
  @UseGuards(RolesUserGuard)
  async findAllRooms(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._codesService.findAll(hotel);
  }
}
