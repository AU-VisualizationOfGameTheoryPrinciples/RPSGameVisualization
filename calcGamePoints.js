import { RPS_MOVE, arrayRPSName, RPS_MOVE_TUPLE } from "./RPS_Moves.js";
import { animateAddition, animateResult } from "./animations.js";
import { getFlag, setValueById, getUtility } from "./manageFormValues.js";
// import { calcMSNE } from "./calcMSNE.js";

var buttonRock = document.querySelector("#rock");
var buttonPaper = document.querySelector("#paper");
var buttonScissors = document.querySelector("#scissors");
var buttonsRPS = [buttonRock, buttonPaper, buttonScissors];

var buttonOpponent = document.querySelector("#opponentMove");
var winnerText = document.querySelector("#winnerText");

var Winner_History = new Array();

const moveRockRock = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.ROCK, [getUtility("rr_util1", 0), getUtility("rr_util2", 0)]);
const moveRockPaper = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.PAPER, [getUtility("rp_util1", -1), getUtility("rp_util2", 1)]);
const moveRockScissors = new RPS_MOVE_TUPLE(RPS_MOVE.ROCK, RPS_MOVE.SCISSORS, [getUtility("rs_util1", 1), getUtility("rs_util2", -1)]);
const movePaperPaper = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.PAPER, [getUtility("pp_util1", 0), getUtility("pp_util2", 0)]);
const movePaperScissors = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.SCISSORS, [getUtility("ps_util1", -1), getUtility("ps_util2", 1)]);
const movePaperRock = new RPS_MOVE_TUPLE(RPS_MOVE.PAPER, RPS_MOVE.ROCK, [getUtility("pr_util1", 1), getUtility("pr_util2", -1)]);
const moveScissorsScissors = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.SCISSORS, [getUtility("ss_util1", 0), getUtility("ss_util2", 0)]);
const moveScissorsRock = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.ROCK, [getUtility("sr_util1", -1), getUtility("sr_util2", 1)]);
const moveScissorsPaper = new RPS_MOVE_TUPLE(RPS_MOVE.SCISSORS, RPS_MOVE.PAPER, [getUtility("sp_util1", 1), getUtility("sp_util2", -1)]);

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
var option_count = 0;

var MSNE_p1;
var MSNE_p2;

if (doRandomMSNEMove) {
    MSNE_p1 = getMSNE(1);
    MSNE_p2 = getMSNE(2);
}

if (countCheckedOptions() == 0) {
    doRandomMove = true;
}

setValueById("random", doRandomMove);
setValueById("randomMSNE", doRandomMSNEMove);
setValueById("habitMove", doHabitMove);
setValueById("habitMoveCounter", doHabitCounterMove);
setValueById("specific", doOnlyOneStrategy);

var specific_move_num = doOnlyOneStrategy ? getCheckedOptionsNumber() : null;

showActiveStrategies();

function getMoveUtilities(move_p1, move_p2) {
    // bring p1 and p2 in correct order
    return getMoveUtilityHelper(move_p1, move_p2);
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

function getMSNE(current_player_num) {
    let other_player_num = current_player_num % 2 + 1;
    let ret = calcMSNE(current_player_num);

    let rock = document.querySelector(`#rock${current_player_num}`);
    let paper = document.querySelector(`#paper${current_player_num}`);
    let scissors = document.querySelector(`#scissors${current_player_num}`);

    rock.innerText = arrayRPSName[RPS_MOVE.ROCK] + '\n (' + roundNumByThreeDecimals(ret[0]).toFixed(2) * 100 + "%)";
    paper.innerText = arrayRPSName[RPS_MOVE.PAPER] + "\n (" + roundNumByThreeDecimals(ret[1]).toFixed(2) * 100 + "%)";
    scissors.innerText = arrayRPSName[RPS_MOVE.SCISSORS] + "\n (" + roundNumByThreeDecimals(ret[2]).toFixed(2) * 100 + "%)";

    return ret;
}

function calcMSNE(current_player_num) {
    let other_player_num = current_player_num % 2 + 1;
    let current_player_index = current_player_num - 1;
    let other_player_index = other_player_num - 1;

    let rr, pr, sr, rp, pp, sp, rs, ps, ss;
    rr = moveRockRock.utilityValue[other_player_index];
    pr = movePaperRock.utilityValue[other_player_index];
    sr = moveScissorsRock.utilityValue[other_player_index];
    rp = moveRockPaper.utilityValue[other_player_index];
    pp = movePaperPaper.utilityValue[other_player_index];
    sp = moveScissorsPaper.utilityValue[other_player_index];
    rs = moveRockScissors.utilityValue[other_player_index];
    ps = movePaperScissors.utilityValue[other_player_index];
    ss = moveScissorsScissors.utilityValue[other_player_index];

    const x = (-rp + pp + rs - ps) / (rr - pr - rs + ps);
    const y = (ps - rs) / (rr - pr - rs + ps);
    const p = -pr + ps + sr - ss;
    const q = -ps + ss;

    var dM = (y * p + q) / (-x * p + q + pp - sp);
    var dU = dM * x + y;
    var dD = 1 - dM - dU;

    console.log(`MSNE calced: Rock = ${dU}, Paper = ${dM}, Scissors = ${dD}`)

    // const EUL = dU * moveRockRock.utilityValue[current_player_index] + dM * moveRockPaper.utilityValue[current_player_index] + dD * moveRockScissors.utilityValue[current_player_index];
    // const EUM = dU * movePaperRock.utilityValue[current_player_index] + dM * movePaperPaper.utilityValue[current_player_index] + dD * movePaperScissors.utilityValue[current_player_index];
    // const EUR = dU * moveScissorsRock.utilityValue[current_player_index] + dM * moveScissorsPaper.utilityValue[current_player_index] + dD * moveScissorsScissors.utilityValue[current_player_index];

    return [dM, dU, dD];
}

function roundNumByThreeDecimals(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
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

function getCheckedOptionsNumber() {
    let rand = Math.floor(Math.random() * countCheckedOptions()) + 1;
    console.log(rand);
    return rand;
}

function getComputerPlayer2Move(last_move_p1, last_move_p2, specific_move_num = null) {
    option_count = 1;
    let rand = specific_move_num == null ? getCheckedOptionsNumber() : specific_move_num;
    if (doRandomMove) {
        if (getsRandomlyPicked(option_count, rand)) {
            return getRandomMove();
        }
    }
    if (doRandomMSNEMove) {
        if (getsRandomlyPicked(option_count, rand)) {
            let MSNE = MSNE_p1;

            let percMSNERock = MSNE[0];
            let percMSNEPaper = MSNE[1];
            console.log(`MSNE p2: Rock = ${MSNE[0]}, Paper = ${MSNE[1]}, Scissors = ${MSNE[2]}`)
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
    let move_utilities = current_player_num == 1 ? getMoveUtilities(last_move_current_player, last_move_other_player) : getMoveUtilities(last_move_other_player, last_move_current_player);
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
    let winner;
    if (utilityValue > 0) {
        message += " beats ";
        winner = 1;
    }
    else if (utilityValue < 0) {
        message += " loses to ";
        winner = 2;
    }
    else if (utilityValue == 0) {
        message += " ties with ";
        winner = 0;
    }
    message += arrayRPSName[move_p2] + "!";
    // alert(message);
    if(winner && winner>=0){
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

    if(winHistory.children.length > 10){
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
    if (doRandomMSNEMove){
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
        addActiveStrategyElement("Habit Move", "Use the counter option to the option resulting of the habit strategy.", list);
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
