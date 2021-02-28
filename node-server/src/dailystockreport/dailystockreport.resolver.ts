import { Resolver, Query } from '@nestjs/graphql';
import { DailyStockReportService } from './dailystockreport.service';
import { DailyStockReportDto } from './dtos/dailystockreport.dto';

@Resolver()
export class DailyStockReportResolver {
  constructor(
    private readonly dailyStockReportService: DailyStockReportService,
  ) {}

  @Query(() => [String])
  async myTest() {
    const array = ['This', 'Is', 'a', 'test'];
    return array;
  }

  @Query(() => [DailyStockReportDto])
  async getDailyStockReports() {
    const array: DailyStockReportDto[] = [
      {
        ticker: 'TSLA',
        date: 'TODAY',
        location: 'HERE',
        num_comments: 10,
        score: 69,
        avg_compound: 0.4,
        sentiment: 'GOOD',
      },
      {
        ticker: 'GME',
        date: 'TODAY',
        location: 'HERE',
        num_comments: 10,
        score: 69,
        avg_compound: 0.4,
        sentiment: 'GOOD',
      },
    ];
    return this.dailyStockReportService.findAll();
  }
}
