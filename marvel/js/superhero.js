const publicKey = 'f5c36d5d80b1e3274e499e19ca0bb97d';
const privateKey = '8c1d722b117a211a7c04818ba694a7249a5872eb';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('id');
    fetchSuperheroDetails(heroId);
});

function fetchSuperheroDetails(heroId) {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySuperheroDetails(data.data.results[0]))
        .catch(error => console.error('Error fetching data:', error));
}

function displaySuperheroDetails(hero) {
    document.getElementById('superheroName').textContent = hero.name;
    document.getElementById('superheroDetails').innerHTML = `
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" class="img-fluid mb-4" alt="${hero.name}">
        <p>${hero.description}</p>
        <h3>Comics</h3>
        <ul>${hero.comics.items.map(item => `<li>${item.name}</li>`).join('')}</ul>
        <h3>Series</h3>
        <ul>${hero.series.items.map(item => `<li>${item.name}</li>`).join('')}</ul>
        <h3>Stories</h3>
        <ul>${hero.stories.items.map(item => `<li>${item.name}</li>`).join('')}</ul>
        <h3>Events</h3>
        <ul>${hero.events.items.map(item => `<li>${item.name}</li>`).join('')}</ul>
    `;
}
