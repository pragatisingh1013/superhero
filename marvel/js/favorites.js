document.addEventListener('DOMContentLoaded', () => {
    const favoriteSuperheroList = document.getElementById('favoriteSuperheroList');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoriteSuperheroList.innerHTML = '<p class="text-center">No favorite superheroes found.</p>';
        return;
    }

    favorites.forEach(heroId => {
        fetchSuperheroDetails(heroId);
    });
});

function fetchSuperheroDetails(id) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayFavoriteSuperhero(data.data.results[0]))
        .catch(error => console.error('Error fetching superhero details:', error));
}

function displayFavoriteSuperhero(hero) {
    const favoriteSuperheroList = document.getElementById('favoriteSuperheroList');
    const heroElement = document.createElement('div');
    heroElement.classList.add('col-md-3');
    heroElement.innerHTML = `
        <div class="card mb-4">
            <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="card-img-top" alt="${hero.name}">
            <div class="card-body">
                <h5 class="card-title">${hero.name}</h5>
                <button class="btn btn-danger" onclick="removeFromFavorites(${hero.id})">Remove from Favorites</button>
                <a href="superhero.html?id=${hero.id}" class="btn btn-secondary">View Details</a>
            </div>
        </div>
    `;
    favoriteSuperheroList.appendChild(heroElement);
}

function removeFromFavorites(heroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== heroId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload();
}
