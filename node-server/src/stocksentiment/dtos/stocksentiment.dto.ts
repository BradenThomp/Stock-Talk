import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class StockSentimentDto {
  @Field()
  readonly ticker: string;
  @Field(() => Int)
  readonly totalNumberOfMentions: number;
  @Field(() => Int)
  readonly totalScore: number;
  @Field(() => Float)
  readonly averageCompound: number;
  @Field()
  readonly sentiment: string;
}
