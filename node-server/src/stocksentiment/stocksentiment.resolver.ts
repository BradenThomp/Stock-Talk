import { Resolver, Query, Args } from '@nestjs/graphql';
import { DailyStockReportService } from './stocksentiment.service';
import { StockSentimentDto } from './dtos/stocksentiment.dto';

@Resolver()
export class DailyStockReportResolver {
  constructor(
    private readonly dailyStockReportService: DailyStockReportService,
  ) {}

  @Query(() => [StockSentimentDto])
  async getDailyStockReports() {
    return this.dailyStockReportService.findAll();
  }

  @Query(() => [StockSentimentDto])
  async getDailyStockReportsForDateRange(
    @Args('lowerDate') lowerDate: Date,
    @Args('upperDate') upperDate: Date,
  ) {
    return this.dailyStockReportService.findAllForDateRange(
      lowerDate,
      upperDate,
    );
  }
}
