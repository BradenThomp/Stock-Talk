import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStockReportResolver } from './dailystockreport.resolver';
import { DailyStockReportSchema } from './dailystockreport.schema';
import { DailyStockReportService } from './dailystockreport.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DailyStockReport', schema: DailyStockReportSchema },
    ]),
  ],
  providers: [DailyStockReportResolver, DailyStockReportService],
})
export class DailyStockReportModule {}
