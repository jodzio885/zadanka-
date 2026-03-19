# Zadanie 7: Pogoda z API – Gliwice (fetch, async/await)

## Cel
Aplikacja ma **pobrać z internetu** aktualną pogodę dla **Gliwice** z darmowego API (Open-Meteo) i wyświetlić na stronie: **temperaturę** (°C), **zachmurzenie** (%), **prędkość wiatru** (km/h). Wykorzystujesz **fetch()** i **async/await** oraz obsługę błędów w **try/catch**.

## Co musisz wiedzieć z teorii
- Sekcja **„5. Pobieranie danych z sieci: fetch() i JSON”** w pliku `teoria.md` – przeczytaj ją przed startem.
- **fetch(url)** zwraca Promise; **await fetch(url)** daje obiekt odpowiedzi.
- **await response.json()** zamienia treść odpowiedzi (JSON) na obiekt JavaScript.
- Dane pogodowe są w obiekcie pod **current**: `temperature_2m`, `cloud_cover`, `wind_speed_10m`.

## Adres API (gotowy do wklejenia)
```
https://api.open-meteo.com/v1/forecast?latitude=50.2945&longitude=18.6714&current=temperature_2m,cloud_cover,wind_speed_10m
```
- To adres dla współrzędnych **Gliwice** (latitude, longitude). Nie wymaga klucza API ani rejestracji.
- Odpowiedź to JSON z obiektem **current**, w którym są pola: **temperature_2m** (liczba, °C), **cloud_cover** (liczba, %), **wind_speed_10m** (liczba, km/h).

## Co masz w HTML
- Przycisk `#btnPobierz` – po kliknięciu ma uruchomić pobieranie pogody.
- Element `#loadingAnim` (loader) – pokaż go na start, ukryj po otrzymaniu danych (lub po błędzie).
- Elementy na wyniki: `#temp`, `#zachmurzenie`, `#wiatr` – wstawisz w nie pobrane wartości (np. „12.5 °C”, „30 %”, „15 km/h”).
- Element `#komunikat` – możesz tu wyświetlać „Pobieram…” lub komunikat błędu.

## Kroki do zrobienia w `script.js`

### Krok 1: Nasłuchuj kliknięcia przycisku
- Pobierz przycisk: `document.getElementById('btnPobierz')`.
- Dodaj nasłuchiwacz zdarzenia `'click'`, w którym wywołasz funkcję pobierającą pogodę (np. `pobierzPogode()`).

### Krok 2: Stwórz funkcję async `pobierzPogode()`
- Na początku funkcji pobierz referencje do elementów: `loadingAnim`, `temp`, `zachmurzenie`, `wiatr`, `komunikat`.
- Ustaw w `komunikat` tekst np. „Pobieram pogodę…” i pokaż loader (`loadingAnim.style.display = 'block'` lub `'flex'`).

### Krok 3: W bloku try
- Zadeklaruj stałą z adresem API (np. `const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.2945&longitude=18.6714&current=temperature_2m,cloud_cover,wind_speed_10m';`).
- Wywołaj **const response = await fetch(url);** – to czeka na odpowiedź serwera.
- Wywołaj **const dane = await response.json();** – to zamienia odpowiedź na obiekt.
- Z obiektu `dane` odczytaj:
  - **dane.current.temperature_2m** – temperatura,
  - **dane.current.cloud_cover** – zachmurzenie,
  - **dane.current.wind_speed_10m** – prędkość wiatru.
- Ustaw w elementach `#temp`, `#zachmurzenie`, `#wiatr` odpowiednie teksty, np.:
  - `temp.textContent = dane.current.temperature_2m + ' °C';`
  - `zachmurzenie.textContent = dane.current.cloud_cover + ' %';`
  - `wiatr.textContent = dane.current.wind_speed_10m + ' km/h';`
- Ukryj loader: `loadingAnim.style.display = 'none';`
- W `komunikat` możesz ustawić np. „Pogoda dla Gliwic” lub zostawić pusty.

### Krok 4: W bloku catch (err)
- Ukryj loader.
- W `komunikat` (lub w jednym z pól) wyświetl informację o błędzie, np. `komunikat.textContent = 'Błąd połączenia: ' + err.message;`
- Opcjonalnie: `console.error(err);` – żeby zobaczyć szczegóły w konsoli (F12).

### Krok 5: Sprawdź działanie
- Otwórz stronę w przeglądarce (najlepiej przez serwer lub po prostu otwarcie pliku HTML – Open-Meteo zwykle pozwala na żądania z lokalnych stron).
- Kliknij „Pobierz pogodę”. Powinny pojawić się: temperatura, zachmurzenie, wiatr dla Gliwic.
- Jeśli wyłączysz internet i klikniesz ponownie, powinien pojawić się komunikat z bloku **catch**.

## Przydatne fragmenty z teorii
- **await fetch(url)** – czeka na odpowiedź serwera; wynik to obiekt **response**.
- **await response.json()** – zwraca obiekt JavaScript z danymi (Promise).
- **try { ... } catch (err) { ... }** – błędy (np. brak sieci, błąd CORS) trafią do **catch**; `err.message` to krótki opis błędu.

## Oczekiwany efekt
Po kliknięciu „Pobierz pogodę”: loader i „Pobieram pogodę…”, a po chwili w polach pojawiają się aktualne: temperatura w °C, zachmurzenie w %, wiatr w km/h dla Gliwic. W razie błędu połączenia – komunikat w `#komunikat` i brak „wiszącego” loadera.
