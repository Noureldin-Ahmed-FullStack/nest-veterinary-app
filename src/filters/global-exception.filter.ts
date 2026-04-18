import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('GlobalExceptionFilter hit');
    const response = host.switchToHttp().getResponse();
    const request = host.switchToHttp().getRequest();
    const timestamp = new Date().toISOString();
    const isDev = process.env.NODE_ENV !== 'production';
    if (
      exception?.code?.startsWith?.('P') ||
      exception instanceof Prisma.PrismaClientKnownRequestError
    ) {
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
          short_error_message: (exception.meta?.driverAdapterError as any)
            ?.cause?.originalMessage,
          message: message,
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

    // ✅ Handle known HTTP exceptions
    let message: any = 'Internal server error';
    // let status = exception.code();
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = (exceptionResponse as any).message || message;
      }
    }


    return response.status(500).json({
      statusCode: 500,
      message,
      timestamp,
      exception: isDev ? exception : undefined,
      path: request.url,
      method: request.method,
    });
  }
}
