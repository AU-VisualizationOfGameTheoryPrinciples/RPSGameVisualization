/**
 * @params {number}  parameters are opponent's util values for each move combination
 * @return {Array<number>} returns an array with the MSNE probabilities for choosing Rock, Paper or Scissors
 * 
 *  The Expected Utilities for player 2 (CPU) can be put together to an linear equation system 
 * and with that you can calculate the probabilities for the Mixed Strategy Nash equilibria.
 * By restructuring the equations with some substitutions 
 * let them be calculated in base Javascript:
 * 
 *  EUL = EUC = EUR
 *  EUL = dU a2 + dM d2 + (1-dU-dM) g2
 *  EUC = dU b2 + dM e2 + (1-dU-dM) h2
 *  EUR = dU c2 + dM f2 + (1-dU-dM) i2
 * 
 *  x = (-d2+e2+g2-h2) / (a2-b2-g2+h2)
 *  y = (h2-g2) / (a2-b2-g2+h2)
 *  p = -b2 + h2 + c2 - i2
 *  q = -h2 + i2
 * 
 *  dM = ((y) p + q) / ((-x) p + q + e2 - f2)
 *  dU = dM (x) + (y)
 *  dD = 1 - dM - dU
 * 
**/
function calcMSNE(rr, pr, sr, rp, pp, sp, rs, ps, ss) {
    // calculation based on the expected utility equation system
    //  - but rearranged and substituted to let Javascript do the calculating part
    const x = (-rp + pp + rs - ps) / (rr - pr - rs + ps);
    const y = (ps - rs) / (rr - pr - rs + ps);
    const p = -pr + ps + sr - ss;
    const q = -ps + ss;

    // those variables, are the sigma variables showing the probabilities of one player getting equal Expected Utilities
    var dM = (y * p + q) / (-x * p + q + pp - sp);
    var dU = dM * x + y;
    var dD = 1 - dM - dU;

    console.log(`MSNE calced: Rock = ${dU}, Paper = ${dM}, Scissors = ${dD}`)

    // original equations
    // const EUL = dU * moveRockRock.utilityValue[current_player_index] + dM * moveRockPaper.utilityValue[current_player_index] + dD * moveRockScissors.utilityValue[current_player_index];
    // const EUM = dU * movePaperRock.utilityValue[current_player_index] + dM * movePaperPaper.utilityValue[current_player_index] + dD * movePaperScissors.utilityValue[current_player_index];
    // const EUR = dU * moveScissorsRock.utilityValue[current_player_index] + dM * moveScissorsPaper.utilityValue[current_player_index] + dD * moveScissorsScissors.utilityValue[current_player_index];

    return [dU, dM, dD];
}

export { calcMSNE };

// calc Mixed Strategy Nash Equilibria for one player based on other player's utility
// test setup

// var rr = 0;
// var pr = -2;
// var sr = 1;
// var rp = 2;
// var pp = 0;
// var sp = -2;
// var rs = -1;
// var ps = 2;
// var ss = 0;

// const x = (-rp+pp+rs-ps) / (rr-pr-rs+ps);
// const y = (ps-rs) / (rr-pr-rs+ps);
// const p = -pr + ps + sr - ss;
// const q = -ps + ss;

// var dM = (y * p + q) / (-x * p + q + pp - sp);
// var dU = dM * x + y;
// var dD = 1 - dM - dU;

// var others = document.getElementById("others");
// var mid = document.getElementById("dM");
// var up = document.getElementById("dU");
// var down = document.getElementById("dD");

// others.innerText = "x: " + x + " y: " + y + " p: " + p + " q: " + q
// mid.innerText = dM;
// up.innerText = dU;
// down.innerText = dD;