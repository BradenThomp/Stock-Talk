from comment import Comment
from datetime import datetime
from dailystockreport import DailyStockReport

import re
import database as db
import sentimentanalysis as sa

# Get and cache all stock tickers from the database.
stocks = db.get_stocks()


def findWholeWord(word):
    """Regex matches a whole word. Case Senstive.

    Args:
        word: The word to match.

    Returns:
        The matched word or None.
    """
    return re.compile(r'(?:^|\W){0}(?:$|\W)'.format(word)).search


def process_reddit_comment(reddit_comment):
    """Processes a comment from Reddit.

    Args:
        reddit_comment: The Reddit comment.
    """
    for stock in stocks:
        # Check if body mentions any stock ticker.
        if findWholeWord(stock.ticker)(reddit_comment.body) is not None:
            # Convert reddit comment into application comment.
            comment = Comment(reddit_comment.body, reddit_comment.author.name, reddit_comment.score, reddit_comment.id,
                              "r/{0}".format(reddit_comment.subreddit.display_name), stock.ticker, datetime.fromtimestamp(reddit_comment.created_utc))
            process_comment(comment)


def process_comment(comment):
    """Processes a comment, and decides how to update the repostitory.

    Args:
        comment: The comment to process.
    """
    report_processing_func = None

    fetched_comment = db.get_comment(comment.id, comment.ticker)
    if fetched_comment == None:
        # Comment doesn't exist in database, create new.
        comment.set_compound(sa.performsentimentanalysis(comment.body))
        db.add_comment(comment)

        # Since comment did not previously exist, add it to daily report and calculate new averages.
        def add_comment_to_report(daily_report):
            daily_report.add_comment(comment)
        report_processing_func = add_comment_to_report
    else:
        change_in_score = comment.score - fetched_comment.score
        if change_in_score == 0:
            # No change in score, return.
            return

        # Comment exists in database and score has changed, update.
        db.update_comment(comment)

        # Comment already exists, so it has been previously used in daily report calculations, we only want to change overall score of the report.
        def update_report_score(daily_report):
            daily_report.add_to_score(change_in_score)
        report_processing_func = update_report_score

    process_comment_into_daily_report(comment, report_processing_func)


def create_new_daily_report(comment, date):
    """Creates a new daily report for the specified date, from a comment.

    Args:
        comment: The comment to create the daily report from.
        date: The date string.
    """
    daily_report = DailyStockReport(
        comment.ticker, date, comment.location, 1, comment.score, comment.compound, comment.sentiment)
    db.add_daily_report(daily_report)


def process_comment_into_daily_report(comment, update_func):
    """Processes a comment into a daily report.  Could either create a daily report,
    or update an existing daily.

    Args:
        comment: The comment to process into a daily report.
        update_func: The function that will be called to update the daily report.
    """
    date = datetime(
        comment.date_time.year, comment.date_time.month, comment.date_time.day, 0, 0)
    daily_report = db.get_daily_report(date, comment.ticker, comment.location)

    if daily_report == None:
        create_new_daily_report(comment, date)
    else:
        update_func(daily_report)
        db.update_daily_report(daily_report)
