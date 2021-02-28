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

  async findAll(): Promise<DailyStockReport[]> {
    return await this.dailyStockReportModel.find().exec();
  }
}