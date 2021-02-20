from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.downloader.download('vader_lexicon')

# Extra words that can be used to help analyze the comment.
# Unfortunately reddit likes to use slurs :/
extra_words = {
    'tendies': 4.0,
    'gay': -4.0,
    'bears': -4.0,
    'bearish': -4.0,
    'bear': -4.0,
    'bullish': 4.0,
    'bull': 4.0,
    'bulls': 4.0,
    'moon': 4.0,
    '🚀': 4.0,
    '💎': 4.0,
    'hold': 4.0,
    'buy': 4.0,
    'sell': -4.0
}


def performsentimentanalysis(text):
    """Performs a sentiment analysis on the given text.
       Rated on a scale from -4.0 (negative sentiment) to 4.0 (positive sentiment)

       TODO: Create a data set frin reddit comments instead of using defaults. 
             This will give us a more accurate result.
    Args:
        text: The text to perform the sentiment analysis on.

    Returns:
        The compound score.
    """
    sia = SentimentIntensityAnalyzer()
    sia.lexicon.update(extra_words)
    sa = sia.polarity_scores(text)
    return sa['compound']
