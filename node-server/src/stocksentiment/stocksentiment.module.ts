import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StockSentimentResolver } from './stocksentiment.resolver';
import { DailyStockReportSchema } from '../dailystockreport/dailystockreport.schema';
import { StockSentimentService } from './stocksentiment.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DailyStockReport', schema: DailyStockReportSchema }])],
  providers: [StockSentimentResolver, StockSentimentService],
})
export class StockSentimentModule {}
