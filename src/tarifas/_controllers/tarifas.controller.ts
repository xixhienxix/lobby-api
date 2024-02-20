import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { TarifasService } from '../_services/tarifas.service';

@Controller()
export class TarifasController {
  constructor(private _tarifasService: TarifasService) {}

  @Post('/tarifas/agregar')
  @UseGuards(RolesUserGuard)
  postTarifa(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];

    return this._tarifasService.postTarifa(hotel, body);
  }
}
