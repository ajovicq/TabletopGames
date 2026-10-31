# TabletopGames

## Brief Repository Description
This repository contains a brief dataset on tabletop board games. It includes the names of the games, the release date, main genre etc... A more detailed description of the dataset can be found below. 

- Author: Antonio Jović
- Version: 1.0
- Data language: English
- Last updated: 30th October 2026
- File formats used: JSON and CSV
- License: GNU GPL
- Data source: Handpicked data from boardgamegeek.com & boardgamefyi.com
- Methodology: The data was normalized and processed in PostgreSQL and directly exported to JSON and CSV   

## Dataset Attribute Descriptions
- game_id: Sequentally assigned integers describing one tabletop game starting from 1 (one)
- game_name: Title of the board game used at the time of initial publishing
- release_year: Original year of release of the board game
- min_players: Minimum amount of players needed to play the game
- max_players: Maximum amount of players allowed to play the game (if value is NULL then there is no maximum limit)
- recommended_min_age: Minimum age recommended to play the game
- playtime_minutes: Minimum estimated time to play one session  
- publisher: The main publisher responsible for publishing the original game (There can be many publishers for one game as there are localized versions that are published by separate local publishers, in this dataset only the original publisher is listed)
- avg_rating: Average rating taken across multiple rating websites
- genre_id: Sequentally assigned integers describing genres starting from 1 (one)
- genre_name: Name of a tabletop game genre
- expansions: Array containing multiple (or none) expansions that are released for a game
- expansion_id: Sequentally assigned integers describing an expansion starting from 1 (one)
- expansion_name: Name of the tabletop game expansion
- expansion_release_year: Year of release of the tabletop game expansion
- designers: Array containing one or more designers that are credited for the original tabletop game (does not include expansions)
- designer_id: Sequentally assigned integers describing a designer starting from 1 (one)
- designer_name: Full name of a designer