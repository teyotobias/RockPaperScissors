//features to add
    //maybe a limit to #of wins that leads to 
    //ultimate winner? -> would be a constant if
    //don't want to make it adjustable


/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_LOOKUP = {
    r: {img: 'imgs/RPSGameRock.png', beats:'s'},
    p: {img: 'imgs/RPSGamePaper.png', beats:'r'},
    s: {img: 'imgs/RPSGameScissors.png', beats: 'p'}, 
    
};

//rps
/*----- app's state (variables) -----*/
// data that has to be remembered as application is running
//object or array for wins/losses/ties
//use object -> easier for retrieval

//structure:
// let scores = {
//     p: 0,
//     t: 0,
//     c: 0
// }
// results = {
//     p: 'p',
//     c: 's'
// }
let scores;
let results;
let winner;
//after declaring these, next step is to initialize

// winner = 'p', 'c', 't';



/*----- cached element references -----*/
//skip caching scores

// to render border:
 const pResultEl = document.getElementById('p-result');
 const cResultEl = document.getElementById('c-result');
 const countDownEl = document.getElementById("countdown");

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);


/*----- functions -----*/
init();
// In response to user interaction (player makes a move)
//we update all impacted state, then call render
function handleChoice(evt) {
    //Guards: do nothing unless one of three buttons was pressed
    //targeted whole main, so have to make sure of this
    if(evt.target.tagName !== 'BUTTON') return;
    console.log(evt.target.tagName);
    //player has made a choice
    results.p = evt.target.innerText.toLowerCase();
    //write a function to get a random choice for computer
    results.c = getRandomRPS();
    winner = getWinner();
    scores[winner]++;





    render();
}

function getWinner() {
    if(results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c';

}

function getRandomRPS() {
    //const rps = ['p', 'r', 's'];
    const rps = Object.keys(RPS_LOOKUP);
    const randIdx = Math.floor(Math.random() * rps.length);
    return rps[randIdx];
}

//initalize all state then call render
function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0,
    };
    results = {
        p: 'r',
        c: 'r'
    };
    winner = 't';
    render();
}

function renderScores(){
    for(let key in scores) {
        const scoreEl = document.getElementById(`${key}-score`);
        scoreEl.innerText = scores[key];
        //build ID
    }
}

function renderResults(){
//           another way of doing it
     pResultEl.src = RPS_LOOKUP[results.p].img;
     cResultEl.src = RPS_LOOKUP[results.c].img;
     pResultEl.style.borderColor = winner == 'p' ? 'grey' : 'white';
     cResultEl.style.borderColor = winner == 'c' ? 'grey' : 'white';
    // for(let key in results) {
    //     const resultEl = document.getElementById(`${key}-result`);
    //     resultEl.src = RPS_LOOKUP[results[key]].img;
    //     if(results[key] == 'p'){
    //         resultEl.style.borderColor = winner === 'p' ? 'grey':'white';
    //     }
    // }

}

//renderCountDown done last
// should Transfer/visualize all state to the dom
function render() {
    // going to have to accept a callback function
    renderCountDown(function(){
        renderScores();
        renderResults();
    }); 
    
   // renderScores();
   // renderResults();
}

function renderCountDown(cb) {
    let count = 3;
    AUDIO.currentTime = 0;
    AUDIO.play();
    countDownEl.style.visibility = 'visible';
    countDownEl.innerText = count;
    const timerId = setInterval(function() {
        count--;
        if(count) {
            countDownEl.innerText = count;
        } else {
            clearInterval(timerId);
            countDownEl.style.visibility = 'hidden';
            cb();
        }

    }, 1000);
}

