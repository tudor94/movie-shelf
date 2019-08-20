$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=f9f9969f")
    .then(response => {
      let movies = response.data.Search;
      let output = "";
      if (response.data.Error) {
        alert("No results found.");
      } else {
        $.each(movies, (index, movie) => {
          output += `
          <div class = "col-md-3">
            <div class = "well text-center">
                <img src = "${movie.Poster}">
                <h5>${
                  movie.Title.length < 12
                    ? `${movie.Title}`
                    : `${movie.Title.substring(0, 13)}...`
                }</h5>
                <a onclick="movieSelected('${
                  movie.imdbID
                }')" class = "btn btn-primary" href="#">Details</a>
            </div>
        </div>    
          `;
        });
      }
      $("#movies").html(output);
    })
    .catch(err => {
      alert(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  var movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=f9f9969f")
    .then(response => {
      console.log(response);
      let movie = response.data;
      let output = `
      <div class = "row">
        <div class = "col-md-4">
            <img src = "${movie.Poster}" class = "thumbnail">
        </div>
        <div class = "col-md-8">
            <h1>${movie.Title}</h1>
            <ul class ="list-group">
            <li class = "list-group-item"><strong>Release Date: </strong> ${
              movie.Released
            }</li>   
            <li class = "list-group-item"><strong>Country: </strong> ${
              movie.Country
            }</li>
            <li class = "list-group-item"><strong>Genre: </strong> ${
              movie.Genre
            }</li>
            <li class = "list-group-item"><strong>Actors: </strong> ${
              movie.Actors
            }</li>
            <li class = "list-group-item"><strong>Director: </strong> ${
              movie.Director
            }</li>
            <li class = "list-group-item"><strong>Metascore: </strong> ${
              movie.Metascore
            }</li>
        </div>
      </div>
      <div id="plotInfo" class = "row">
        <div class = "well">
            <h1>Plot</h1>
            <p>${movie.Plot}</p>
        
            <a href="http://imdb.com/title/${
              movie.imdbID
            }" target="_blank" class = "btn btn-primary imdbBtn">IMDB : ${
        movie.imdbRating
      }</a>
        </div>
      </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      alert(err);
    });
}
