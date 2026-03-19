// Rozwiązanie zadania 4: Własna Promise

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');
    const loadingAnim = document.getElementById('loadingAnim');

    loadingAnim.style.display = 'block';
    wynikUI.textContent = 'Ładowanie...';

    const mojaObietnica = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Poczta przyszła! Oto Twoje dane.');
        }, 2000);
    });

    mojaObietnica.then((dane) => {
        loadingAnim.style.display = 'none';
        wynikUI.textContent = dane;
    });
});
