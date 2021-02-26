import * as mongoose from 'mongoose';

export const DailyStockReportSchema = new mongoose.Schema(
  {
    ticker: String,
    date: String,
    location: String,
    num_comments: Number,
    score: Number,
    avg_compound: Number,
    sentiment: String,
  },
  { collection: 'daily_stock_reports' },
);
