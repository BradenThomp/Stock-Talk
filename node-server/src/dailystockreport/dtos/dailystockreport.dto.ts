import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class DailyStockReportDto {
  @Field()
  readonly ticker: string;
  @Field()
  readonly location: string;
  @Field(() => GraphQLISODateTime)
  readonly date: Date;
  @Field(() => Int)
  readonly numComments: number;
  @Field(() => Int)
  readonly score: number;
  @Field(() => Float)
  readonly avgCompound: number;
  @Field()
  readonly sentiment: string;
}
