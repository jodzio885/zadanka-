// Zadanie 2: Stoper – setInterval (co 1 s) i clearInterval (Stop).
// Przeczytaj instrukcja.md.

let sekundy = 0;
let idIntervalu = null;

const wynikUI = document.getElementById('wynikUI');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

btnStart.addEventListener('click', () => {
    clearInterval(idIntervalu); 
    idIntervalu = null;
    sekundy = 0; 
    wynikUI.textContent = '0 s';
    idIntervalu = setInterval(() => { sekundy++; wynikUI.textContent = sekundy + ' s'; }, 1000);
});

btnStop.addEventListener('click', () => {
    clearInterval(idIntervalu); 
    idIntervalu = null;
});
