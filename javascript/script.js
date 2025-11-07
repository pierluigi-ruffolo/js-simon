/*SELEZIONE ELEMENTI DOM */
const titoloCarta = document.querySelector(".card-title");
const contenutoCarta = document.querySelector(".card-text");
const bottoneInvia = document.querySelector(".btn");
const timerElemento = document.querySelector(".timer");

/*  FUNZIONI  */

/* Funzione principale: genera numeri, li mostra, avvia timer e timeout */
function avviaGioco() {
  const numeriCasuali = generaNumeriCasuali();

  contenutoCarta.innerHTML = `
    <p class="fs-2 p-2 border">${numeriCasuali[0]}</p>
    <p class="fs-2 p-2 border">${numeriCasuali[1]}</p>
    <p class="fs-2 p-2 border">${numeriCasuali[2]}</p>
    <p class="fs-2 p-2 border">${numeriCasuali[3]}</p>
    <p class="fs-2 p-2 border">${numeriCasuali[4]}</p>
  `;

  avviaTimer();
  mostraInputDopoTimeout();
}

// Avvio del gioco
avviaGioco();

/* Funzione timer: aggiorna il numero ogni secondo da 30 a 0 */
function avviaTimer() {
  let tempoRimanente = 30;

  setInterval(() => {
    if (tempoRimanente >= 1) {
      tempoRimanente--;
      timerElemento.innerHTML = tempoRimanente;
    }
  }, 1000);
}

/* Funzione che dopo 30 secondi nasconde i numeri e mostra gli input */
function mostraInputDopoTimeout() {
  setTimeout(() => {
    contenutoCarta.innerHTML = "";
    titoloCarta.innerHTML = `
      <h3>Inserisci i numeri che ricordi (non è importante l'ordine)</h3>
    `;

    contenutoCarta.innerHTML = `
      <div class="m-3">
        <input type="number" class="form-control" id="num1">
      </div>
      <div class="m-3">
        <input type="number" class="form-control" id="num2">
      </div>
      <div class="m-3">
        <input type="number" class="form-control" id="num3">
      </div>
      <div class="m-3">
        <input type="number" class="form-control" id="num4">
      </div>
      <div class="m-3">
        <input type="number" class="form-control" id="num5">
      </div>
    `;
  }, 30000);
}

/* Funzione che genera 5 numeri casuali unici */
function generaNumeriCasuali() {
  const numeri = [];

  for (let i = 1; i <= 5; i++) {
    const numeroCasuale = Math.floor(Math.random() * 100) + 10;

    if (numeri.includes(numeroCasuale)) {
      i--;
    } else {
      numeri.push(numeroCasuale);
    }
  }

  return numeri;
}
