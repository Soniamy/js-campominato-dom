/*
1.L'utente clicca su un bottone.
2.Il bottone genera la griglia.
3.Ogni cella ha un numero progressivo, da 1 a 100.
4. Ci saranno quindi 10 caselle per ognuna delle 10 righe.
5.Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

const $gridContainer = document.querySelector('.grid-container');
const $playBtn = document.querySelector('#play');
const $level = document.querySelector('.form-select');
let bombs = [];
let score = 0;
//ALLA PRESSIONE DEL BOTTONE SI AVVIA LA CREAZIONE DELLA GRIGLIA
$playBtn.addEventListener('click', play);

//CREAZIONE CON LA FUNZIONE DELLA GRIGLIA

function createGrid(numerocell, cellClass) {
    for (let i = 1; i <= numerocell; i++) {
        const $cell = document.createElement('div');
        $cell.classList.add('cell', cellClass);
        $cell.innerHTML = i;
        //CREAZIONE DELLA FUNZIONE AL CLICK SPUNTANO LE BOMBE
        $cell.addEventListener('click', function () {
            let j = 0;
            while (i !== bombs[j] && j <= bombs.length) {
                j++;
            }
            if (i === bombs[j]) {
                this.classList.add('bombs');
                alert('HAI PERSO!' + score + 'PUNTI');
            } else {
                if (!$cell.classList.contains('active')) {
                    score = score + 1;
                }
                this.classList.add('active');
                if (score === numerocell - bombs.length)
                    alert('HAI VINtO' + score + 'PUNTI');
            }
            console.log(score);
        });

        $gridContainer.append($cell);
    }
}
//CREAZIONE DEL RESET DEL GIOCO
function resetGrid() {
    $gridContainer.innerHTML = '';
}

function play() {
    //CREAZIONE DELLA GRIGLIA IN BASE ALL'INTERAZIONE DELL'UTENTE
    resetGrid();

    if ($level.value == 0) {
        createGrid(100, 'cell100');
        bombs = uniqueRandom(16, 100);
    } else if ($level.value == 1) {
        createGrid(81, 'cell81');
        bombs = uniqueRandom(16, 81);
    } else if ($level.value == 2) {
        createGrid(49, 'cell49');
        bombs = uniqueRandom(16, 49);
    }
    console.log(bombs);
}
function random(max) {
    return Math.floor(Math.random() * max) + 1;
}

//GENERO N NUMERI CASUALI E UNIVOCI
function uniqueRandom(xnumber, max) {
    let numbers = [];

    while (numbers.length < xnumber) {
        let rnd = random(max);
        let i = 0;
        while (rnd !== numbers[i] && i <= numbers.length) {
            i++;
        }

        if (rnd !== numbers[i]) {
            numbers.push(rnd);
        }
    }
    return numbers;
}
