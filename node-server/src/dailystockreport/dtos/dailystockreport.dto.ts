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
  readonly numComments: number;
  @Field(() => Int)
  readonly score: number;
  @Field(() => Float)
  readonly avgCompound: number;
  @Field()
  readonly sentiment: string;
}
