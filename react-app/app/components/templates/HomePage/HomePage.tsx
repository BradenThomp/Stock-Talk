import { useQuery } from "@apollo/client";
import { GET_STOCK_SENTIMENT } from "../../../api/apollo-client";
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SortableTable from "../../modules/SortableTable";
import { Column } from "../../modules/SortableTable";

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
  const numDays = 365;

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
  console.log(rows[0]['ticker']);
  return(
    <SortableTable rows={rows} columns={columns}/>
  );
}