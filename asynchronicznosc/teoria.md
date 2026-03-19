# Asynchroniczność w JavaScript (timery, Promise, async/await)

## 1. Po co asynchroniczność?

JavaScript wykonuje kod **po kolei**, linijka po linijce. Gdyby jakaś operacja (np. pobieranie danych z serwera) **zatrzymała** wykonanie na kilka sekund, cała strona by się **zawiesiła** – przyciski, animacje, przewijanie przestałyby działać.

Dlatego operacje, które trwają dłużej (czekanie, pobieranie z sieci), wykonuje się **asynchronicznie**: uruchamiamy je, a wynik obsługujemy **później**, w **callbacku** (funkcji wywołanej po zakończeniu). Dzięki temu strona cały czas reaguje.

---

## 2. Timery: `setTimeout` i `setInterval`

### `setTimeout(funkcja, milisekundy)` – wykonaj **raz** po opóźnieniu

- **funkcja** – callback, który ma się wykonać po upływie czasu  
- **milisekundy** – opóźnienie (1000 ms = 1 sekunda)

Przykład: po 2 sekundach ukryj loader i pokaż wynik.

```javascript
setTimeout(() => {
    console.log("Minęły 2 sekundy!");
}, 2000);
```

Kolejność w konsoli:
1. Od razu wykonuje się kod **po** `setTimeout`.
2. Po 2 s wykonuje się funkcja w środku `setTimeout`.

### `setInterval(funkcja, milisekundy)` – wykonuj **co X ms** w kółko

Używane do **stoperów**, **odliczania**, slajderów. Zwraca **identyfikator**, którym można **zatrzymać** interwał (żeby nie zużywać pamięci w nieskończoność).

```javascript
let sekundy = 0;
const id = setInterval(() => {
    sekundy++;
    console.log("Sekunda: " + sekundy);
    if (sekundy >= 5) {
        clearInterval(id);  // zatrzymaj interwał
    }
}, 1000);
```

- **`clearInterval(id)`** – zatrzymuje interwał o danym `id`.
- **`clearTimeout(id)`** – zatrzymuje jednorazowy timer (jeśli jeszcze się nie wykonał).

---

## 3. Promise (Obietnice) i `.then()` / `.catch()`

**Promise** to obiekt reprezentujący operację, która **zakończy się w przyszłości** albo **sukcesem** (`resolve`), albo **błędem** (`reject`).

### Tworzenie Promise

```javascript
const mojaObietnica = new Promise((resolve, reject) => {
    setTimeout(() => {
        const sukces = true;  // symulacja: czy się udało
        if (sukces) {
            resolve("Dane odebrane!");
        } else {
            reject("Coś poszło nie tak");
        }
    }, 2000);
});
```

- **resolve(dane)** – „zakończyło się sukcesem”, wynik przekazujesz dalej.
- **reject(błąd)** – „wystąpił błąd”.

### Odbieranie wyniku: `.then()` i `.catch()`

```javascript
mojaObietnica
    .then((dane) => console.log("OK:", dane))   // gdy resolve
    .catch((err) => console.error("Błąd:", err)); // gdy reject
```

- `.then(callback)` – dostaje wynik z `resolve(...)`.
- `.catch(callback)` – dostaje wartość z `reject(...)`.

---

## 4. async / await – wygodniejsza składnia

Zamiast łańcucha `.then().then()` możesz w **funkcji async** użyć **await**: kod wygląda jak „zwykły”, ale **czeka** na zakończenie Promise.

- Funkcja musi być oznaczona słowem **`async`**.
- W środku możesz pisać **`await obietnica`** – wykonanie zatrzyma się, aż obietnica się rozstrzygnie.
- Błędy z `reject` łapiesz zwykłym **`try { ... } catch (err) { ... }`**.

```javascript
async function wczytajDane() {
    try {
        console.log("Czekam...");
        const wynik = await mojaObietnica;  // czeka na resolve
        console.log("Mam:", wynik);
    } catch (err) {
        console.error("Błąd:", err);  // tu trafia reject
    }
}
wczytajDane();
```

---

## 5. Pobieranie danych z sieci: `fetch()` i JSON

Aby pobrać dane z **zewnętrznego API** (np. pogoda, kursy walut), w przeglądarce używa się funkcji **`fetch(url)`**.

### Jak to działa

- **`fetch(url)`** – wysyła żądanie HTTP (np. GET) pod podany adres i **zwraca Promise**. Ta Promise rozstrzyga się, gdy serwer odpowie (nie czeka na „odczyt treści” – tylko na odpowiedź).
- Odpowiedź ma metodę **`.json()`** – ona też zwraca Promise i „rozpakowuje” treść odpowiedzi jako obiekt JavaScript (JSON → obiekt). Dlatego często pisze się: **`await response.json()`**.
- **Uwaga:** `fetch` działa w przeglądarce (nie w Node.js bez dodatkowych bibliotek). Do testów możesz otworzyć stronę przez serwer lub bezpośrednio plik HTML (jeśli API pozwala na tzw. CORS z Twojej domeny – wiele publicznych API na to pozwala).

### Przykład: pobranie pogody (async/await)

```javascript
async function pobierzPogode() {
    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.29&longitude=18.67&current=temperature_2m,cloud_cover,wind_speed_10m';
        const response = await fetch(url);           // czekaj na odpowiedź serwera
        const dane = await response.json();         // odczytaj JSON jako obiekt

        console.log(dane.current.temperature_2m);    // np. 11.4 (temperatura w °C)
        console.log(dane.current.cloud_cover);       // zachmurzenie w %
        console.log(dane.current.wind_speed_10m);   // wiatr w km/h
    } catch (err) {
        console.error('Błąd pobierania:', err);    // np. brak internetu
    }
}
pobierzPogode();
```

### Krótko o JSON

- **JSON** (JavaScript Object Notation) to tekstowy format danych. Serwer zwraca np. `{"temperature_2m": 11.4, "cloud_cover": 0}`.
- **`response.json()`** zamienia ten tekst na obiekt JavaScript, więc możesz pisać np. `dane.current.temperature_2m`.
- Jeśli serwer zwróci błąd (np. 404), `fetch` i tak „sukcesem” rozstrzygnie Promise (odpowiedź przyszła). Sprawdzenie `response.ok` lub `response.status` pozwala wykryć błąd HTTP (w zaawansowanych zadaniach).

### Typowy schemat w zadaniach

1. Przycisk wywołuje funkcję `async`.
2. W `try`: `fetch(url)` → `await response.json()` → odczyt pól z obiektu → wstawienie ich do elementów DOM (np. `element.textContent = dane.current.temperature_2m + ' °C'`).
3. W `catch`: komunikat dla użytkownika (np. „Błąd połączenia”) i ewentualnie `console.error(err)`.

---

## Podsumowanie

| Narzędzie        | Zastosowanie                          |
|------------------|----------------------------------------|
| `setTimeout`     | Jednorazowe opóźnienie (np. loader)   |
| `setInterval`    | Powtarzanie co X ms (stoper, odliczanie) |
| `clearInterval`  | Zatrzymanie interwału                  |
| Promise + then/catch | Operacje „w tle” z sukcesem/błędem |
| async / await    | Czytelne czekanie na Promise w kodzie  |
| **fetch(url)**   | Pobieranie danych z API (zwraca Promise); wynik odczytujesz przez **response.json()** |
