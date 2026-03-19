// Rozwiązanie zadania 6: async / await (pogoda)

const pogodaPromise = new Promise((resolve) => {
    setTimeout(() => resolve('Słonecznie'), 2000);
});

document.addEventListener('uruchomTest', () => {
    pobierzPogode();
});

async function pobierzPogode() {
    const wynikUI = document.getElementById('wynikUI');
    try {
        wynikUI.textContent = 'Pobieram pogodę...';
        const wynik = await pogodaPromise;
        wynikUI.textContent = 'Pogoda: ' + wynik;
    } catch (err) {
        wynikUI.textContent = 'Błąd: ' + err;
    }
}
