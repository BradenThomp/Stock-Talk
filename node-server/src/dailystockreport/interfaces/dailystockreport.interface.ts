import { Document } from 'mongoose';

export interface DailyStockReport extends Document {
  readonly ticker: string;
  readonly date: string;
  readonly location: string;
  readonly num_comments: number;
  readonly score: number;
  readonly avg_compound: number;
  readonly sentiment: string;
}
