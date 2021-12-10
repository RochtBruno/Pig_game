'use strict';
//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//score
const totalScore = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  currScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating ramdom num between 1 and 6
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    //add the number to player score, if it's 1, switch to the other player
    if (diceNum != 1) {
      currScore += diceNum;
      //tracking which player is active dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('hold');
    //add currScore to player's score
    totalScore[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    //if player's score is = 100, finish the game
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //if not switch player
      switchPlayer();
    }
  }
});

//reseting the game
btnNew.addEventListener('click', function () {
  document.location.reload(true);
});
