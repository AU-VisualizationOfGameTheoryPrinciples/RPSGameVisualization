import { RPS_MOVE, arrayRPSName, RPS_MOVE_TUPLE, RPS_MOVE_TUPLE_SETUP } from "./RPS_Moves.js";
import { animateAddition, animateResult } from "./animations.js";
import { getFlag, setValueById, getUtility } from "./manageFormValues.js";
import { countCheckedOptions, getCheckedOptionsNumber, getComputerPlayer2Move, setupStrategies } from "./RPS_Strategies.js";
import { playBeatSound, playLoseSound, playTieSound } from "./js/model/Audio_Setup.js";

/**
 * GAME SETUP
 **/

var buttonRock = document.querySelector("#rock");
var buttonPaper = document.querySelector("#paper");
var buttonScissors = document.querySelector("#scissors");
var buttonsRPS = [buttonRock, buttonPaper, buttonScissors];

var buttonOpponent = document.querySelector("#opponentMove");
var winnerText = document.querySelector("#winnerText");

var Winner_History = new Array();

const MOVE_SETUP = setupMoveUtility();

buttonRock.addEventListener("click", () => startGameRound(RPS_MOVE.ROCK));
buttonPaper.addEventListener("click", () => startGameRound(RPS_MOVE.PAPER));
buttonScissors.addEventListener("click", () => startGameRound(RPS_MOVE.SCISSORS));

var move_p1_input = -1;
var current_move_opponent = -1;
var doRandomMove = getFlag("random");
var doRandomMSNEMove = getFlag("randomMSNE");
var doHabitMove = getFlag("habitMove");
var doHabitCounterMove = getFlag("habitMoveCounter");
var doOnlyOneStrategy = getFlag("specific");

if (countCheckedOptions() == 0) {
    doRandomMove = true;
}

setValueById("random", doRandomMove);
setValueById("randomMSNE", doRandomMSNEMove);
setValueById("habitMove", doHabitMove);
setValueById("habitMoveCounter", doHabitCounterMove);
setValueById("specific", doOnlyOneStrategy);

var specific_move_num = doOnlyOneStrategy ? getCheckedOptionsNumber() : null;

setupStrategies(MOVE_SETUP, doRandomMove, doRandomMSNEMove, doHabitMove, doHabitCounterMove);
showActiveStrategies();

/**
 * SETUP- and FRONTEND-FUNCTIONS
 **/

function setupMoveUtility() {
    const moveRockRock = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.ROCK, [getUtility("rr_util1", 0), getUtility("rr_util2", 0)]);
    const moveRockPaper = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.PAPER, [getUtility("rp_util1", -1), getUtility("rp_util2", 1)]);
    const moveRockScissors = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.SCISSORS, [getUtility("rs_util1", 1), getUtility("rs_util2", -1)]);
    const movePaperPaper = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.PAPER, [getUtility("pp_util1", 0), getUtility("pp_util2", 0)]);
    const movePaperScissors = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.SCISSORS, [getUtility("ps_util1", -1), getUtility("ps_util2", 1)]);
    const movePaperRock = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.ROCK, [getUtility("pr_util1", 1), getUtility("pr_util2", -1)]);
    const moveScissorsScissors = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.SCISSORS, [getUtility("ss_util1", 0), getUtility("ss_util2", 0)]);
    const moveScissorsRock = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.ROCK, [getUtility("sr_util1", -1), getUtility("sr_util2", 1)]);
    const moveScissorsPaper = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.PAPER, [getUtility("sp_util1", 1), getUtility("sp_util2", -1)]);

    return new RPS_MOVE_TUPLE_SETUP(moveRockRock, moveRockPaper, moveRockScissors, movePaperPaper, movePaperScissors, movePaperRock, moveScissorsScissors, moveScissorsRock, moveScissorsPaper);
}

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
    var move_opponent = getComputerPlayer2Move(move_p1_last_round, move_p2_last_round, specific_move_num);
    current_move_opponent = move_opponent;
    console.log("now1: " + move_p1_input);
    console.log("now2: " + current_move_opponent);
    buttonOpponent.textContent = arrayRPSName[move_opponent];
    buttonOpponent.classList.toggle(arrayRPSName[move_opponent].toLowerCase());

    getWinner(move_p1_input, move_opponent);

    buttonsRPS[indexOtherButton1].disabled = false;
    buttonsRPS[indexOtherButton2].disabled = false;
}

function getWinner(move_p1, move_p2) {
    let move_utilities = MOVE_SETUP.getMoveUtilities(move_p1, move_p2);
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
        printWinningMessage(i, i, MOVE_SETUP.getMoveUtilities(i, i)[0]);
        printWinningMessage(i, cyclingMove1, MOVE_SETUP.getMoveUtilities(i, cyclingMove1)[0]);
        printWinningMessage(i, cyclingMove2, MOVE_SETUP.getMoveUtilities(i, cyclingMove2)[0]);
    }
}

function printWinningMessage(move_p1, move_p2, utilityValue) {
    let message = arrayRPSName[move_p1];
    // switch(utilityValue){
    //     case 0: message += " ties with "; break;
    //     case 1: message += " beats "; break;
    //     case -1: message += " loses to "; break;
    // }
    let winner;
    if (utilityValue > 0) {
        playBeatSound();
        message += " beats ";
        winner = 1;
    }
    else if (utilityValue < 0) {
        playLoseSound();
        message += " loses to ";
        winner = 2;
    }
    else if (utilityValue == 0) {
        playTieSound();
        message += " ties with ";
        winner = 0;
    }
    message += arrayRPSName[move_p2] + "!";
    // alert(message);
    if (winner && winner >= 0) {
        message += ` P${winner} wins!`;
    }
    winnerText.textContent = message;
    Winner_History.push(winner);
    showWinningHistory(message)

    animateResult(winnerText);
}

function showWinningHistory(winnerText) {
    let winHistory = document.getElementById("Winner_history");
    let winner = document.createElement("p");
    winner.append(winnerText)
    winHistory.append(winner);

    if (winHistory.children.length > 10) {
        winHistory.removeChild(winHistory.firstChild);
    }
}

function showActiveStrategies() {
    let strategies_tab = document.getElementById("CPU_strategies");
    var list = document.createElement("ul");
    if (doOnlyOneStrategy) {
        // strategies_tab.textContent += "doRandomMove";
        addActiveStrategyElement("Only one of the checked Strategies", "The whole game only one of the strategies below is used till page reload.", list);
    }
    if (doRandomMove) {
        addActiveStrategyElement("Random Move", "Choose one of the 3 options one third of the time.", list);
    }
    if (doRandomMSNEMove) {
        addActiveStrategyElement("Random MSNE Move", "Choose one of the options based on Mixed Strategy Nash Equilibria probabilities depending on utility changes.", list);
    }
    if (doHabitMove) {
        let elem = addActiveStrategyElement("Habit Move", "Use one of the options in a certain habit:", list);
        let won = document.createElement("p");
        let lost = document.createElement("p");
        let tie = document.createElement("p");
        won.append("- Won: Use same option again.");
        lost.append("- Lost: Use the counter option to the opponent's last move.")
        tie.append("- Tie: Use random move.");
        elem.append(won);
        elem.append(lost);
        elem.append(tie);
    }
    if (doHabitCounterMove) {
        addActiveStrategyElement("Habit Counter Move", "Use the counter option to the option resulting of the habit strategy.", list);
    }
    strategies_tab.append(list);
}

function addActiveStrategyElement(title, textContent, list) {
    var strategy_title = document.createElement("h4");
    var listItem = document.createElement("li");
    // elem.setAttribute("class", className);
    strategy_title.append(title + ":");
    listItem.append(strategy_title);
    listItem.append(textContent);
    list.append(listItem);
    return listItem;
}
