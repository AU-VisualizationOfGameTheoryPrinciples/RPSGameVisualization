import { arrayRPSName, RPS_MOVE } from "./RPS_Moves.js";
import { calcMSNE } from "../util/calcMSNE.js";

var doRandomMove, doRandomMSNEMove, doHabitMove, doHabitCounterMove;
var option_count = 0;
var MSNE_p1;
var MSNE_p2;
var MOVE_SETUP;

function setupStrategies(moveSetup, boolRandomMove, boolRandomMSNEMove, boolHabitMove, boolHabitCounterMove) {
    MOVE_SETUP = moveSetup;
    
    doRandomMove = boolRandomMove;
    doRandomMSNEMove = boolRandomMSNEMove;
    doHabitMove = boolHabitMove;
    doHabitCounterMove = boolHabitCounterMove;

    if (doRandomMSNEMove) {
        MSNE_p1 = getMSNE(1);
        MSNE_p2 = getMSNE(2);
    }
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
    let move_utilities = current_player_num == 1 ? MOVE_SETUP.getMoveUtilities(last_move_current_player, last_move_other_player) : MOVE_SETUP.getMoveUtilities(last_move_other_player, last_move_current_player);
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

function getMSNE(current_player_num) {
    let other_player_num = current_player_num % 2 + 1;
    let current_player_index = current_player_num - 1;
    let other_player_index = other_player_num - 1;

    let rr, pr, sr, rp, pp, sp, rs, ps, ss;
    rr = MOVE_SETUP.moveRockRock.utilityValue[other_player_index];
    pr = MOVE_SETUP.movePaperRock.utilityValue[other_player_index];
    sr = MOVE_SETUP.moveScissorsRock.utilityValue[other_player_index];
    rp = MOVE_SETUP.moveRockPaper.utilityValue[other_player_index];
    pp = MOVE_SETUP.movePaperPaper.utilityValue[other_player_index];
    sp = MOVE_SETUP.moveScissorsPaper.utilityValue[other_player_index];
    rs = MOVE_SETUP.moveRockScissors.utilityValue[other_player_index];
    ps = MOVE_SETUP.movePaperScissors.utilityValue[other_player_index];
    ss = MOVE_SETUP.moveScissorsScissors.utilityValue[other_player_index];

    let ret = calcMSNE(rr, pr, sr, rp, pp, sp, rs, ps, ss);

    let rock = document.querySelector(`#rock${current_player_num}`);
    let paper = document.querySelector(`#paper${current_player_num}`);
    let scissors = document.querySelector(`#scissors${current_player_num}`);

    rock.innerText = arrayRPSName[RPS_MOVE.ROCK] + '\n (' + roundNumByThreeDecimals(ret[0]).toFixed(2) * 100 + "%)";
    paper.innerText = arrayRPSName[RPS_MOVE.PAPER] + "\n (" + roundNumByThreeDecimals(ret[1]).toFixed(2) * 100 + "%)";
    scissors.innerText = arrayRPSName[RPS_MOVE.SCISSORS] + "\n (" + roundNumByThreeDecimals(ret[2]).toFixed(2) * 100 + "%)";

    return ret;
}

function roundNumByThreeDecimals(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

export { setupStrategies, countCheckedOptions, getCheckedOptionsNumber, getComputerPlayer2Move, getRandomMove, getRPSHabitMove, getRPSHabitCounterMove, getRPSHabitOrRandomMove, getsRandomlyPicked, getMSNE };