/* 🔹 SELEZIONE ELEMENTI DOM */
const titoloCarta = document.querySelector(".card-title");
const contenutoCarta = document.querySelector(".card-text");
const bottoneInvia = document.querySelector(".btn");
const timerElemento = document.querySelector(".timer");
const resalDiv = document.querySelector(".resalt");

/*  VARIABILI GLOBALI */
let numeriCasuali = [];
let numeriUtente = [];
let validetor = true;
/* FUNZIONE PRINCIPALE: genera numeri, li mostra, avvia timer e timeout */
function avviaGioco() {
  numeriCasuali = generaNumeriCasuali();

  // Mostro i numeri nella card
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

/*  TIMER: aggiorna il numero ogni secondo da 30 a 0 */
function avviaTimer() {
  let tempoRimanente = 30;

  const intervallo = setInterval(() => {
    if (tempoRimanente > 0) {
      tempoRimanente--;
      timerElemento.innerHTML = tempoRimanente;
    } else {
      clearInterval(intervallo);
    }
  }, 1000);
}

/*  DOPO 30 SECONDI: nasconde i numeri e mostra gli input */
function mostraInputDopoTimeout() {
  setTimeout(() => {
    contenutoCarta.innerHTML = "";
    titoloCarta.innerHTML = `
      <h3>Inserisci i numeri che ricordi (non è importante l'ordine)</h3>
    `;

    contenutoCarta.innerHTML = `
      <div class="m-3"><input type="number" class="form-control" id="num1"></div>
      <div class="m-3"><input type="number" class="form-control" id="num2"></div>
      <div class="m-3"><input type="number" class="form-control" id="num3"></div>
      <div class="m-3"><input type="number" class="form-control" id="num4"></div>
      <div class="m-3"><input type="number" class="form-control" id="num5"></div>
    `;
  }, 30000);
}

/*  GENERATORE DI 5 NUMERI CASUALI UNICI */
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

/* al click confronto i numeri inseriti con quelli generati */

bottoneInvia.addEventListener("click", () => {
  numeriUtente = [];
  if (validetor) {
    const inputNum = document.querySelectorAll(".form-control");
    for (let i = 0; i < inputNum.length; i++) {
      const numInputUtente = parseInt(inputNum[i].value.trim());
      if (isNaN(numInputUtente)) {
        alert(`Inserisci un numero valido`);
        return;
      }
      numeriUtente.push(numInputUtente);
    }
    calcolo();
    validetor = !validetor;
  }
});

function calcolo() {
  let contatore = 0;
  let numeriCorrispondenti = [];
  for (let i = 0; i < numeriCasuali.length; i++) {
    const numeroCasuale = numeriCasuali[i];
    for (let j = 0; j < numeriUtente.length; j++) {
      if (numeroCasuale === numeriUtente[j]) {
        contatore++;
        numeriCorrispondenti.push(numeriUtente[j]);
      }
    }
  }
  resalDiv.innerHTML = `hai indovinato ${contatore}!  (${numeriCorrispondenti.join(
    " , "
  )})`;
}
