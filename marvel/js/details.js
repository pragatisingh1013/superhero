// details.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const superheroId = urlParams.get('id');
    if (superheroId) {
        fetchSuperheroDetails(superheroId);
    }
});

function fetchSuperheroDetails(id) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displaySuperheroDetails(data.data.results[0]))
        .catch(error => console.error('Error fetching superhero details:', error));
}

function displaySuperheroDetails(hero) {
    document.getElementById('superheroName').textContent = hero.name;
    document.getElementById('superheroImage').src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    document.getElementById('superheroDescription').textContent = hero.description || 'No description available.';

    displayList('superheroComics', hero.comics.items);
    displayList('superheroSeries', hero.series.items);
    displayList('superheroStories', hero.stories.items);
    displayList('superheroEvents', hero.events.items);
}

function displayList(elementId, items) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    if (items.length === 0) {
        list.innerHTML = '<li class="list-group-item">No items available.</li>';
        return;
    }
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.name;
        list.appendChild(listItem);
    });
}
