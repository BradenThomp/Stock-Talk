import csv
import os
import ignoredtickers as it
from stock import Stock


def get_stocks_from_csv():
    """Parses a compatible csv file containing stock information.
       The compatible csv files can be downloaded from:
       https://www.nasdaq.com/market-activity/stocks/screener

    Returns:
        A dictionary of stocks.
    """
    dic = {}

    # Read in stock data from downloaded csv.
    with open('../data/nasdaq_screener_1612228769267.csv', 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        for row in reader:
            add_ticker = True
            ticker = row[0]
            for ign_ticker in it.ignored_tickers:
                if ign_ticker == ticker:
                    add_ticker = False
                    break

            if add_ticker:
                name = row[1]
                country = row[6]
                sector = row[9]
                industry = row[10]
                dic[ticker] = Stock(ticker, name, country, sector, industry)

    return dic
