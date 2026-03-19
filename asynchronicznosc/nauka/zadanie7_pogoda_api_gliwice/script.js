// Zadanie 7: Pogoda z API dla Gliwic (fetch + async/await).
// Przeczytaj instrukcja.md i sekcję 5 w teoria.md (fetch, JSON).

const btnPobierz = document.getElementById('btnPobierz');
btnPobierz.addEventListener('click', pobierzPogode);

async function pobierzPogode() {
    const loadingAnim = document.getElementById('loadingAnim');
    const temp = document.getElementById('temp');
    const zachmurzenie = document.getElementById('zachmurzenie');
    const wiatr = document.getElementById('wiatr');
    const komunikat = document.getElementById('komunikat');

    komunikat.textContent = 'Pobieram pogodę…';
    loadingAnim.style.display = 'block';

    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.2945&longitude=18.6714&current=temperature_2m,cloud_cover,wind_speed_10m' 
        const response = await fetch(url);
        const dane = await response.json();
        temp.textContent = dane.current.temperature_2m + ' °C';
        zachmurzenie.textContent = dane.current.cloud_cover + ' %';
        wiatr.textContent = dane.current.wind_speed_10m + ' km/h';
        loadingAnim.style.display = 'none'; 
        komunikat.textContent = 'Pogoda dla Gliwic';
    } catch (err) {
        loadingAnim.style.display = 'none';
        komunikat.textContent = 'Błąd połączenia: ' + err.message;
    }
}
