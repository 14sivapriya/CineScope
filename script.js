let searchInput = document.getElementById("searchInput");
let searchBtn = document.querySelector("#searchBtn");
let message = document.getElementById("message");
let moviesContainer = document.getElementById("moviesContainer");


async function searchMovie() {
    let searchItem = searchInput.value;
    if (searchItem.trim() === "") {
        message.textContent = "Please enter a movie name";
    }
    else {
        let url = `https://www.omdbapi.com/?apikey=6e4fcf9&s=${searchItem}`;
        let response = await fetch(url);
        let movieData = await response.json();
        console.log(movieData.Search);

        moviesContainer.innerHTML = "";
        movieData.Search.forEach((movie) => {

            let card = `<div class="movie-card">
                        <img src="${movie.Poster}">
                        <h3>${movie.Title}</h3>
                        <p>${movie.Year}</p>
                        </div>`;
            moviesContainer.innerHTML = moviesContainer.innerHTML + card;
        });
    message.textContent = "";
    }
}
searchBtn.addEventListener("click", () => {
    searchMovie();
});




