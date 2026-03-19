// Zadanie 4: Stwórz Promise z setTimeout i resolve, potem .then() wyświetl wynik.
// Przeczytaj instrukcja.md.

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');
    const loadingAnim = document.getElementById('loadingAnim');

    loadingAnim.style.display = 'block';
    wynikUI.textContent = 'Ładowanie...';

    const obietnica = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Poczta przyszła! Oto Twoje dane."), 2000);
    });
    obietnica.then((dane) => { loadingAnim.style.display = 'none'; wynikUI.textContent = dane; });
});
