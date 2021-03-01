# Stock Talk
Stock talk is a service that monitors social media such as Reddit for mentions of stock tickers.
It allows users to watch for tickers and ticker sentiment.

# Architecture
Stock talk consists of three packages.  Currently, only package number one has been implemented.
1) The scraping service written in python which scrapes social media, performs sentiment analysis and saves the gathered data into a MongoDB database. 
2) A GraphQL api written in Typescript using Nestjs used to query the database and form the data into meaningful sets.
3) A React Single Page Application.

For more information on each package, see their individual README files.

