# Zadanie 4: Własna Promise (symulacja API)

## Cel
Stworzyć **własną Promise**, która po opóźnieniu (np. 2 sekundy) **zwraca** jakąś wartość przez **resolve**. Następnie użyć **.then()**, żeby odebrać tę wartość i wyświetlić ją na stronie (w `wynikUI`). Symulujesz „odpowiedź z serwera” bez prawdziwego fetcha.

## Co masz w HTML
- Przycisk `#btnAction` – po kliknięciu wywoływane jest zdarzenie `uruchomTest`.
- Element `#wynikUI` – wyświetl tu wynik z Promise (tekst z `resolve`).
- Element `#loadingAnim` (loader) – możesz go pokazać na start i ukryć w callbacku `.then()`.

## Kroki do zrobienia w `script.js`

1. **W nasłuchiwaczu zdarzenia `uruchomTest`** (na początku callbacku):
   - Pobierz elementy: `document.getElementById('wynikUI')`, `document.getElementById('loadingAnim')`.
   - Pokaż loader i ustaw w `wynikUI` tekst „Ładowanie…”.

2. **Stwórz Promise wewnątrz tego samego callbacku** – dzięki temu przy każdym kliknięciu powstaje nowa obietnica i za każdym razem od nowa odliczane są 2 sekundy:
   ```js
   const mojaObietnica = new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve("Poczta przyszła! Oto Twoje dane.");
       }, 2000);
   });
   ```
   - W środku **setTimeout** (po 2000 ms) wywołaj **resolve**(jakiś tekst).
   - **reject** na tym etapie nie jest potrzebny.

3. **Odbierz wynik przez .then()**:
   - `mojaObietnica.then((dane) => { ... })`. W środku callbacku: ukryj loader (`loadingAnim.style.display = 'none'`), ustaw **wynikUI.textContent = dane**.
   - **Kolejność:** Najpierw użytkownik widzi „Ładowanie…”, a dopiero po ok. 2 s wykona się funkcja z `.then()` i w polu wyniku pojawi się tekst z `resolve`.

## Przydatny fragment z teorii
- **new Promise((resolve, reject) => { ... })** – tworzy obietnicę. Wewnątrz wywołujesz **resolve(wynik)** gdy operacja się udała – wtedy `wynik` trafi do `.then()`.
- **obietnica.then(callback)** – callback dostaje wartość przekazaną do `resolve`. Wywoła się **dopiero po** zakończeniu Promise (tu: po 2 s). Kod pod `.then()` wykona się od razu i nie czeka na wynik.

## Oczekiwany efekt
Klik → „Ładowanie…” (i ewentualnie loader). Po 2 sekundach w polu wyniku pojawia się tekst przekazany do `resolve` (np. „Poczta przyszła! Oto Twoje dane.”).
