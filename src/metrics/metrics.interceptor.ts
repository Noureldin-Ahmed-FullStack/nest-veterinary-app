import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { httpRequestDuration } from './metrics.service';
@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const end = httpRequestDuration.startTimer();

    return next.handle().pipe(
      tap(() => {
        end({
          method: req.method,
          route: req.route?.path || req.url,
          status_code: res.statusCode,
        });
      }),
    );
  }
}
