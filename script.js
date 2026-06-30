let searchInput = document.getElementById("searchInput");
let searchBtn = document.querySelector("#searchBtn");
let message = document.getElementById("message");
let moviesContainer = document.getElementById("moviesContainer");
let watchListMovies = [];
let watchlistContainer = document.getElementById("watchlistContainer");
let watchlistMessage = document.getElementById("watchlistMessage");

function createMovieCard(movie, btnType) {
    let card = document.createElement("div");
    card.classList.add("movie-card");

    let img = document.createElement("img");
    img.src = movie.Poster;
    card.appendChild(img);

    let title = document.createElement("h3");
    title.textContent = movie.Title;
    card.appendChild(title);

    let year = document.createElement("p");
    year.textContent = movie.Year;
    card.appendChild(year);

    let watchBtn = document.createElement("button");

    if (btnType == "add") {

        watchBtn.textContent = "Add to Watchlist";

        watchBtn.addEventListener("click", () => {
            let added = addToWatchlist(movie);
            if (added) {
                watchBtn.textContent = "Added";
                watchBtn.disabled = true;
            }
        });

    }
    else {
        watchBtn.textContent = "Remove";
        watchBtn.addEventListener("click", () => {
            removeFromWatchlist(movie);
        });
    }

    card.appendChild(watchBtn);
    return card;
}


async function searchMovie() {
    let searchItem = searchInput.value;
    if (searchItem.trim() === "") {
        message.textContent = "Please enter a movie name";
    }
    else {
        let url = `https://www.omdbapi.com/?apikey=6e4fcf9&s=${searchItem}`;
        message.textContent = "Searching...";

        try {
            let response = await fetch(url);
            let movieData = await response.json();

            console.log(movieData.Search);

            moviesContainer.innerHTML = "";

            if (movieData.Search) {
                movieData.Search.forEach((movie) => {
                    let card = createMovieCard(movie, "add");
                    moviesContainer.appendChild(card);

                });
                message.textContent = "";
            }
            else {
                message.textContent = "Movie not found";
            }
        }
        catch (error) {
            console.log(error);
            message.textContent = "Something went wrong. Please try again.";
        }
    }
}


function addToWatchlist(movie) {
    let existingMovie = watchListMovies.find((item) => {
        return item.imdbID === movie.imdbID;
    });
    if (existingMovie) {
        message.textContent = "Already Added";
        return false;

    }
    else {
        watchListMovies.push(movie);
        message.textContent = "Added to Watchlist";
        displayWatchlist();
        return true;
    }

}
searchBtn.addEventListener("click", () => {
    searchMovie();
});


function removeFromWatchlist(movie) {
    watchListMovies=watchListMovies.filter((item) => {
        return item.imdbID !== movie.imdbID;
    });

    displayWatchlist();
}


function displayWatchlist() {

    watchlistContainer.innerHTML = "";

    if(watchListMovies.length===0){
        watchlistMessage.style.display="block";
        return;
    }

    watchlistMessage.style.display="none";

    watchListMovies.forEach((movie) => {
        let card = createMovieCard(movie, "remove");
        watchlistContainer.append(card);
    });
}




