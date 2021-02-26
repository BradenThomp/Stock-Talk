import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class DailyStockReportDto {
  @Field()
  readonly ticker: string;
  @Field()
  readonly date: string;
  @Field()
  readonly location: string;
  @Field(() => Int)
  readonly num_comments: number;
  @Field(() => Int)
  readonly score: number;
  @Field(() => Float)
  readonly avg_compound: number;
  @Field()
  readonly sentiment: string;
}
