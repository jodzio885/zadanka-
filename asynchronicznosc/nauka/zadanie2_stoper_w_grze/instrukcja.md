# Zadanie 2: Stoper w grze (setInterval i clearInterval)

## Cel
Zbuduj prosty **stoper**: przycisk **Start** uruchamia odliczanie sekund (0, 1, 2, 3…), wyświetlane na stronie. Przycisk **Stop** zatrzymuje stoper. Po zatrzymaniu licznik nie może „uciekać” w tle – interwał musi być zatrzymany przez **clearInterval**.

## Co masz w HTML
- Przycisk `#btnStart` – Start (uruchamia stoper).
- Przycisk `#btnStop` – Stop (zatrzymuje stoper).
- Element `#wynikUI` – wyświetl tu liczbę sekund (np. „0 s”, „1 s”, „2 s”…).
- Zdarzenie `uruchomTest` nie jest używane w tym zadaniu – obsługujesz kliknięcia przycisków.

## Kroki do zrobienia w `script.js`

1. **Na początku pliku** zadeklaruj zmienne i pobierz elementy:
   - `let sekundy = 0;` – aktualna liczba sekund.
   - `let idIntervalu = null;` – przechowuje identyfikator zwrócony przez `setInterval`; potrzebny przyciskowi Stop do zatrzymania odliczania.
   - Pobierz elementy: `document.getElementById('wynikUI')`, `document.getElementById('btnStart')`, `document.getElementById('btnStop')` i zapisz je w zmiennych (np. `wynikUI`, `btnStart`, `btnStop`).

2. **Przycisk Start** – nasłuchuj zdarzenia `click` na `#btnStart`:
   - Jeśli stoper już działa (`idIntervalu !== null`), najpierw zatrzymaj go: `clearInterval(idIntervalu)` i `idIntervalu = null`, żeby nie mieć dwóch interwałów naraz. Potem zacznij od nowa.
   - Ustaw `sekundy = 0` i od razu zaktualizuj `wynikUI` na „0 s”.
   - Uruchom **setInterval**: co 1000 ms zwiększ `sekundy++` i ustaw w `wynikUI` tekst np. `sekundy + ' s'`.
   - Zapis zwrócony przez `setInterval` wstaw do `idIntervalu`:  
     `idIntervalu = setInterval(() => { ... }, 1000);`

3. **Przycisk Stop** – nasłuchuj `click` na `#btnStop`:
   - Wywołaj **clearInterval(idIntervalu)**.
   - Ustaw `idIntervalu = null`, żeby Start mógł ponownie uruchomić stoper.

## Przydatny fragment z teorii
- **setInterval(funkcja, 1000)** – wywołuje `funkcja` co 1 sekundę (1000 ms). **Zwraca identyfikator** – zapisz go w zmiennej (np. `idIntervalu`).
- **clearInterval(id)** – zatrzymuje interwał o podanym id. Bez tego stoper będzie działał w nieskończoność i zużywał pamięć.
- **Dlaczego zmienne są na górze?** `idIntervalu` i `sekundy` muszą być zadeklarowane **poza** listenerami (na górze pliku), żeby zarówno callback Starta, jak i callback Stopa mogły z nich korzystać.

## Oczekiwany efekt
Start – licznik rośnie co sekundę. Stop – licznik się zatrzymuje. Ponowne Start – można znowu uruchomić (od zera lub od aktualnej wartości, zgodnie z Twoją implementacją).
