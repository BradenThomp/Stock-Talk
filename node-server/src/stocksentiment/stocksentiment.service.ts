import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyStockReport } from '../dailystockreport/interfaces/dailystockreport.interface';
import { StockSentiment } from './models/stocksentiment.model';

@Injectable()
export class StockSentimentService {
  constructor(
    @InjectModel('DailyStockReport')
    private readonly dailyStockReportModel: Model<DailyStockReport>,
  ) {}

  async getStockSentiment(numDays: number, subreddits: string[]): Promise<StockSentiment[]> {
    const todayUTC = new Date();
    todayUTC.setHours(0, 0, 0, 0);
    const oldestPossibleDate = new Date(todayUTC.getTime() - (numDays - 1) * 24 * 60 * 60 * 1000);

    let dailyStockReports = null;
    if (subreddits.length === 0) {
      dailyStockReports = await this.dailyStockReportModel
        .find({
          date: {
            $gte: oldestPossibleDate,
          },
        })
        .exec();
    } else {
      dailyStockReports = await this.dailyStockReportModel
        .find({
          date: {
            $gte: oldestPossibleDate,
          },
          location: {
            $in: subreddits,
          },
        })
        .exec();
    }

    const stockSentiments = new Array<StockSentiment>();
    dailyStockReports.forEach((dailyStockReport) => {
      if (stockSentiments[dailyStockReport.ticker] === undefined) {
        stockSentiments[dailyStockReport.ticker] = new StockSentiment(
          dailyStockReport.ticker,
          dailyStockReport.numComments,
          dailyStockReport.score,
          dailyStockReport.avgCompound,
          dailyStockReport.sentiment,
        );
      } else {
        stockSentiments[dailyStockReport.ticker].update(dailyStockReport);
      }
    });

    const result = new Array<StockSentiment>();
    for (const stockSentiment of Object.values(stockSentiments)) {
      result.push(stockSentiment);
    }
    return result;
  }
}
