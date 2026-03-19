// Zadanie 3: Minutnik bomby – odliczanie 5→0, na 0: clearInterval i "BOMBA! BUM!".
// Przeczytaj instrukcja.md.

let licznik = 5;
let idIntervalu = null;

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');

    licznik = 5;
    wynikUI.textContent = licznik;

    idIntervalu = setInterval(() => {
        licznik--;
        if (licznik >= 0){ wynikUI.textContent = licznik};
        if (licznik === 0){ clearInterval(idIntervalu); wynikUI.textContent = 'BOMBA! BUM!'};
    }, 1000);
});
