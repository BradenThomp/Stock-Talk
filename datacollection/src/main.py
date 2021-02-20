import redditscraper as rs
import stockparser as sp
import database as db
import sys
import threading
import time
import settings

# Parse command line arguments.
for arg in sys.argv:
    if arg.lower() == "init":
        print('Initializing program...')
        db.wipe()
        stocks = sp.get_stocks_from_csv()
        db.initialize_indices()
        db.add_stocks(stocks)

# Start background threads.
subreddits = settings.settings['subreddits']
for subreddit in subreddits:
    t = threading.Thread(target=rs.scrape_subreddit, args=(subreddit,))
    t.daemon = True
    t.start()

while True:
    time.sleep(1)
