import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5], // important for p95/p99
});
@Injectable()
export class MetricsService {
  private readonly registry: client.Registry;

  constructor() {
    this.registry = new client.Registry();

    // collect default metrics (CPU, memory, event loop, etc.)
    client.collectDefaultMetrics({
      register: this.registry,
    });
  }

  getRegistry() {
    return this.registry;
  }
}