import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStockReportSchema } from './dailystockreport.schema';
import { DailyStockReportService } from './dailystockreport.service';
import { DailyStockReportResolver } from './dailystockreport.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DailyStockReport', schema: DailyStockReportSchema }])],
  providers: [DailyStockReportResolver, DailyStockReportService],
})
export class DailyStockReportModule {}
