/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

//Definisco il link delle immagini come una costante
const IMG_UCHK = "images/unchecked.png";
const IMG_CHK = 'images/checked.png';

//Definisco la funzione che gestisce la selezione di una risposta
function cellSelect(event) {
    //Se prima era stata selezionata un'altra risposta, la deseleziono e la elimino dalle risposte
    const c = event.currentTarget;
    const id = c.dataset.questionId;
    const scelta = c.dataset.choiceId;
    const c0 = document.querySelector('[data-question-id="' + c.dataset.questionId + '"].checked');
        if (c0 !== null) {
            c0.classList.remove("checked");
            c0.classList.add("unchecked");
            const box0 = c0.querySelector('.checkbox');
            box0.src = IMG_UCHK;
            c.classList.remove("unchecked");
            delete risposte[id];
        }
    //Selezionando una risposta, cambia l'immagine del box da unchecked a checked
    const box = c.querySelector('.checkbox');
    box.src = IMG_CHK;
    //Deve cambiare il colore di sfondo
    c.classList.add("checked");
    c.classList.remove("normal");
    //deve essere impostato un'overlay sulle altre immagini
    const celleUnselected = document.querySelectorAll ('[data-question-id="' + c.dataset.questionId + '"].normal');
    for (const cellaUnselected of celleUnselected) {
        cellaUnselected.classList.add("unchecked");
    }
    //E la scelta deve essere aggiunta alla mappa delle risposte
    risposte[id] = scelta;
    //Adesso controllo se siano state selezionate tutte e tre le risposte
    const ris = checkRisposte();
    if (ris !== null) {
        //Caso affermativo: il quiz è finito
        isOver(ris);
    }
}

//Definisco la funzione che controlla se sono state scelte tre risposte.
//In caso affermativo, ritorna la scelta "vincente"
function checkRisposte() {
    let scelta;
    //Caso 1: 3 risposte uguali
    if (risposte.one === risposte.two && risposte.two === risposte.three) {
        scelta = risposte.one;
        return scelta;
    }
    //Caso 2: risposte 2 e 3 uguali
    if (risposte.one !== undefined && risposte.two !== undefined && risposte.two === risposte.three) {
        scelta = risposte.two;
        return scelta;
    }
    //Caso 3: risposte 1 e 3 uguali
    if (risposte.one !== undefined && risposte.two !== undefined && risposte.one === risposte.three) {
        scelta = risposte.one;
        return scelta;
    }
    //Caso 4: risposte 1 e 2 uguali
    if (risposte.one !== undefined && risposte.three !== undefined && risposte.one === risposte.two) {
        scelta = risposte.one;
        return scelta;
    }
    //Caso 5: 3 risposte diverse
    if (risposte.one !== undefined && risposte.two !== undefined && risposte.three !== undefined
        && risposte.one !== risposte.two && risposte.one !== risposte.two && risposte.two !== risposte.three) {
            scelta = risposte.one;
            return scelta;
        }
    //Caso 6: non sono ancora state date tre risposte
    scelta = null;
    return scelta;
}

//Definisco la funzione che gestisce la fine del quiz
function isOver(scelta) {
    //Devo fare in modo che le risposte non possano più essere modificate
    for (const cella of celle) {
        cella.removeEventListener('click', cellSelect);
    }
    //E devo far comparire i risultati
    const risultati = document.querySelector('#results');
    const titolo = document.querySelector('#results h3');
    titolo.textContent = RESULTS_MAP[scelta].title;
    const contenuto = document.querySelector('#results p');
    contenuto.textContent = RESULTS_MAP[scelta].contents;
    risultati.classList.add('quizOver');
    risultati.classList.add('quizStart');
    console.log(risultati);
    console.log(risposte);
}

//Definisco la funzione che permette di resettare il quiz cliccando sul pulsante
function quizReset() {
    //Svuoto la mappa delle risposte
    delete risposte.one;
    delete risposte.two;
    delete risposte.three;
    //Riporto ogni cella allo stato originale
    for (const cella of celle) {
        cella.addEventListener('click', cellSelect);
        //Se la cella è una delle precedenti risposte... 
        if (cella.classList.contains('checked')) {
            cella.classList.remove('checked');
            cella.classList.add('normal');
            const box = cella.querySelector('.checkbox');
            box.src = IMG_UCHK;
        }
        else {
            cella.classList.remove('unchecked');
            cella.classList.add('normal');
        }
    }
    //Nascondo i risultati
    const risultati = document.querySelector('#results');
    risultati.classList.remove('quizOver');
    risultati.classList.add('quizStart');
}

const risposte = {};
//Inserisco le risposte in una mappa: id = one, two, three / valore: personalità
const celle = document.querySelectorAll ('.choice-grid div');
for (const cella of celle) {
    cella.addEventListener('click', cellSelect);
    cella.classList.add("normal");
}
const reset = document.querySelector ('#bottone');
reset.addEventListener('click', quizReset);