async function getMovies() {
    try {
        const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
        const movies = await response.json();
        console.log(movies);
    } catch (error) {
        console.error('Error fetching movies:', );
    }
}

function createStarRating(vote_average) {
    const maxStars = 5;
    const starContainer = document.createElement('div');
    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('i');
        if (i <= vote_average / 2) {
            star.classList.add('fas', 'fa-star');  // Estrella llena
        } else {
            star.classList.add('far', 'fa-star');  // Estrella vacía
        }
        starContainer.appendChild(star);
    }
    return starContainer;
}

async function showMovies(searchValue) {
    const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
    const movies = await response.json();

    const filteredMovies = movies.filter(movie => {
        // Convertimos a minúsculas el título, tagline y overview para la búsqueda
        const titleMatch = movie.title?.toLowerCase().includes(searchValue.toLowerCase());
        const taglineMatch = movie.tagline?.toLowerCase().includes(searchValue.toLowerCase());
        const overviewMatch = movie.overview?.toLowerCase().includes(searchValue.toLowerCase());

        const genresMatch = Array.isArray(movie.genres) && 
movie.genres.some(g => typeof g === 'string' && g.toLowerCase().includes(searchValue.toLowerCase()));

        // Retornamos true si alguna de las condiciones coincide
        return titleMatch || taglineMatch || overviewMatch || genresMatch;
    });
    

    const movieList = document.getElementById('lista');
    movieList.innerHTML = ''; // Limpiar resultados previos

    filteredMovies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('card', 'bg-dark');
        movieItem.innerHTML = `
        <div class= "row ">
            <div class="col-10">
                <h5>${movie.title}</h5>
                <p class="text-muted"><em>${movie.tagline}</em></p>
            </div>
            <div class= "col">${createStarRating(movie.vote_average).outerHTML}</div>
        </div>
        `;
        movieList.appendChild(movieItem);
    });
}

document.getElementById('btnBuscar').addEventListener('click', () => {
    const searchValue = document.getElementById('inputBuscar').value;
    showMovies(searchValue);
});


document.addEventListener("DOMContentLoaded", function(){
    getMovies();
});

