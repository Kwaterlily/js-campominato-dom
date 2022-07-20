// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata

//Pulsante Play e conteggio partita
const play = document.getElementById("play");
play.addEventListener("click", start);
let playCounter = 0;

//Variabile griglia, 
const griglia = document.getElementById("griglia");
let grigliaDim = 0;
let bombsArray = [];

//Punti 
let points;
let minPointsToWin;

//Start
function start() {
    //Variabili griglia e difficulty selector
    const difficultySelector = document.getElementById("difficulty-selector");
    const difficulty = difficultySelector.value;

    //Aggiunge classe "started" alla griglia se è la prima partita
    if (playCounter == 0) {
        griglia.classList.add("started");
    }

    //Rimuove messaggio in basso di fine partita se presente
    const gameEndElement = document.getElementById("game-end");
    gameEndElement.classList.remove("show");
    gameEndElement.classList.add("hidden");

    //Azzera i punti
    points = 0;

    //Funzioni da eseguire
    difficultyManager(difficulty);

    //Toglie il blocco alla griglia, se presente
    griglia.classList.remove("inactive");
    playCounter++;
}

//Gestore delle difficoltà
function difficultyManager(difficulty) {
    if (difficulty == 1) { //Facile
        grigliaDim = 100;
        minPointsToWin = 84;
        grigliaGenerator("Facile");
    } else if (difficulty == 2) { //Intermedio
        grigliaDim = 81;
        minPointsToWin = 65;
        grigliaGenerator("Intermedio");
    } else { //Difficile
        grigliaDim = 49;
        minPointsToWin = 33;
        grigliaGenerator("Difficile");
    }
}

//Genera la griglia con ciascun elemento
function grigliaGenerator(difficultyName) {
    //Svuota la griglia
    griglia.innerHTML = "";

    //Genera array di bombe
    bombsArray = bombGenerator();

    for (let i = 1; i <= grigliaDim; i++) {
        //Genera grigliaSquare
        let grigliaSquare = grigliaSquareGenerator(difficultyName, i);

        //Aggiunge eventListener al click in basa a se è una bomba o no
        if (isBomb(i)) {
            grigliaSquare.addEventListener("click", addBombClass);
        } else {
            grigliaSquare.addEventListener("click", addActiveClass);
        }

        //Aggiunge grigliaSquare alla griglia
        griglia.append(grigliaSquare);
    }
}

//Generatore di array di bombe
function bombGenerator() {
    let bombs = [];
    do {
        let newBomb = randomNumberGen(1, grigliaDim);
        if (!isBomb(newBomb)) {
            bombs.push(newBomb);
        }
    } while (bombs.length < 16)

    return bombs;
}

//Generatore di numeri random
function randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Controlla se un elemento è una bomba o no
function isBomb(value) {
    for (let i = 0; i < bombsArray.length; i++) {
        if (bombsArray[i] == value) {
            return true;
        }
    }
    return false;
}

//Generatore di grigliaSquare
function grigliaSquareGenerator(difficultyName, i) {
    //Crea grigliaSquare
    let grigliaSquare = document.createElement("div");
    grigliaSquare.classList.add("griglia-square-" + i);
    grigliaSquare.classList.add(difficultyName);

    //Inserisce numero dentro grigliaSquare
    let grigliaSquareNumber = document.createElement("div");
    grigliaSquareNumber.classList.add("griglia-number");
    grigliaSquareNumber.innerHTML = i;
    grigliaSquare.append(grigliaSquareNumber);

    return grigliaSquare;
}

//Aggiunge la classe "active" ad un elemento
function addActiveClass() {
    this.classList.add("active");
    points++;

    if (points == minPointsToWin) {
        endGame("win");
    }
    console.log(points);

    //Rimuove l'EventListener per impedire punti infiniti
    this.removeEventListener("click", addActiveClass);
}

//Per ggiumgere la classe "bomb" ad un elemento
function addBombClass() {
    this.classList.add("bomb");
    endGame("lose");

    //Rimuove l'EventListener
    this.removeEventListener("click", addBombClass);
}

function endGame(outcome) {
    //Impedisce di cliccare altro sulla griglia
    griglia.classList.add("inactive");

    //Mostra il div #game-end
    const gameEndElement = document.getElementById("game-end");
    gameEndElement.classList.remove("hidden");
    gameEndElement.classList.add("show");

    //Stampa il numero della partita
    document.getElementById("n-match").innerHTML = "Partita " + playCounter + ": ";

    //Gestisce l'outcome
    let outcomeContainer = document.getElementById("game-outcome");
    outcomeManager(outcomeContainer, outcome);

    //Stampa il totale dei punti
    document.getElementById("punti-totalizzati").innerHTML = "totalizzando: " + points + " punti.";

    //Rivela le bombe
    bombsReveal()
}

//Generatore dell'Outcome
function outcomeManager(outcomeContainer, outcome) {
    if (outcome == "win") {
        outcomeContainer.innerHTML = "Complimenti, ha vinto";
    } else {
        outcomeContainer.innerHTML = "Peccato, hai perso";
    }
}

//Rivelatore di bombe, controlla se ciascun grigliaSquare è una bomba e nel caso lo sia e non sia stata cliccata gli da la classe "unexplodedb"
function bombsReveal() {
    for (let i = 1; i <= grigliaDim; i++) {
        let tempgrigliaSquare = document.querySelector(".griglia-square-" + i);

        if (isBomb(i)) {
            if (tempgrigliaSquare.classList.contains("bomb")) {
                continue;
            }

            tempgrigliaSquare.classList.add("unexplodedb");
        }
    }
}