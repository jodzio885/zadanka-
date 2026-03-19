# Zadanie 3: Minutnik bomby (setInterval i clearInterval wewnątrz callbacku)

## Cel
Odliczanie **od 5 do 0** co sekundę. Na ekranie widać kolejno: 5, 4, 3, 2, 1, 0. Gdy licznik dojdzie do **0**, zatrzymaj interwał (**clearInterval**) i wyświetl w divie komunikat typu **„BOMBA! BUM!”** (bez dalszego odliczania). Chodzi o to, żeby **wewnątrz** callbacku `setInterval` sprawdzić warunek i w razie zera wywołać `clearInterval` oraz zaktualizować treść.

## Co masz w HTML
- Przycisk `#btnAction` – po kliknięciu wywoływane jest zdarzenie `uruchomTest`.
- Element `#wynikUI` – wyświetl tu liczbę (5, 4, 3, 2, 1, 0), a na końcu tekst „BOMBA! BUM!”.

## Kroki do zrobienia w `script.js`

1. **Na początku pliku** (poza listenerem) zadeklaruj:
   - `let licznik = 5;` – aktualna wartość odliczania.
   - `let idIntervalu = null;` – identyfikator interwału. Musi być **na zewnątrz**, żeby funkcja wywoływana co sekundę wewnątrz `setInterval` mogła w nim wywołać `clearInterval(idIntervalu)` i zatrzymać odliczanie.

2. **Nasłuchuj zdarzenia `uruchomTest`** (przycisk „Start odliczanie”). W callbacku na początku pobierz element: `const wynikUI = document.getElementById('wynikUI');`  
   Potem:
   - Ustaw `licznik = 5` i wyświetl w `wynikUI` np. „5”.
   - Uruchom **setInterval** z interwałem 1000 ms. W funkcji wywoływanej co sekundę:
     - Zmniejsz licznik: `licznik--` (albo `licznik = licznik - 1`).
     - Jeśli `licznik >= 0`, ustaw w `wynikUI` aktualną wartość `licznik`.
     - Jeśli `licznik === 0`: wywołaj **clearInterval(idIntervalu)**, ustaw `idIntervalu = null`, wstaw w `wynikUI` tekst „BOMBA! BUM!”. Dzięki temu interwał przestanie się wywoływać i odliczanie się skończy.
   - Identyfikator interwału zapisz w `idIntervalu` zaraz po wywołaniu `setInterval(...)`.

3. **Uwaga:** Identyfikator zapisuj od razu:  
   `idIntervalu = setInterval(() => { ... }, 1000);`  
   W środku strzałkowej funkcji (callbacku) masz dostęp do `idIntervalu` i możesz wywołać `clearInterval(idIntervalu)` gdy `licznik === 0`.

## Przydatny fragment z teorii
- **setInterval(funkcja, 1000)** – wywołuje `funkcja` co 1 s; zwraca id.
- **clearInterval(id)** – zatrzymuje interwał. Wywołaj go **w środku** callbacku, gdy `licznik` osiągnie 0.

## Oczekiwany efekt
Klik przycisku „Start odliczanie” → na ekranie widać 5, po sekundzie 4, potem 3, 2, 1, 0, a na końcu „BOMBA! BUM!”. Odliczanie się kończy (interwał jest zatrzymany). Kolejne kliknięcie znów startuje od 5.
