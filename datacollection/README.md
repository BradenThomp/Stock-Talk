# Stock Talk Data Collection Service

The Data Collection service is written in python.  It scrapes specified subreddits for comments that mentions stocks, performs a sentiment analysis, and then saves the resulting report to a database.  Currently the database in use is MongoDB.

## Installation

Please download or pull a copy of the code.

## Requirements

This application requires a working installation of MongoDB and Docker.

This application also requires a registered reddit application.

## Usage

### Settings
Settings can be found under src/settings.py and need to be filled out before running the application.

'''python
'reddit_con': {
    # Registered Reddit application connection strings.
},
'mongo_con': {
    # MongoDB connection string.
},
'subreddits': [
    # A list of Subreddits to scrape.
]
'''

### Running
This application is intended to be ran with Docker.  Running the following commands in order should get the application running.  

These commands should be run from the root directory.
```bash
docker build --rm -t stocktalkscraper .
docker run --rm --name StockTalkScraper stocktalkscraper init
docker stop StockTalkScraper
```
