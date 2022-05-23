// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
// in cui ogni cella contiene un numero tra quelli compresi in un range:

// con difficoltà 1 => tra 1 e 100
const livelloFacile = document.getElementById("primoLivello");
livelloFacile.addEventListener("click",() => creagriglia(100, "size-uno"));

// con difficoltà 2 => tra 1 e 81
const livelloIntermedio = document.getElementById("secondoLivello");
livelloIntermedio.addEventListener("click",() => creagriglia(size, "size-due"));

// con difficoltà 3 => tra 1 e 49
const livelloDifficile = document.getElementById("terzoLivello");
livelloDifficile.addEventListener("click",() => creagriglia(size, "size-tre", ));


function creagriglia(size, position, randomNumber){

    // const grigliaEl = Math.floor(Math.random() * randomNumber) + 1;
    const grigliaEl = document.getElementById("griglia");
    grigliaEl.innerHTML = ''; 
    grigliaEl.className = position ;
    for (let i = 0; i < size; i++){
        const livelloFacile = createmyElement("div", classAggiuta);
            let arrmyItem = myNewRandom[i];
            crea.append(arrmyItem);
            crea.addEventListener("click",
                () => {
                        if (divElBomb.includes(arrmyItem)) {
                            crea.classList.add(".bomb");
                            document.querySelector("h3").innerHTML = "Hai totalizzato " + punti + " punti";
                            image.className = ".bomb";

                        } else {
                            crea.classList.add("Click");
                            punti+=10;

                        }

                }
            )

    const divEl = document.createElement("div");
    const divElBomb = document.createElement("div");

    divEl.className = "square";
    
    divEl.addEventListener("click", () => divEl.style.backgroundColor = "rgb(126, 194, 231)");
    divElBomb.addEventListener("click", () => divEl.style.backgroundColor = "rgb(179, 49, 113)");

    grigliaEl.append(divEl);
    
    }
    
}

