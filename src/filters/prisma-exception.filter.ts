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
    const request = host.switchToHttp().getRequest();
console.log('Prisma filter hit');
    // Unique constraint
    if (exception.code === 'P2002') {
      const fields =
        (exception.meta?.driverAdapterError as any)?.cause?.constraint
          ?.fields ?? [];
      const message =
        fields.length > 1
          ? `${fields.join(' and ')} already exist`
          : `${fields[0]} already exists`;
      return response.status(409).json({
        statusCode: 409,
        error: 'Conflict',
        short_error_message: (exception.meta?.driverAdapterError as any)?.cause
          ?.originalMessage,
        message:message,
        timestamp: new Date().toISOString(),
        path: request.url,
        request_type: request.method,
        // full_error: exception,
      });
    }

    // Record not found
    if (exception.code === 'P2025') {
      const fields =
        (exception.meta?.driverAdapterError as any)?.cause?.constraint
          ?.fields ?? [];
      const message =
        fields.length > 1
          ? `${fields.join(' and ')} Are Not Found`
          : `${fields[0]} Is Not Found`;
      return response.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: (exception.meta?.driverAdapterError as any)?.cause
          ?.originalMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
        request_type: request.method,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      error: 'Prisma Error',
      message: (exception.meta?.driverAdapterError as any)?.cause
        ?.originalMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
      request_type: request.method,
    });
  }
}
