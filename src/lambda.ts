import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { configure } from '@vendia/serverless-express';
import type {
  Handler,
  Context,
  Callback,
  APIGatewayEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

let cachedHandler: Handler;

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!cachedHandler) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await app.init();

    cachedHandler = configure({ app: expressApp });
  }

  return cachedHandler(
    event,
    context,
    callback,
  ) as Promise<APIGatewayProxyResult>;
};
