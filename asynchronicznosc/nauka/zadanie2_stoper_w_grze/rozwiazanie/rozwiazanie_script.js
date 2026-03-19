// Rozwiązanie zadania 2: Stoper (setInterval i clearInterval)

let sekundy = 0;
let idIntervalu = null;

const wynikUI = document.getElementById('wynikUI');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

btnStart.addEventListener('click', () => {
    if (idIntervalu !== null) {
        clearInterval(idIntervalu);
        idIntervalu = null;
    }
    sekundy = 0;
    wynikUI.textContent = sekundy + ' s';
    idIntervalu = setInterval(() => {
        sekundy++;
        wynikUI.textContent = sekundy + ' s';
    }, 1000);
});

btnStop.addEventListener('click', () => {
    clearInterval(idIntervalu);
    idIntervalu = null;
});
