import { useQuery } from "@apollo/client";
import { GET_STOCK_SENTIMENT } from "../../../api/apollo-client";
import { makeStyles } from '@material-ui/core/styles';
import SortableTable from "../../elements/SortableTableWithLinks";
import { Column, LinkableRow } from "../../elements/SortableTableWithLinks";
import { useState } from "react";
import TimePeriodSelection, { Period } from "../../elements/TimePeriodSelection";

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

  const {data, loading, error} = useQuery(GET_STOCK_SENTIMENT, {
    variables: { numDays },
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
      <SortableTable rows={linkableRows} columns={columns}/>
    </div>
  );
}