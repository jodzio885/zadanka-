# Zadanie 5: Obsługa błędu – reject i .catch()

## Cel
Promise może zakończyć się **sukcesem** (`resolve`) albo **błędem** (`reject`). W tym zadaniu symulujesz „logowanie”: po ok. 1 s, z losowym prawdopodobieństwem (`Math.random() > 0.5`), wywołujesz **resolve** (sukces) albo **reject** (błąd). Na stronie w **.then()** pokazujesz komunikat sukcesu, w **.catch()** – komunikat błędu. Dzięki temu zobaczysz, że obsługujemy oba przypadki.

## Co masz w HTML
- Przycisk `#btnAction` – po kliknięciu wywoływane jest zdarzenie `uruchomTest`.
- Element `#wynikUI` – wyświetlisz tu komunikat sukcesu (z `.then()`) albo błędu (z `.catch()`). Opcjonalnie możesz dodać klasę CSS (np. `.sukces` / `.blad`) do tego elementu w zależności od wyniku.

## Kroki do zrobienia w `script.js`

1. **W nasłuchiwaczu `uruchomTest`** (przy każdym kliknięciu) **stwórz nową Promise** – wtedy za każdym razem losowanie będzie od nowa i zobaczysz raz sukces, raz błąd:
   - W środku **setTimeout** (np. 1000 ms):
     - Jeśli `Math.random() > 0.5` → **resolve("Zalogowano pomyślnie")** (albo inny tekst).
     - W przeciwnym razie → **reject("Błąd logowania HTTP 403")** (albo inny komunikat błędu).
   - Na początku callbacku pobierz element: `const wynikUI = document.getElementById('wynikUI');`

2. **Po utworzeniu Promise** dopisz łańcuch:
   - **.then((dane) => { ... })** – ustaw w `wynikUI` tekst z `dane`, np. „OK: Zalogowano pomyślnie”. Opcjonalnie ustaw klasę/color na „sukces”.
   - **.catch((err) => { ... })** – ustaw w `wynikUI` tekst błędu z `err`, np. `wynikUI.textContent = 'Błąd: ' + err;`. Opcjonalnie możesz dodać klasę CSS (np. `.sukces` / `.blad`) do elementu `wynikUI` w zależności od wyniku.

3. **Przykład:**
   ```js
   obietnica
       .then((dane) => { wynikUI.textContent = 'OK: ' + dane; })
       .catch((err) => { wynikUI.textContent = 'Błąd: ' + err; });
   ```

4. **Sprawdź:** Kliknij przycisk kilka razy – za każdym razem po ok. 1 s zobaczysz albo komunikat sukcesu (z `.then()`), albo błędu (z `.catch()`), w zależności od losu.

## Przydatny fragment z teorii
- **resolve(wynik)** – „sukces”; wartość `wynik` trafia do callbacku w **.then()**.
- **reject(błąd)** – „porażka”; wartość `błąd` trafia do callbacku w **.catch()**.
- Zawsze dopisuj **.catch()** do Promise – inaczej nieobsłużony błąd (reject) pojawi się w konsoli przeglądarki.

## Oczekiwany efekt
Klik → po ~1 s w polu wyniku pojawia się albo komunikat sukcesu (z then), albo błędu (z catch). Przy kolejnych kliknięciach wynik może się zmieniać (losowo).
