import { Resolver, Query } from '@nestjs/graphql';
import { DailyStockReportService } from './dailystockreport.service';
import { DailyStockReport } from './models/dailystockreport.model';

@Resolver()
export class DailyStockReportResolver {
  constructor(
    private readonly dailyStockReportService: DailyStockReportService,
  ) {}

  @Query(() => [DailyStockReport])
  async getDailyStockReports() {
    return this.dailyStockReportService.findAll();
  }
}
