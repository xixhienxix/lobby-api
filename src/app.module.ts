import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environments/environment';
import { RequestMiddleWare } from './auth/middleware/request-middleware';
import { HuespedController } from './auth/controllers/huesped.controller';
import { RoomsModule } from './rooms/rooms.module';
import { CodesModule } from './codes/codes.module';
import { DivisasModule } from './divisas/divisas.module';
import { TimezonesModule } from './timezones/timezones.module';
import { DisponibilidadModule } from './dispo/dispo.module';
import { TarifasModule } from './tarifas/tarifas.module';
import { GuestModule } from './guests/guest.module';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    CodesModule,
    DivisasModule,
    TarifasModule,
    TimezonesModule,
    GuestModule,
    DisponibilidadModule,
    MongooseModule.forRoot(environment.MONGODB_CONNECTION_URL, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Connected to MongoDB');
        });
        connection._events.connected();
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleWare).forRoutes(HuespedController);
  }
}
