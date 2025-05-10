const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');  // Path to your compiled NestJS app
const cors = require('cors');

const app = express();

// Enable CORS if needed (you can remove this if not required)
app.use(cors());

// Create the NestJS app and integrate it with Express
async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors(); // Enable CORS if needed
  nestApp.use(app); // Integrating Express with NestJS
  await nestApp.init();
}

bootstrap().catch((err) => {
  console.log('NestJS initialization failed:', err);
});

// Make sure the app listens on a port (3000 by default)
app.listen(process.env.PORT || 3000, () => {
  console.log('NestJS app is running...', process.env.PORT);
});
