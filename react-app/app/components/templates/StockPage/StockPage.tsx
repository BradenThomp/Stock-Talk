import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_STOCK_REPORTS, GET_STOCK_SENTIMENT } from "../../../api/apollo-client";
import ApplicationTable, { Column, Row } from "../../elements/ApplicationTable";


interface Props {
  ticker: string;
}

const columns:Column[] = [
  {key: 'ticker', label:'Ticker'},
  {key: 'location', label:'Location'},
  {key: 'date', label:'Date'},
  {key: 'numComments', label:'Comments'},
  {key: 'score', label:'Upvotes'},
  {key: 'avgCompound', label:'SA Compound'},
  {key: 'sentiment', label:'Sentiment'},
];

export default function StockPage(props: Props){
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>(null);

  const ticker = props.ticker;
  const {data, loading, error} = useQuery(GET_STOCK_REPORTS, {
    variables: { ticker },
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

  const rows = data.DailyStockReport.map(rawRow => {
    const row: Row = {
      data: JSON.parse(JSON.stringify(rawRow)),
      id: rawRow.ticker,
    } 
    row.data.date = rawRow.date.split('T')[0];
    return row;
  });
  return(
    <div>
      <ApplicationTable rows={rows} columns={columns} order={order} setOrder={setOrder} orderBy={orderBy} setOrderBy={setOrderBy}/>
    </div>
  );
}