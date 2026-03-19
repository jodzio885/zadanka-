// Rozwiązanie zadania 5: reject i .catch()

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');

    const obietnicaLogowania = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('Zalogowano pomyślnie');
            } else {
                reject('Brak odpowiedzi logowania HTTP 403');
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
