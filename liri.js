require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var moment = require('moment');
var axios = require('axios');
var Spotify=require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var searchType=process.argv[2];
var searchTerm=process.argv.slice(3).join(" ");


function search(searchType, SearchTerm){
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
        console.log("Venue Name: " + result.venue.name);
        console.log("Venue Location: " + result.venue.city + ", " + result.venue.country);
        console.log("Event Date: " + moment(result.datetime).format("MM/DD/YYYY"));
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
        artistString.substring(0,artistString.length-2);
        console.log("Artist(s): " + artistString);
        console.log("Song Name: " + result.name);
        console.log("Preview URL: " + result.preview_url);
        console.log("Album: " + result.album.name);
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
        console.log("Title: " + result.Title);
        console.log("Release Year: " + result.Year);
        console.log("IMDB Rating: " + result.imdbRating);
        var tomatoString="N/A";
        for(var i=0; i<result.Ratings.length; i++)
        {
            if(result.Ratings[i].Source==='Rotten Tomatoes')
            {
                tomatoString=result.Ratings[i].Value;
            }
        }
        console.log("Rotten Tomatoes Rating: " + tomatoString);
        console.log("Country: " + result.Country);
        console.log("Language: " + result.Language);
        console.log("Plot: " + result.Plot);
        console.log("Actors: " + result.Actors);
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

