document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const superheroList = document.getElementById('superheroList');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Search button clicked with query:', query);
            fetchSuperheroes(query);
        }
    });
});

function fetchSuperheroes(query) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displaySuperheroes(data.data.results))
        .catch(error => console.error('Error fetching superheroes:', error));
}

function displaySuperheroes(superheroes) {
    console.log('Displaying superheroes:', superheroes);
    superheroList.innerHTML = '';
    if (superheroes.length === 0) {
        superheroList.innerHTML = '<p class="text-center">No superheroes found.</p>';
        return;
    }
    superheroes.forEach(hero => {
        const heroElement = document.createElement('div');
        heroElement.classList.add('col-md-3');
        heroElement.innerHTML = `
            <div class="card mb-4">
                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="card-img-top" alt="${hero.name}">
                <div class="card-body">
                    <h5 class="card-title">${hero.name}</h5>
                    <button class="btn btn-primary" onclick="addToFavorites(${hero.id})">Add to Favorites</button>
                    <a href="superhero.html?id=${hero.id}" class="btn btn-secondary">View Details</a>
                </div>
            </div>
        `;
        superheroList.appendChild(heroElement);
    });
}

function addToFavorites(heroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(heroId)) {
        favorites.push(heroId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites!');
    } else {
        alert('Already in favorites!');
    }
}
