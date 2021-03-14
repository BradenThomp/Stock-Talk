import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStockReportResolver } from './stocksentiment.resolver';
import { DailyStockReportSchema } from './dailystockreport.schema';
import { DailyStockReportService } from './stocksentiment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DailyStockReport', schema: DailyStockReportSchema },
    ]),
  ],
  providers: [DailyStockReportResolver, DailyStockReportService],
})
export class StockSentimentModule {}
