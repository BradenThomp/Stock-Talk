import { ApolloClient, gql, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;

export const GET_STOCK_SENTIMENT = gql`
  query StockSentiment($numDays: Float!){
    StockSentiment(numDays: $numDays){
      ticker,
      totalNumberOfMentions,
      totalScore,
      averageCompound,
      sentiment
    }
  }
`;