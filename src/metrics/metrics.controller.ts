import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Res() res: any) {
    const registry = this.metricsService.getRegistry();

    res.set('Content-Type', registry.contentType);
    res.end(await registry.metrics());
  }
}