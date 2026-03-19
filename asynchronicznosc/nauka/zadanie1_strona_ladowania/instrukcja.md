# Zadanie 1: Strona ładowania (setTimeout)

## Cel
Po kliknięciu przycisku strona ma pokazać **loader** (kręcące kółko) i komunikat „Trwa ładowanie…”. Po **2–3 sekundach** (symulacja pobierania danych) loader ma zniknąć, a w divie z wynikiem ma się pojawić np. lista „załadowanych” elementów.

## Co masz w HTML
- Przycisk `#btnAction` – po kliknięciu wywoływane jest zdarzenie `uruchomTest`.
- Element `#loadingAnim` z klasą `loader` – animacja ładowania (domyślnie `display: none`).
- Element `#wynikUI` – miejsce na wyświetlenie wyniku (tekst lub HTML).

## Kroki do zrobienia w `script.js`

1. Nasłuchuj zdarzenia `uruchomTest`:  
   `document.addEventListener('uruchomTest', function() { ... });`

2. Na początku tej funkcji (callbacku) **pobierz referencje do elementów**:
   - `const wynikUI = document.getElementById('wynikUI');`
   - `const loadingAnim = document.getElementById('loadingAnim');`  
   Potem:
   - Pokaż loader: `loadingAnim.style.display = 'block'` (albo `'flex'`, jeśli chcesz wyśrodkować).
   - Ustaw w `wynikUI` tekst: „Trwa ładowanie…” (np. `wynikUI.textContent = 'Trwa ładowanie...';`).

3. Wywołaj **`setTimeout`**. Składnia: `setTimeout(funkcja, milisekundy)` – pierwszy argument to funkcja (np. strzałkowa), drugi to liczba ms (2000 = 2 s).  
   W tej funkcji (callbacku):
   - Ukryj loader: `loadingAnim.style.display = 'none'`.
   - Wstaw w `wynikUI` gotowy wynik, np. listę w HTML:
     - `wynikUI.innerHTML = '<ul><li>Element 1</li><li>Element 2</li><li>Element 3</li></ul>';`
     - albo dowolny inny tekst / HTML.

## Przydatny fragment z teorii
- **setTimeout(funkcja, milisekundy)** – wykonuje `funkcja` **raz**, po podanym czasie. Kod pod `setTimeout` wykona się od razu – nie czeka na koniec odliczania.
- Do zmiany treści elementu użyj `textContent` (zwykły tekst) lub `innerHTML` (gdy wstawiasz znaczniki, np. `<ul><li>...</li></ul>`).

## Oczekiwany efekt
Po kliknięciu przycisku: od razu widać loader i „Trwa ładowanie…”. Po 2–3 sekundach loader znika i w polu wyniku pojawia się lista (lub inna treść). Strona w międzyczasie nie zamraża się – możesz np. przewijać stronę; to właśnie pokazuje, że `setTimeout` działa asynchronicznie.
