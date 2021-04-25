import {useQuery, gql} from "@apollo/client"
import {GET_STOCK_SENTIMENT} from "../app/api/apollo-client"

export default function Home() {
  const numDays = 365;
  const {data, loading, error} = useQuery(GET_STOCK_SENTIMENT, {
    variables: { numDays },
  });

  if(loading) {
    return (<h2>Loading...</h2>);
  }

  if(error){
    console.log(error);
    return <h2>Error</h2>;
  }

  const sentiments = data.getStockSentiment.slice(0,4);
  return (
    <div>
      {sentiments.map((sentiment) => (
        <p>
          {sentiment.ticker}, {sentiment.totalScore}, {sentiment.averageCompound}, {sentiment.sentiment}
        </p>
      ))}
    </div>
  );
}
