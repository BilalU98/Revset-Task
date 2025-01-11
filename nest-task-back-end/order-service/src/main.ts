import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure TCP transport for microservice communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002, // This port should be used by Order Service
    },
  });

  await app.startAllMicroservices();  // Start the microservice connections

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are provided
    transform: true, // Automatically transform payloads to DTO types
  }));
  
  await app.listen(3000);// Listen for HTTP requests on port 3000
}

bootstrap();
