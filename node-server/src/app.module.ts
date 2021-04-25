import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { StockSentimentModule } from './stocksentiment/stocksentiment.module';
import { DailyStockReportModule } from './dailystockreport/dailystockreport.module';

@Module({
  imports: [
    StockSentimentModule,
    DailyStockReportModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: 'http://localhost:3001',
        credentials: true,
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/stockTalk'),
  ],
})
export class AppModule {}
