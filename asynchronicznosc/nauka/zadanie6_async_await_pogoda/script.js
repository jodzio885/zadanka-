// Zadanie 6: async/await – funkcja async, wewnątrz await na Promise, wynik w try/catch.
// Przeczytaj instrukcja.md.

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
