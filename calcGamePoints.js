
var buttonRock = document.querySelector("#rock");
var buttonPaper = document.querySelector("#paper");
var buttonScissors = document.querySelector("#scissors");
var buttonsRPS = [buttonRock, buttonPaper, buttonScissors];

var buttonOpponent = document.querySelector("#opponentMove");
var winnerText = document.querySelector("#winnerText");

const RPS_MOVE = { ROCK: 0, PAPER: 1, SCISSORS: 2, length: 3 };
var arrayRPSName = [3];
arrayRPSName[RPS_MOVE.ROCK] = "Rock";
arrayRPSName[RPS_MOVE.PAPER] = "Paper";
arrayRPSName[RPS_MOVE.SCISSORS] = "Scissors";

var current_move_opponent = -1;

class RPS_MOVE_TUPLE {
    move_p1;
    move_p2;
    utilityValue;

    constructor(move_p1, move_p2, utilityValue) {
        this.move_p1 = move_p1;
        this.move_p2 = move_p2;
        this.utilityValue = utilityValue;
    }
}

const moveRockRock = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.ROCK, 0);
const moveRockPaper = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.PAPER, -1);
const moveRockScissors = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.SCISSORS, 1);
const movePaperPaper = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.PAPER, 0);
const movePaperScissors = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.SCISSORS, -1);
const movePaperRock = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.ROCK, 1);
const moveScissorsScissors = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.SCISSORS, 0);
const moveScissorsRock = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.ROCK, -1);
const moveScissorsPaper = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.PAPER, 1);

buttonRock.addEventListener("click", () => startGameRound(RPS_MOVE.ROCK));
buttonPaper.addEventListener("click", () => startGameRound(RPS_MOVE.PAPER));
buttonScissors.addEventListener("click", () => startGameRound(RPS_MOVE.SCISSORS));

function getMoveUtility(move_p1, move_p2) {
    if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.ROCK) {
        return moveRockRock.utilityValue;
    }
    if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.PAPER) {
        return moveRockPaper.utilityValue;
    }
    if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.SCISSORS) {
        return moveRockScissors.utilityValue;
    }
    if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.PAPER) {
        return movePaperPaper.utilityValue;
    }
    if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.SCISSORS) {
        return movePaperScissors.utilityValue;
    }
    if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.ROCK) {
        return movePaperRock.utilityValue;
    }
    if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.SCISSORS) {
        return moveScissorsScissors.utilityValue;
    }
    if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.ROCK) {
        return moveScissorsRock.utilityValue;
    }
    if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.PAPER) {
        return moveScissorsPaper.utilityValue;
    }
    console.log("Error: impossible move!");
}

// const mapUtilityPoints = new Map();

// mapUtilityPoints.set(moveRockRock, moveRockRock.utilityValue);
// mapUtilityPoints.set(moveRockScissors, moveRockScissors.utilityValue);
// mapUtilityPoints.set(moveRockPaper, moveRockPaper.utilityValue);
// mapUtilityPoints.set(movePaperPaper, movePaperPaper.utilityValue);
// mapUtilityPoints.set(movePaperScissors, movePaperScissors.utilityValue);
// mapUtilityPoints.set(movePaperRock, movePaperRock.utilityValue);
// mapUtilityPoints.set(moveScissorsScissors, moveScissorsScissors.utilityValue);
// mapUtilityPoints.set(moveScissorsRock, moveScissorsRock.utilityValue);
// mapUtilityPoints.set(moveScissorsPaper, moveScissorsPaper.utilityValue);

var move_p1_input = RPS_MOVE.ROCK;

function startGameRound(move_p1){
    if(current_move_opponent != -1)
    buttonOpponent.classList.remove(arrayRPSName[current_move_opponent].toLowerCase());

    let indexOtherButton1 = (move_p1+1) % RPS_MOVE.length;
    let indexOtherButton2 = (move_p1+2) % RPS_MOVE.length;
    buttonsRPS[indexOtherButton1].disabled = true;
    buttonsRPS[indexOtherButton2].disabled = true;

    move_p1_input = move_p1;
    var move_opponent = getComputerPlayer2Move();
    current_move_opponent = move_opponent;
    buttonOpponent.textContent = arrayRPSName[move_opponent];
    buttonOpponent.classList.toggle(arrayRPSName[move_opponent].toLowerCase());

    getWinner(move_p1_input, move_opponent);
    
    buttonsRPS[indexOtherButton1].disabled = false;
    buttonsRPS[indexOtherButton2].disabled = false;
}


function getComputerPlayer2Move() {
    let rand = Math.random();
    if (rand < 0.34) {
        return RPS_MOVE.ROCK;
    }
    else if (rand < 0.67) {
        return RPS_MOVE.PAPER;
    }
    else {
        return RPS_MOVE.SCISSORS;
    }
}

function getWinner(move_p1, move_p2) {
    let move_utility = getMoveUtility(move_p1, move_p2);
    printWinningMessage(move_p1, move_p2, move_utility);
    let p1_score = document.getElementById("p1_score_value");
    let p2_score = document.getElementById("p2_score_value");
    
    showScoreAddition(move_utility);

    p1_score.innerText = Number.parseInt(p1_score.innerText) + move_utility;
    p2_score.innerText = Number.parseInt(p2_score.innerText) - move_utility;
}

function showScoreAddition(move_utility){
    let p1_score_addition = document.getElementById("p1_score_addition");
    let p2_score_addition = document.getElementById("p2_score_addition");

    let utility_p1 = move_utility;
    let utility_p2 = move_utility * -1;

    p1_score_addition.innerText = utility_p1 > 0 ? "+" + utility_p1 : utility_p1;
    p2_score_addition.innerText = utility_p2 > 0 ? "+" + utility_p2 : utility_p2;

    animateAddition(p1_score_addition);
    animateAddition(p2_score_addition);
}

function getWinningMoves() {
    for (let i = 0; i < RPS_MOVE.length; i++) {
        let cyclingMove1 = (i + 1) % RPS_MOVE.length;
        let cyclingMove2 = (i + 2) % RPS_MOVE.length;
        printWinningMessage(i, i, getMoveUtility(i, i));
        printWinningMessage(i, cyclingMove1, getMoveUtility(i, cyclingMove1));
        printWinningMessage(i, cyclingMove2, getMoveUtility(i, cyclingMove2));
    }
}

function printWinningMessage(move_p1, move_p2, utilityValue) {
    let message = arrayRPSName[move_p1];
    // switch(utilityValue){
    //     case 0: message += " ties with "; break;
    //     case 1: message += " beats "; break;
    //     case -1: message += " loses to "; break;
    // }
    if (utilityValue > 0) {
        message += " beats ";
    }
    else if (utilityValue < 0) {
        message += " loses to ";
    }
    else if (utilityValue == 0) {
        message += " ties with ";
    }
    message += arrayRPSName[move_p2] + "!";
    // alert(message);
    winnerText.textContent = message;

    animateResult();
}

function animateResult() {
    let id = null;
    const elem = winnerText;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 15);
    function frame() {
        if (pos == 15) {
            clearInterval(id);
          } else {
            pos++; 
            elem.style.fontSize = pos + "px";
          }
        }
  }
  
  function animateAddition(score_addition){
    score_addition.style.opacity = "100%";
    let id = null;
    const elem = score_addition;
    let pos = 8;
    clearInterval(id);
    id = setInterval(frame, 30);
    function frame() {
        if (pos == -14) {
            clearInterval(id);
            score_addition.style.opacity = "0%";
          } else {
            pos-=2; 
            elem.style.top = pos + "px";
          }
        }
  }