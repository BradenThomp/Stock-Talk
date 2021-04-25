import { ApolloClient, gql, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;

export const GET_STOCK_SENTIMENT = gql`
  query GetStockSentiment($numDays: Float!){
    getStockSentiment(numDays: $numDays){
      ticker,
      totalScore,
      averageCompound,
      sentiment
    }
  }
`;