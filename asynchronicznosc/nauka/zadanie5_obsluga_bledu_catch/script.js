// Zadanie 5: Promise z resolve/reject (np. Math.random()). Obsłuż wynik w .then() i błąd w .catch().
// Przeczytaj instrukcja.md.

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');

    const obietnicaLogowania = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('Zalogowano');
            } else {
                reject('Błąd HTTP 403');
            }
        }, 1000);
    });

    obietnicaLogowania
        .then((dane) => {
            wynikUI.textContent = 'OK: ' + dane;
        })
        .catch((err) => {
            wynikUI.textContent = 'Błąd: ' + err;
        });
});
