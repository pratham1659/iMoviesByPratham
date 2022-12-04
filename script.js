// Titles: https://omdbapi.com/?s=thor&page=1&apikey=755f786c
// details: http://www.omdbapi.com/?i=tt3896198&apikey=755f786c

//Movie Database JavaScript
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// Set default data to localstorage
if (!localStorage.getItem("favMovies")) {
  let favMovies = [];
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=755f786c`;
  const res = await fetch(`${URL}`); ////Fetching data from server
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") {
    displayMovieList(data.Search); //then display the autocomplete box
  }
}

//Find movies as you type any character
const findMovies = () => {
  let searchTerm = movieSearchBox.value.trim();
  // Get typed value and remove whitespace
  //Perform operation only if any character is present inthe search box
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list"); // Hide the autocomplete box if no character is present in the search box
  }
};

// Show the matched movies in the autocomplete box
const displayMovieList = (movies) => {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") {
      moviePoster = movies[idx].Poster; // Set found image address
    } else {
      moviePoster = "asset/image_not_found.png"; //If image not found then set default image
    }

    //Add a matched result to list
    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
           <img src="${moviePoster}" alt="movie">
        </div>

        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
    //Add a mathched movie to autocomplete list
  }
  loadMovieDetails(); //Load Movie Details
};

//----------------------------------------------------------------

//Load movie details
const loadMovieDetails = () => {
  const searchListMovies = searchList.querySelectorAll(".search-list-item"); //Select all Matched movies
  //Add all matched movies to autmocomplete box
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list"); //Add CSS
      movieSearchBox.value = ""; //Reset search box
      localStorage.setItem("movieID", movie.dataset.id); // Set movie id to localstorage for later use
      let dir =
        window.location.origin + "/iMoviesByPratham/pages/resultPage.html"; // Custom URL for result page
      window.location.href = "/pages/resultPage.html"; //Redirect to a new page
    });
  });
};

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list"); // Hide autocomplete box if user click anywhere other than autocomplete box
  }
});

movieSearchBox.addEventListener("keyup", findMovies);
movieSearchBox.addEventListener("click", findMovies);

//Bootstrap spinner
const spinnerWrapper = document.querySelector(".spinner-wrapper");
window.addEventListener("load", () => {
  spinnerWrapper.style.opacity = "0";

  setTimeout(() => {
    spinnerWrapper.style.display = "none";
  }, 200);
});
