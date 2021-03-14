import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class DailyStockReport {
  @Field()
  readonly ticker: string;
  @Field(() => GraphQLISODateTime)
  readonly date: Date;
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
