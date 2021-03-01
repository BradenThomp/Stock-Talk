import { Document } from 'mongoose';

export interface DailyStockReport extends Document {
  readonly ticker: string;
  readonly date: string;
  readonly location: string;
  readonly numComments: number;
  readonly score: number;
  readonly avgCompound: number;
  readonly sentiment: string;
}
