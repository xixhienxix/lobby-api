import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';

const server: express.Express = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    { cors: true },
  );

  // Initialize the app, log readiness, and make sure the function waits for NestJS to be ready
  await app.init();
  console.log('NestJS App Initialized');
  return app;
};

createNestServer(server)
  .then(() => {
    console.log('Nest Ready, Firebase Functions will now handle requests');
  })
  .catch((err) => {
    console.error('NestJS initialization failed', err);
  });

export const api: functions.HttpsFunction = functions.https.onRequest(server);
