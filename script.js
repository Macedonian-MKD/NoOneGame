'use strict';

//Selecting elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceImg.classList.add('hidden');
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--winner');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

//Initiliaze the game
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// ROLLING THE DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    //3. Check for rolled 1 : if true switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player:
      switchPlayer();
    }
  }
});

// Holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is already >= 100
    if (scores[activePlayer] >= 20) {
      // if Yes then Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
    } else {
      // if No then switch the player
      switchPlayer();
    }
  }
});

// Reseting the game
btnNew.addEventListener('click', init);
