import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStockReportModule } from './dailystockreport/dailystockreport.module';

@Module({
  imports: [
    DailyStockReportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/StockTalk'),
  ],
})
export class AppModule {}
