// Rozwiązanie zadania 1: Strona ładowania (setTimeout)

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');
    const loadingAnim = document.getElementById('loadingAnim');

    loadingAnim.style.display = 'block';
    wynikUI.textContent = 'Trwa ładowanie...';

    setTimeout(() => {
        loadingAnim.style.display = 'none';
        wynikUI.innerHTML = 'Gotowe! Załadowane elementy:<ul><li>Element 1</li><li>Element 2</li><li>Element 3</li></ul>';
    }, 2500);
});
