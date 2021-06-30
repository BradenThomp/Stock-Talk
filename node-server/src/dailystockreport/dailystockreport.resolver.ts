import { Resolver, Query, Args } from '@nestjs/graphql';
import { DailyStockReportService } from './dailystockreport.service';
import { DailyStockReportDto } from './dtos/dailystockreport.dto';

@Resolver()
export class DailyStockReportResolver {
  constructor(private readonly dailyStockReportService: DailyStockReportService) {}

  @Query(() => [DailyStockReportDto])
  async DailyStockReport(@Args('ticker') ticker: string) {
    return this.dailyStockReportService.getDailyReports(ticker);
  }
}
