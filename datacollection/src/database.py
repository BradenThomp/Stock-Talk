from stock import Stock
import pymongo
import settings
from datetime import datetime
from dailystockreport import DailyStockReport
from comment import Comment

client = pymongo.MongoClient(settings.settings['mongo_con']['ip'])

db = client['stockTalk']

stocks_col = db['stocks']
comments_col = db['comments']
daily_stock_reports_col = db['dailyStockReports']


def wipe():
    """Drops the database, useful for testing.
    """
    client.drop_database('stockTalk')


def initialize_indices():
    """Initializes the database indices for O(1) access.
    """
    stocks_col.create_index([("ticker", 1)])
    comments_col.create_index([
        ("id", 1),
        ("ticker", 1),
    ])
    comments_col.create_index([
        ("ticker", 1),
        ("location", 1),
    ])
    daily_stock_reports_col.create_index([
        ("date", 1),
        ("ticker", 1),
        ("location", 1),
    ])


def add_stocks(stocks):
    """Adds a list of stocks to the database.

    Args:
        stocks: A list of stocks.
    """
    mylist = []
    for i in stocks:
        mydict = {
            "ticker": stocks[i].ticker,
            "name": stocks[i].name,
            "country": stocks[i].country,
            "sector": stocks[i].sector,
            "industry": stocks[i].industry
        }
        mylist.append(mydict)
    stocks_col.insert_many(mylist)


def get_stocks():
    """Gets all stocks from the database.

    Returns:
        A list of stocks.
    """
    stocks = []
    stock_docs = stocks_col.find()
    for stock_doc in stock_docs:
        stocks.append(Stock(stock_doc['ticker'], stock_doc['name'],
                            stock_doc['country'], stock_doc['sector'], stock_doc['industry']))
    return stocks


def get_daily_report(date, ticker, location):
    """Gets a daily report by database indices, date, ticker and location.  
    These three parameters combined should be unique.

    Args:
        date: The reports date.
        ticker: The reports ticker.
        location: The location the report was created for.

    Returns:
        A DailyStockReport object.
    """
    query = {
        'date': date,
        'ticker': ticker,
        'location': location
    }
    report_doc = daily_stock_reports_col.find_one(query)

    if report_doc == None:
        return None
    else:
        return DailyStockReport(report_doc['ticker'],
                                report_doc['date'],
                                report_doc['location'],
                                report_doc['numComments'],
                                report_doc['score'],
                                report_doc['avgCompound'],
                                report_doc['sentiment'])


def add_daily_report(daily_report):
    """Adds a new daily stock report to the database.

    Args:
        daily_report: The DailyStockReport to save.
    """
    mydict = {
        "ticker": daily_report.ticker,
        "date": daily_report.date,
        "location": daily_report.location,
        "numComments": daily_report.num_comments,
        "score": daily_report.score,
        "avgCompound": daily_report.avg_compound,
        "sentiment": daily_report.sentiment
    }
    daily_stock_reports_col.insert_one(mydict)


def update_daily_report(daily_report):
    """Updates an existing daily stock report in the database.

    Args:
        daily_report: The DailyStockReport to update.
    """
    query = {
        'date': daily_report.date,
        'ticker': daily_report.ticker,
        'location': daily_report.location
    }
    new_values = {
        "$set": {
            'avgCompound': daily_report.avg_compound,
            'sentiment': daily_report.sentiment,
            'numComments': daily_report.num_comments,
            'score': daily_report.score
        }
    }
    daily_stock_reports_col.update_one(query, new_values)


def get_comment(id, ticker):
    """Queries the database for a comment base of it's id and ticker.

    Args:
        id: The comments external id. (Not the database given id.)
        ticker: The ticker the comment was found for.

    Returns:
        A Comment object.
    """
    query = {'id': id, 'ticker': ticker}
    comment_doc = comments_col.find_one(query)
    if comment_doc == None:
        return None
    else:
        return Comment(comment_doc['body'],
                       comment_doc['author'],
                       comment_doc['score'],
                       comment_doc['id'],
                       comment_doc['location'],
                       comment_doc['ticker'],
                       comment_doc['dateTime'],
                       comment_doc['compound'],
                       comment_doc['sentiment'])


def update_comment(comment):
    """Updates an existing comment.

    Args:
        comment: The comment to update.
    """
    query = {'id': comment.id, 'ticker': comment.ticker}
    new_values = {"$set": {'score': comment.score}}
    comments_col.update_one(query, new_values)


def add_comment(comment):
    """Adds a new comment to the database.

    Args:
        comment: The comment to add.
    """
    mydict = {
        "ticker": comment.ticker,
        "id": comment.id,
        "location": comment.location,
        "dateTime": comment.date_time,
        "body": comment.body,
        "author": comment.author,
        "score": comment.score,
        "compound": comment.compound,
        "sentiment": comment.sentiment
    }
    comments_col.insert_one(mydict)
