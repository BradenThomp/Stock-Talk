import * as mongoose from 'mongoose';

export const DailyStockReportSchema = new mongoose.Schema(
  {
    ticker: String,
    date: String,
    location: String,
    numComments: Number,
    score: Number,
    avgCompound: Number,
    sentiment: String,
  },
  { collection: 'dailyStockReports' },
);
