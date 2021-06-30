import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyStockReport } from './interfaces/dailystockreport.interface';

@Injectable()
export class DailyStockReportService {
  constructor(
    @InjectModel('DailyStockReport')
    private readonly dailyStockReportModel: Model<DailyStockReport>,
  ) {}

  async getDailyReports(ticker: string): Promise<DailyStockReport[]> {
    const dailyStockReports = await this.dailyStockReportModel
      .find({
        ticker: {
          $eq: ticker,
        },
      })
      .exec();

    return dailyStockReports;
  }
}
