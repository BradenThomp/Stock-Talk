import { Resolver, Query } from '@nestjs/graphql';
import { DailyStockReportService } from './dailystockreport.service';
import { DailyStockReportDto } from './dtos/dailystockreport.dto';

@Resolver()
export class DailyStockReportResolver {
  constructor(
    private readonly dailyStockReportService: DailyStockReportService,
  ) {}

  @Query(() => [DailyStockReportDto])
  async getDailyStockReports() {
    return this.dailyStockReportService.findAll();
  }
}
