// Rozwiązanie zadania 3: Minutnik bomby

let licznik = 5;
let idIntervalu = null;

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');

    licznik = 5;
    wynikUI.textContent = licznik;

    idIntervalu = setInterval(() => {
        licznik--;
        if (licznik >= 0) {
            wynikUI.textContent = licznik;
        }
        if (licznik === 0) {
            clearInterval(idIntervalu);
            idIntervalu = null;
            wynikUI.textContent = 'BOMBA! BUM!';
        }
    }, 1000);
});
