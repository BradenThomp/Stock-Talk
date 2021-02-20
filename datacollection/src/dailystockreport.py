import datetime


class DailyStockReport:

    def __init__(self, ticker, date, location, num_comments, score, avg_compound, sentiment):
        self.ticker = ticker
        self.date = date
        self.location = location
        self.num_comments = num_comments
        self.score = score
        self.avg_compound = avg_compound
        self.sentiment = sentiment

    def add_comment(self, comment):
        self.avg_compound = (
            (self.avg_compound*self.num_comments) + comment.compound)/(self.num_comments + 1)
        self.set_sentiment(self.avg_compound)
        self.num_comments = self.num_comments + 1
        self.score = self.score + comment.score

    def add_to_score(self, score_to_add):
        self.score = self.score + score_to_add

    def set_sentiment(self, compound):
        if compound >= 0.05:
            self.sentiment = 'Bullish'
        elif compound <= -0.05:
            self.sentiment = 'Bearish'
        else:
            self.sentiment = 'Neutral'
