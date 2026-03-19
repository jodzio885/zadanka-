# Zadanie 6: async / await (pogoda)

## Cel
Zamiast łańcucha **.then()** użyć **async** i **await**: jedna funkcja `async`, wewnątrz niej **await** na Promise – kod „czeka” na wynik i wygląda jak zwykły, synchroniczny. Błędy z **reject** łapiesz w **try / catch**. W tym zadaniu: Promise symulująca „pogodę” (po 2 s zwraca np. „Słonecznie”), a funkcja async wyświetla wynik w `wynikUI`.

## Co masz w HTML
- Przycisk `#btnAction` – po kliknięciu wywoływane jest zdarzenie `uruchomTest`.
- Element `#wynikUI` – wyświetlisz tu komunikat „Pobieram pogodę…”, a potem wynik z await (np. „Pogoda: Słonecznie”).

## Kroki do zrobienia w `script.js`

1. **Stwórz Promise** (np. na górze pliku, przed listenerem):
   - W środku **setTimeout** (np. 2000 ms) wywołaj **resolve("Słonecznie")**. To jest wartość, którą „dostaniesz” w zmiennej po `await`. Tekst „Pogoda: ” dopisujesz dopiero przy wyświetlaniu w `wynikUI`.
   - Opcjonalnie możesz dodać **reject** w jakimś warunku, żeby przetestować blok **catch**.

2. **Stwórz funkcję async**, np. `async function pobierzPogode() { ... }`:
   - Na początku pobierz element: `const wynikUI = document.getElementById('wynikUI');`
   - W bloku **try**:
     - Ustaw w `wynikUI` tekst „Pobieram pogodę…”.
     - Napisz: **const wynik = await twojaPromise;** (wstaw nazwę swojej obietnicy). Wykonanie „zatrzyma się” tutaj na ok. 2 s, aż Promise się rozstrzygnie.
     - Ustaw w `wynikUI` wynik: `wynikUI.textContent = 'Pogoda: ' + wynik;`
   - W bloku **catch (err)** ustaw komunikat błędu: `wynikUI.textContent = 'Błąd: ' + err;` (wykona się, gdy Promise wywoła `reject`).

3. **W nasłuchiwaczu `uruchomTest`** wywołaj **pobierzPogode();** – nie musisz pisać `await pobierzPogode()`, bo funkcja i tak wykona się do końca i zaktualizuje stronę.

4. **Uwaga:** Słowa **await** możesz użyć **tylko** wewnątrz funkcji oznaczonej słowem **async**. Poza funkcją async składnia `await` jest niedozwolona.

## Przydatny fragment z teorii
- **async function nazwa() { ... }** – funkcja asynchroniczna; wewnątrz niej możesz używać **await**.
- **await obietnica** – wykonanie funkcji „czeka” tu, aż obietnica się rozstrzygnie. Zwracana wartość to to, co przekazałeś do **resolve**.
- **try { ... } catch (err) { ... }** – gdy obietnica wywoła **reject**, wykonanie przeskoczy do bloku **catch** i zmienna `err` będzie miała wartość przekazaną do `reject`.

## Oczekiwany efekt
Klik → w polu wyniku od razu „Pobieram pogodę…” → po ok. 2 s pojawia się „Pogoda: Słonecznie” (lub inna wartość z `resolve`). Gdyby Promise wywołał `reject`, w bloku catch zobaczysz „Błąd: …”.  
**Uwaga:** Przy drugim i kolejnych kliknięciach Promise jest już rozstrzygnięta, więc wynik może pojawić się od razu – to normalne zachowanie.
