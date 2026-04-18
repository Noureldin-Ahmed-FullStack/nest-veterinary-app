import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('HttpExceptionFilter hit');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const timestamp = new Date().toISOString();
    const isDev = process.env.NODE_ENV !== 'production';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let error = 'Internal Server Error';

    // ✅ Handle known HTTP exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || error;
      }
    }

    // ❌ Handle unknown errors
    else {
      if (isDev) {
        message = (exception as any)?.message || message;
      }
    }
    if ((exception as any).code?.startsWith('P')) {
        message = (exception as any).meta?.driverAdapterError.cause
          ?.originalMessage;
    }

    return response.status(status).json({
      statusCode: status,
      error,
      message,
      timestamp,
      path: request.url,
      method: request.method,
    });
  }
}
