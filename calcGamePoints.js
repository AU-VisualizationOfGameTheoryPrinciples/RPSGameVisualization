
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

function getMoveUtilities(move_current_player, move_other_player, current_player_num = 1) {
    // bring p1 and p2 in correct order
    let utility = current_player_num == 1 ? getMoveUtilityHelper(move_current_player, move_other_player) : getMoveUtilityHelper(move_other_player, move_current_player);
    return [utility, utility * -1];
}

function getMoveUtilityHelper(move_p1, move_p2) {
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
    return -1;
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

var move_p1_input = -1;
var current_move_opponent = -1;
var doRandomMove = true;
var doRandomMSNEMove = true;
var doHabitMove = true;
var doHabitCounterMove = true;
var doOnlyOneStrategy = false;
var option_count = 0;

function startGameRound(move_p1) {
    if (current_move_opponent != -1)
        buttonOpponent.classList.remove(arrayRPSName[current_move_opponent].toLowerCase());

    let indexOtherButton1 = (move_p1 + 1) % RPS_MOVE.length;
    let indexOtherButton2 = (move_p1 + 2) % RPS_MOVE.length;
    buttonsRPS[indexOtherButton1].disabled = true;
    buttonsRPS[indexOtherButton2].disabled = true;

    let move_p1_last_round = move_p1_input;
    let move_p2_last_round = current_move_opponent;

    console.log("old1:" + move_p1_input);
    console.log("old2:" + current_move_opponent);

    move_p1_input = move_p1;
    var move_opponent = getComputerPlayer2Move(move_p1_last_round, move_p2_last_round);
    current_move_opponent = move_opponent;
    console.log("now1: " + move_p1_input);
    console.log("now2: " + current_move_opponent);
    buttonOpponent.textContent = arrayRPSName[move_opponent];
    buttonOpponent.classList.toggle(arrayRPSName[move_opponent].toLowerCase());

    getWinner(move_p1_input, move_opponent);

    buttonsRPS[indexOtherButton1].disabled = false;
    buttonsRPS[indexOtherButton2].disabled = false;
}

function countCheckedOptions() {
    let counter = 0;
    if (doRandomMove) counter++;
    if (doRandomMSNEMove) counter++;
    if (doHabitMove) counter++;
    if (doHabitCounterMove) counter++;
    return counter;
}

function getsRandomlyPicked(option_num, rand_num) {
    option_count++;
    console.log(option_count + " - " + option_num + " - " + rand_num);
    return option_num == rand_num;
}

function getComputerPlayer2Move(last_move_p1, last_move_p2) {
    // if (!doOnlyOneStrategy) {
        option_count = 1;
        let checkedOptionsCount = countCheckedOptions();
        let rand = Math.floor(Math.random() * checkedOptionsCount)+1;
        if (doRandomMove) {
            if (getsRandomlyPicked(option_count, rand)) {
                return getRandomMove();
            }
        }
        if (doRandomMSNEMove) {
            if (getsRandomlyPicked(option_count, rand)) {
                let percMSNERock = 1 / 4;
                let percMSNEPaper = 1 / 4;
                return getRandomMove(percMSNERock, percMSNEPaper);
            }
        }
        if (doHabitMove) {
            if (getsRandomlyPicked(option_count, rand)) {
                if (last_move_p1 == -1 || last_move_p2 == -1)
                    return getRandomMove();
                return getRPSHabitMove(last_move_p2, last_move_p1, 2);
            }
        }
        if (doHabitCounterMove) {
            if (getsRandomlyPicked(option_count, rand)) {
                if (last_move_p1 == -1 || last_move_p2 == -1)
                    return getRandomMove();
                return getRPSHabitCounterMove(last_move_p2, last_move_p1, 1);
            }
        }
    // }
    return getRandomMove();
}

function getRandomMove(percent_rock = 1 / 3, percent_paper = 1 / 3) {
    console.log("chosen with: " + percent_rock + " & " + percent_paper)
    let percent_paper_cumulated = percent_paper + percent_rock;
    console.log("percent_scissors: " + (1 - percent_rock - percent_paper));
    let rand = Math.random();
    if (rand <= percent_rock) {
        return RPS_MOVE.ROCK;
    }
    else if (rand <= percent_paper_cumulated) {
        return RPS_MOVE.PAPER;
    }
    else if (rand > percent_paper_cumulated) {
        return RPS_MOVE.SCISSORS;
    }
}

function getCounterMove(move_other_player) {
    return (move_other_player + 1) % RPS_MOVE.length;
}

function getRPSHabitOrRandomMove(last_move_current_player, last_move_other_player, current_player_num = 1, habit_percentage = 0.6) {
    let rand = Math.random();
    if (rand <= habit_percentage) {
        return getRPSHabitMove(last_move_current_player, last_move_other_player, current_player_num);
    } else {
        return getRandomMove();
    }
}

function getRPSHabitMove(last_move_current_player, last_move_other_player, current_player_num) {
    let move_utilities = getMoveUtilities(last_move_current_player, last_move_other_player, current_player_num);
    let utility_num = current_player_num - 1;
    console.log("habit chosen.");
    // console.log("I am Player " + current_player_num + " with " + move_utilities[utility_num]);
    if (move_utilities[utility_num] < 0) {
        console.log("Oh, I lost!");
        return getCounterMove(last_move_other_player);
    }
    else if (move_utilities[utility_num] > 0) {
        console.log("Yes, I win!");
        return last_move_current_player;
    }
    else {
        return getRandomMove();
    }
}

function getRPSHabitCounterMove(last_move_current_player, last_move_other_player, other_player_num = 1) {
    console.log("habit counter chosen.");
    if (last_move_other_player == -1) {
        return getRandomMove();
    }
    let habitMove = getRPSHabitMove(last_move_other_player, last_move_current_player, other_player_num);
    return getCounterMove(habitMove);
}

function getWinner(move_p1, move_p2) {
    let move_utilities = getMoveUtilities(move_p1, move_p2);
    printWinningMessage(move_p1, move_p2, move_utilities[0]);
    let p1_score = document.getElementById("p1_score_value");
    let p2_score = document.getElementById("p2_score_value");

    showScoreAddition(move_utilities);

    p1_score.innerText = Number.parseInt(p1_score.innerText) + move_utilities[0];
    p2_score.innerText = Number.parseInt(p2_score.innerText) + move_utilities[1];
}

function showScoreAddition(move_utilities) {
    let p1_score_addition = document.getElementById("p1_score_addition");
    let p2_score_addition = document.getElementById("p2_score_addition");

    let utility_p1 = move_utilities[0];
    let utility_p2 = move_utilities[1];

    p1_score_addition.innerText = utility_p1 > 0 ? "+" + utility_p1 : utility_p1;
    p2_score_addition.innerText = utility_p2 > 0 ? "+" + utility_p2 : utility_p2;

    animateAddition(p1_score_addition);
    animateAddition(p2_score_addition);
}

// for testing if logic is correct
function getWinningMoves() {
    for (let i = 0; i < RPS_MOVE.length; i++) {
        let cyclingMove1 = (i + 1) % RPS_MOVE.length;
        let cyclingMove2 = (i + 2) % RPS_MOVE.length;
        printWinningMessage(i, i, getMoveUtilities(i, i)[0]);
        printWinningMessage(i, cyclingMove1, getMoveUtilities(i, cyclingMove1)[0]);
        printWinningMessage(i, cyclingMove2, getMoveUtilities(i, cyclingMove2)[0]);
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

function animateAddition(score_addition) {
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
            pos -= 2;
            elem.style.top = pos + "px";
        }
    }
}