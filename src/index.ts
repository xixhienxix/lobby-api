import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';  // Adjust the path to your app module
import * as express from 'express';

const server = express();

// Create NestJS app inside Firebase Function
async function createNestServer() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(server); // Attach the NestJS app to the Express server
  await app.init();
}

// Initialize the NestJS app
createNestServer();

// Export the Firebase function
export const app = functions.https.onRequest(server);
