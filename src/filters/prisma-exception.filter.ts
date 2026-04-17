import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === 'P2002') {
      return response.status(409).json({
        statusCode: 409,
        message: 'Unique constraint failed',
      });
    }

    return response.status(500).json({
      message: 'Internal server error',
    });
  }
}