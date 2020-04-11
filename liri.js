require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var moment = require('moment');
var axios = require('axios');
var Spotify=require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var searchType=process.argv[2];
var searchTerm=process.argv.slice(3).join(" ");


function search(searchType, searchTerm){
    if(searchType==="concert-this")
    {
        var artist="celine+dion";
        if(searchTerm.length>0)
        {
            artist=searchTerm.replace(" ","+");
        }
        var bandURL="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        axios.get(bandURL).then(
        function(response) {
        var result = response.data[0];
        var outputString="\n" +"------------------------------" + "\n" 
                          + "Search: " + searchType + " " + searchTerm + "\n" 
                          + "Venue Name: " + result.venue.name + "\n"
                          + "Venue Location: " + result.venue.city + ", " + result.venue.country + "\n"
                          + "Event Date: " + moment(result.datetime).format("MM/DD/YYYY");
        //console.log("Venue Name: " + result.venue.name);
        //console.log("Venue Location: " + result.venue.city + ", " + result.venue.country);
        //console.log("Event Date: " + moment(result.datetime).format("MM/DD/YYYY"));
        console.log(outputString);
        appendLog(outputString);
        })
        .catch(function(error) {
        if (error.response) {
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    }
    else if(searchType==="spotify-this-song")
    {
        var song="The+Sign";
        if(searchTerm.length>0)
        {
            song=searchTerm.replace(" ","+");
        }
        "https://api.spotify.com/v1/search?q=" + song
         var spotifyURL="https://api.spotify.com/v1/search?q=" + song + "/events?app_id=codingbootcamp"
        spotify.search({type: "track", query: song, limit: 1}, function(err,data){
        if(err){
            return console.log("Error: " + err)
        }
        var result=data.tracks.items[0];
        var artistString="";
        for(var i=0; i<result.artists.length; i++)
        {
            artistString = artistString + result.artists[i].name + ", ";
        }
        artistString=artistString.substring(0,artistString.length-2);
        var outputString="\n" + "------------------------------" + "\n" 
                        + "Search: " + searchType + " " + searchTerm + "\n" 
                        + "Artist(s): " + artistString + "\n"
                        + "Song Name: " + result.name + "\n"
                        + "Preview URL: " + result.preview_url + "\n"
                        + "Album: " + result.album.name;
        //console.log("Artist(s): " + artistString);
        //console.log("Song Name: " + result.name);
        //console.log("Preview URL: " + result.preview_url);
        //console.log("Album: " + result.album.name);
        console.log(outputString);
        appendLog(outputString);
        });
    }
    else if(searchType==="movie-this")
    {
        var forcedYear="2009"
        var movieName="mr+nobody";
        if(searchTerm.length>0)
        {
            movieName=searchTerm.replace(" ","+");
            forcedYear="";
        }
        var movieURL="http://www.omdbapi.com/?t=" + movieName + "&y=" + forcedYear + "&plot=short&apikey=trilogy";
        axios.get(movieURL).then(
        function(response) {
        var result=response.data;
        //console.log("Title: " + result.Title);
        //console.log("Release Year: " + result.Year);
        //console.log("IMDB Rating: " + result.imdbRating);
        var tomatoString="N/A";
        for(var i=0; i<result.Ratings.length; i++)
        {
            if(result.Ratings[i].Source==='Rotten Tomatoes')
            {
                tomatoString=result.Ratings[i].Value;
            }
        }
        //console.log("Rotten Tomatoes Rating: " + tomatoString);
        //console.log("Country: " + result.Country);
        //console.log("Language: " + result.Language);
        //console.log("Plot: " + result.Plot);
        //console.log("Actors: " + result.Actors);
        //console.log("HERE");
        var outputString="\n" +"------------------------------" + "\n" 
                        + "Search: " + searchType + " " + searchTerm + "\n" 
                        + "Title: " + result.Title + "\n"
                        + "Release Year: " + result.Year + "\n"
                        + "Preview URL: " + result.preview_url + "\n"
                        + "IMDB Rating: " + result.imdbRating + "\n"
                        + "Rotten Tomatoes Rating: " + tomatoString + "\n"
                        + "Country: " + result.Country + "\n"
                        + "Language: " + result.Language + "\n"
                        + "Plot: " + result.Plot + "\n"
                        + "Actors: " + result.Actors;
        console.log(outputString);
        appendLog(outputString);
    })
    .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
    });
  }
}

function appendLog(outputString){
  fs.appendFile("log.txt", outputString, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("log.txt was updated!");
  });
}

if(searchType==="do-what-it-says")
{
    fs.readFile("random.txt","utf-8",function(err,data){
        if (err) {
            return console.log(err);
        }
        searchType = data.substring(0,data.indexOf(','));
        searchTerm = data.substring(data.indexOf(',')+2,data.length-1);
        search(searchType, searchTerm);
    });
}
else
{
    search(searchType, searchTerm);
}

