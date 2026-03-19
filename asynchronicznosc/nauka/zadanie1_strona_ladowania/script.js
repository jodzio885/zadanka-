// Zadanie 1: Po kliknięciu pokaż loader, po 2–3 s ukryj go i pokaż wynik (setTimeout).
// Przeczytaj instrukcja.md – tam są dokładne kroki.

document.addEventListener('uruchomTest', () => {
    const wynikUI = document.getElementById('wynikUI');
    const loadingAnim = document.getElementById('loadingAnim');

    
    // KROK 1: Pokaż loader i ustaw w wynikUI tekst "Trwa ładowanie..."
    loadingAnim.style.display = 'block'
    wynikUI.textContent = 'trwa ladowanie'

    setTimeout(function(){
        loadingAnim.style.display = 'none'
        wynikUI.innerHTML = '<ul><li>...</li></ul>'
    },2000)

    // KROK 2: Wywołaj setTimeout( function, 2000 ). W środku funkcji:


});
