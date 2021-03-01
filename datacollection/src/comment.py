import datetime


class Comment:
    def __init__(self, body, author, score, id, location, ticker, date_time, compound=0, sentiment=''):
        self.body = body
        self.author = author
        self.score = score
        self.id = id
        self.location = location
        self.ticker = ticker
        self.date_time = date_time
        self.compound = 0
        self.sentiment = ''

    def set_compound(self, compound):
        self.compound = compound
        if compound >= 0.05:
            self.sentiment = 'Bullish'
        elif compound <= -0.05:
            self.sentiment = 'Bearish'
        else:
            self.sentiment = 'Neutral'
