import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStockReportSchema } from './dailystockreport.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DailyStockReport', schema: DailyStockReportSchema }])],
})
export class DailyStockReportModule {}
