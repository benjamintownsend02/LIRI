# LIRI
LIRI is a Node.js CLI app that allows the user to search for various information readouts from a single source, saving time. It is run from liri.js.
## Instructions
When running the app, the user's first command line argument is taken as the type of search, and all subsequent arguments are taken as the text of the search. 
Valid search types are:
1. "spotify-this-song" : searches using Spotify for a song name and logs artist, song name, preview url, and album name.  
Example:  
![alt text](https://github.com/benjamintownsend02/LIRI/blob/master/screenshots/spotify.PNG)

2.  "concert-this": searches using the Bands in Town Artist Events API for an artist and logs the venue name, location, and event date of the next event.  
Example:  
![alt text](https://github.com/benjamintownsend02/LIRI/blob/master/screenshots/concert.PNG)

3. "movie-this" : searches using the OMBD API for a movie title and logs the movie's title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot summary, and actor list.  
Example:  
![alt text](https://github.com/benjamintownsend02/LIRI/blob/master/screenshots/movie.PNG)

4. "do-what-it-says" : reads the random.txt file and takes the string values before and after the first comma as the search type and search term, then logs the appropriate results (i.e. it performs one of the search types 1-3).   
Example:  
![alt text](https://github.com/benjamintownsend02/LIRI/blob/master/screenshots/do-what.PNG)

The search and its output is printed to console and appended to log.txt.

Failure to enter a search term results in results being returned for a default term (e.g. the singer celine dion).

## Dependencies
LIRI requires the following node modules:
1. axios
2. dotenv
3. moment
4. node-spotify-api

Please see the package.json file for more information.

Additionally, the user must currently provide a .env file with valid spotify ID and secret keys for the api to function.

## Other Information
Version: 1.0

Author: benjamintownsend02

Known Issues: none
