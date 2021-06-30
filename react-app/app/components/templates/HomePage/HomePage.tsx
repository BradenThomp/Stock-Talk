import { useQuery } from "@apollo/client";
import { GET_STOCK_SENTIMENT } from "../../../api/apollo-client";
import { makeStyles } from '@material-ui/core/styles';
import ApplicationTable from "../../elements/ApplicationTable";
import { Column, LinkableRow } from "../../elements/ApplicationTable";
import { useState } from "react";
import TimePeriodSelection, { Period } from "../../elements/TimePeriodSelection";
import SubredditSelection from "../../elements/SubredditSelection";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

const columns:Column[] = [
  {key: 'ticker', label:'Ticker'},
  {key: 'totalNumberOfMentions', label:'Comments'},
  {key: 'totalScore', label:'Upvotes'},
  {key: 'sentiment', label:'Sentiment'},
  {key: 'averageCompound', label:'SA Compound'},
];

export default function HomePage(){
  const [numDays, setNumDays] = useState<Period>(365);
  const [subreddits, setSubreddits] = useState<string[]>(['r/stocks']);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>(null);

  const {data, loading, error} = useQuery(GET_STOCK_SENTIMENT, {
    variables: { numDays, subreddits },
  });

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }

  if(error){
    console.error(error);
    return(
      <h1>Error</h1>
    )
  }

  const rows = data.StockSentiment;
  const linkableRows = rows.map(row => {
    const linkableRow: LinkableRow = {
      data: row,
      link: '/stock/' + row['ticker'],
    } 
    return linkableRow;
  });
  return(
    <div>
      <TimePeriodSelection period={numDays} updatePeriod={setNumDays}/>
      <SubredditSelection subreddits={subreddits} updateSubreddits={setSubreddits}/>
      <ApplicationTable rows={linkableRows} columns={columns} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy}/>
    </div>
  );
}