'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores,currentScore,activeplayer,playing

//Starting conditions

const init = function() {
    scores = [0 , 0];
    currentScore = 0;
    activeplayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent =0;
    current1El.textContent =0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    
};
init(); //initilization of starting variables

const switchplayer = function() {
        document.getElementById(`current--${activeplayer}`).textContent = 0;
        currentScore =0;
        activeplayer = activeplayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}


//Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
        //1.Generating a random dice roll
        const dice = Math.trunc(Math.random()*6) + 1;
        
        //2.display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3.check for rolled 1
        if(dice !== 1){
            //add dice to current player
            currentScore += dice; 
            document.getElementById(`current--${activeplayer}`).textContent = currentScore
        }else{
            // if 1, switch to next player
            switchplayer();
        }
    }
})

btnHold.addEventListener('click',function() {
    if(playing){
        //1. Add current score to the active player's score
        scores[activeplayer] += currentScore;
        // score[1] = score[1] + currentScore
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];


        //2. Check if player's score is >= 100
        
        if(scores[activeplayer] >= 50){
            //finish the game
            playing = false;
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }else{
            //Switch to next player
            switchplayer();
        }

    }  

})

btnNew.addEventListener('click',init);


//show info modal


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal'); 
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

for(let i =0; i <btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener('click',openModal);
}

btnCloseModal.addEventListener('click',closeModal)
overlay.addEventListener('click',closeModal)

document.addEventListener('keydown',function(e) {
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
})