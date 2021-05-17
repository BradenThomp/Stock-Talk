import { Resolver, Query, Args } from '@nestjs/graphql';
import { StockSentimentService } from './stocksentiment.service';
import { StockSentimentDto } from './dtos/stocksentiment.dto';

@Resolver()
export class StockSentimentResolver {
  constructor(private readonly stockSentimentService: StockSentimentService) {}

  @Query(() => [StockSentimentDto])
  async StockSentiment(@Args('numDays') numDays: number, @Args('subreddits', { type: () => [String] }) subreddits: string[]) {
    return this.stockSentimentService.getStockSentiment(numDays, subreddits);
  }
}
