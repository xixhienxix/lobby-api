import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { TarifasService } from '../_services/tarifas.service';

@Controller()
export class TarifasController {
  constructor(private _tarifasService: TarifasService) {}

  @Get('/tarifario/tarifas')
  @UseGuards(RolesUserGuard)
  async findAllRates(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._tarifasService.findAllRates(hotel);
  }

  @Get('/tarifario/tarifas/rack')
  @UseGuards(RolesUserGuard)
  async findRackRates(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._tarifasService.findAllRackRates(hotel);
  }
  @Post('/tarifas/agregar')
  @UseGuards(RolesUserGuard)
  postTarifa(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];

    return this._tarifasService.postTarifa(hotel, body);
  }

  @Post('/tarifario/actualiza/tarifas')
  @UseGuards(RolesUserGuard)
  updateTarifaEspecial(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._tarifasService.updateTarifaEspecial(hotel, body);
  }

  @Post('/tarifario/actualiza/tarifas')
  @UseGuards(RolesUserGuard)
  updateTarifa(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];

    return this._tarifasService.updateTarifaBase(hotel, body);
  }

  @Post('/tarifas/especial/agregar')
  @UseGuards(RolesUserGuard)
  postTarifaEspecial(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];

    return this._tarifasService.postTarifa(hotel, body);
  }

  @Delete('/tarifas/especial/delete/:tarifa')
  @UseGuards(RolesUserGuard)
  deleteTarifaEspecial(
    @Req() request: Request,
    @Param('tarifa') tarifa: string,
  ) {
    const hotel = request.headers['hotel'];

    return this._tarifasService.deleteTarifa(hotel, tarifa);
  }
}
