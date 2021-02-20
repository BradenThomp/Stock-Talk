settings = {
    # Reddit application connection. See https://ssl.reddit.com/prefs/apps/ for details.
    'reddit_con': {
        'id': 'a7_wciwtl9P88Q',
        'secret': 'hBEhWmnwLYVrJ_gZojfNMC6EdmZVPA',
        'agent': 'StockScraper',
    },
    # MongoDB connection
    'mongo_con': {
        'ip': 'mongodb://host.docker.internal:27017/'
    },
    # Subreddits to monitor
    'subreddits': [
        'wallstreetbets',
        'canadianinvestor',
        'investing',
        'smallstreetbets',
        'stocks',
        'stockmarket',
    ]
}
