"use strict";
// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal-2");
const btn = document.querySelector(".close-modal");
const body = document.querySelector(".body");

//starting conditions
const scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let currentScore = 0;
let activePlayer = 0;
let currentPlayer = document.getElementById(`current--${activePlayer}`);
let playing = true;
const switchPlayer = function () {
  currentPlayer.textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1generating random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //2display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    let currentPlayer = document.getElementById(`current--${activePlayer}`);
    //3check fo rolled 1; if true, switch palyer
    if (dice !== 1) {
      currentScore += dice;
      currentPlayer.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1 add current score to player
    scores[activePlayer] += currentScore;
    // scores[2] = scores[2] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score >=100
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      if (activePlayer === 0) {
        modal.classList.remove("hidden");
        document.querySelector(".body").style.backgroundImage =
          "url('game-ver.jpeg')";
      } else if (activePlayer === 1) {
        modal2.classList.remove("hidden");
        document.querySelector(".body").style.backgroundImage =
          "url('game-ver.jpeg')";
      }
      btn.addEventListener("click", function () {
        if (activePlayer === 0) {
          modal.classList.add("hidden");
          document.querySelector(".body").style.backgroundImage =
            "url('game-ver.jpeg')";
        } else if (activePlayer === 1) {
          modal2.classList.add("hidden");
        }
      });

      // activePlayer = 0
      //   ? modal.classList.remove('hidden')
      //   : modal2.classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});
