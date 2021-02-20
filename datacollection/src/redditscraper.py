import praw
import settings
import time
import datetime
import commentprocessor
import traceback

# connection to reddit.
reddit = praw.Reddit(
    client_id=settings.settings['reddit_con']['id'],
    client_secret=settings.settings['reddit_con']['secret'],
    user_agent=settings.settings['reddit_con']['agent']
)


def scrape_subreddit(subredditname):
    """Scrapes a subreddit for comments, and sends the comment off the the comment processor.

    Args:
        subredditname: The name of the subreddit to scrape.
    """
    print("Starting to scrape {0}...".format(subredditname))
    # Want to scrape forever.
    subreddit = reddit.subreddit(subredditname)
    while 1:
        try:
            # Scrape the current hot 100 of the subreddit.
            for submission in subreddit.hot(limit=100):
                submission.comments.replace_more(limit=None)
                for comment in submission.comments.list():
                    commentprocessor.process_reddit_comment(comment)

        except Exception as err:
            # Sometimes bad request exceptions are thrown, we just want to continue.
            print("{0}: {1}".format(datetime.datetime.now().time(), str(err)))
            traceback.print_exc()
        # Sleep for 5 minutes so we don't ddos reddit.
        time.sleep(300)
