import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesUserGuard } from 'src/guards/roles.user.guard';
import { LogService } from '../service/log.service';

@Controller()
export class LogController {
  constructor(private _logService: LogService) {}

  @Get('/activity/log')
  @UseGuards(RolesUserGuard)
  async getLogsByUser(@Req() request: Request): Promise<any> {
    const hotel = request.headers['hotel'];

    return this._logService.getLogsByUser(hotel);
  }

  @Post('/send/logs')
  @UseGuards(RolesUserGuard)
  async postLogs(@Body() body, @Req() request: Request) {
    const hotel = request.headers['hotel'];
    return this._logService.postLogs(hotel, body);
  }
}
