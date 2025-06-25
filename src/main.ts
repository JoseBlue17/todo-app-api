// eslint-disable-next-line @typescript-eslint/no-var-requires
const LokiTransport = require('winston-loki');
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  DomainExceptionFilter,
  UnhandledExceptionFilter,
} from './shared/domain';
import { AntdValidationPipe } from './shared/validation';
import { AppModule } from './app.module';
import { ApiConfig } from './config/api.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('Todo App API')
    .setDescription('API for the Todo App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);

  const isDevelopment = process.env.NODE_ENV !== 'production';

  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      ...(isDevelopment && {
        requestInterceptor: request => {
          return request;
        },
        responseInterceptor: response => {
          if (
            response.url.includes('/users/login') &&
            response.status === 201
          ) {
            try {
              const responseBody = JSON.parse(response.text);
              if (responseBody.token) {
                const ui = (window as any).ui;
                if (ui) {
                  ui.preauthorizeApiKey('bearer', responseBody.token);
                }
              }
            } catch (error) {
              console.warn('No se pudo extraer token automáticamente:', error);
            }
          }
          return response;
        },
      }),
    },
  });

  const loggerInstance = winston.createLogger(getLoggerConfig(config));
  app.useLogger(WinstonModule.createLogger({ instance: loggerInstance }));

  app
    .useGlobalFilters(
      new DomainExceptionFilter(),
      new UnhandledExceptionFilter(loggerInstance),
    )
    .useGlobalPipes(new AntdValidationPipe({ transform: true }))
    .enableCors(config.get('cors'));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(config.get('api.port'));
}

function getLoggerConfig(configService: ConfigService) {
  const { logger } = configService.get<ApiConfig>('api');
  const transports = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('App', {
          prettyPrint: true,
          colors: true,
        }),
      ),
      level: 'info',
    }),
  ];

  if (logger?.lokiEnabled) {
    transports.push(
      new LokiTransport({
        host: logger.lokiHost,
        json: true,
        labels: { app: `pr_ready_api_${logger.lokiSuffixApp}` },
        format: winston.format.json(),
        replaceTimestamp: true,
        level: 'info',
        onConnectionError: err => console.error(err),
      }) as any,
    );
  }
  return { transports };
}

bootstrap();
