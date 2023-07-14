/**
 * @params {number}  parameters are opponent's util values for each move combination
 * @return {Array<number>} returns an array with the MSNE probabilities for choosing Rock, Paper or Scissors
 * 
 *  The Expected Utilities for player 2 (CPU) can be put together to an linear equation system 
 * and with that you can calculate the probabilities for the Mixed Strategy Nash equilibria.
 * By restructuring the equations with some substitutions 
 * let them be calculated in base Javascript:
 * 
 *  EUU = EUM = EUD
 *  EUU = dL a2 + dC d2 + (1-dL-dC) g2
 *  EUM = dL b2 + dC e2 + (1-dL-dC) h2
 *  EUD = dL c2 + dC f2 + (1-dL-dC) i2
 * 
 *  x = (-d2+e2+g2-h2) / (a2-b2-g2+h2)
 *  y = (h2-g2) / (a2-b2-g2+h2)
 *  p = -b2 + h2 + c2 - i2
 *  q = -h2 + i2
 * 
 *  dC = ((y) p + q) / ((-x) p + q + e2 - f2)
 *  dL = dC (x) + (y)
 *  dR = 1 - dC - dL
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
    var dC = (y * p + q) / (-x * p + q + pp - sp);
    var dL = dC * x + y;
    var dR = 1 - dC - dL;

    console.log(`MSNE calced: Rock = ${dL}, Paper = ${dC}, Scissors = ${dR}`)

    // original equations
    // const EUL = dL * moveRockRock.utilityValue[current_player_index] + dC * moveRockPaper.utilityValue[current_player_index] + dR * moveRockScissors.utilityValue[current_player_index];
    // const EUM = dL * movePaperRock.utilityValue[current_player_index] + dC * movePaperPaper.utilityValue[current_player_index] + dR * movePaperScissors.utilityValue[current_player_index];
    // const EUR = dL * moveScissorsRock.utilityValue[current_player_index] + dC * moveScissorsPaper.utilityValue[current_player_index] + dR * moveScissorsScissors.utilityValue[current_player_index];

    return [dL, dC, dR];
}

export { calcMSNE };

// calc Mixed Strategy Nash Equilibria for one player based on other player's utility
// test setleft

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

// var dC = (y * p + q) / (-x * p + q + pp - sp);
// var dL = dC * x + y;
// var dR = 1 - dC - dL;

// var others = document.getElementById("others");
// var center = document.getElementById("dC");
// var left = document.getElementById("dL");
// var right = document.getElementById("dR");

// others.innerText = "x: " + x + " y: " + y + " p: " + p + " q: " + q
// center.innerText = dC;
// left.innerText = dL;
// right.innerText = dR;