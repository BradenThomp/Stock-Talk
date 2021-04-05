import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class StockSentimentDto {
  @Field()
  readonly ticker: string;
  @Field(() => GraphQLISODateTime)
  readonly totalNumberOfMentions: number;
  @Field(() => Int)
  readonly totalScore: number;
  @Field(() => Float)
  readonly averageCompound: number;
  @Field()
  readonly sentiment: string;
}
