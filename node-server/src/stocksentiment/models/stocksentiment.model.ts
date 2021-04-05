import { DailyStockReport } from '../interfaces/dailystockreport.interface';

export class StockSentiment {
  readonly ticker: string;
  totalNumberOfMentions: number;
  totalScore: number;
  averageCompound: number;
  sentiment: string;

  constructor(ticker: string, totalNumberOfMentions: number, totalScore: number, averageCompound: number, sentiment: string) {
    this.ticker = ticker;
    this.totalNumberOfMentions = totalNumberOfMentions;
    this.totalScore = totalScore;
    this.averageCompound = averageCompound;
    this.sentiment = sentiment;
  }

  update(dailyStockReport: DailyStockReport): void {
    this.averageCompound =
      (this.averageCompound * this.totalNumberOfMentions + dailyStockReport.avgCompound * dailyStockReport.numComments) /
      (this.totalNumberOfMentions + dailyStockReport.numComments);

    if (this.averageCompound >= 0.05) {
      this.sentiment = 'Bullish';
    } else if (this.averageCompound <= -0.05) {
      this.sentiment = 'Bearish';
    } else {
      this.sentiment = 'Neutral';
    }

    this.totalNumberOfMentions += dailyStockReport.numComments;
    this.totalScore += dailyStockReport.score;
  }
}
