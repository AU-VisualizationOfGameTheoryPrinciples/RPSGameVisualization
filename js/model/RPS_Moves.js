const RPS_MOVE = { ROCK: 0, PAPER: 1, SCISSORS: 2, length: 3 };
var arrayRPSName = [3];
arrayRPSName[RPS_MOVE.ROCK] = "Rock";
arrayRPSName[RPS_MOVE.PAPER] = "Paper";
arrayRPSName[RPS_MOVE.SCISSORS] = "Scissors";

class RPS_MOVE_TUPLE {
    move_p1;
    move_p2;
    utilityValue;

    /**
     * "move against move"-object containing utilites for both players
     * @param {RPS_MOVE} move_p1 
     * @param {RPS_MOVE} move_p2 
     * @param {Array<number>[2]} utilityValue "move against move" utility values for both players [p1,p2]
     */
    constructor(move_p1, move_p2, utilityValue) {
        this.move_p1 = move_p1;
        this.move_p2 = move_p2;
        this.utilityValue = utilityValue;
    }
}

class RPS_MOVE_TUPLE_SETUP {
    moveRockRock;
    moveRockPaper;
    moveRockScissors;
    movePaperPaper;
    movePaperScissors;
    movePaperRock;
    moveScissorsScissors;
    moveScissorsRock;
    moveScissorsPaper;

    /**
     * @params "move against move"-objects containing utilites for both players
     * @param {RPS_MOVE_TUPLE} moveRockRock 
     * @param {RPS_MOVE_TUPLE} moveRockPaper 
     * @param {RPS_MOVE_TUPLE} moveRockScissors 
     * @param {RPS_MOVE_TUPLE} movePaperPaper 
     * @param {RPS_MOVE_TUPLE} movePaperScissors 
     * @param {RPS_MOVE_TUPLE} movePaperRock 
     * @param {RPS_MOVE_TUPLE} moveScissorsScissors 
     * @param {RPS_MOVE_TUPLE} moveScissorsRock 
     * @param {RPS_MOVE_TUPLE} moveScissorsPaper 
     */
    constructor(moveRockRock, moveRockPaper, moveRockScissors, movePaperPaper, movePaperScissors, movePaperRock, moveScissorsScissors, moveScissorsRock, moveScissorsPaper) {
        this.moveRockRock = moveRockRock;
        this.moveRockPaper = moveRockPaper;
        this.moveRockScissors = moveRockScissors;
        this.movePaperPaper = movePaperPaper;
        this.movePaperScissors = movePaperScissors;
        this.movePaperRock = movePaperRock;
        this.moveScissorsScissors = moveScissorsScissors;
        this.moveScissorsRock = moveScissorsRock;
        this.moveScissorsPaper = moveScissorsPaper;
    }

    /**
     * 
     * @param {RPS_MOVE} move_p1 
     * @param {RPS_MOVE} move_p2 
     * @returns {Array<number>[2]} "move against move"-utility values for both players
     */
    getMoveUtilities(move_p1, move_p2) {
        // bring p1 and p2 in correct order
        return this.getMoveUtilityHelper(move_p1, move_p2);
    }

    getMoveUtilityHelper(move_p1, move_p2) {
        if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.ROCK) {
            return this.moveRockRock.utilityValue;
        }
        if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.PAPER) {
            return this.moveRockPaper.utilityValue;
        }
        if (move_p1 == RPS_MOVE.ROCK && move_p2 == RPS_MOVE.SCISSORS) {
            return this.moveRockScissors.utilityValue;
        }
        if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.PAPER) {
            return this.movePaperPaper.utilityValue;
        }
        if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.SCISSORS) {
            return this.movePaperScissors.utilityValue;
        }
        if (move_p1 == RPS_MOVE.PAPER && move_p2 == RPS_MOVE.ROCK) {
            return this.movePaperRock.utilityValue;
        }
        if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.SCISSORS) {
            return this.moveScissorsScissors.utilityValue;
        }
        if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.ROCK) {
            return this.moveScissorsRock.utilityValue;
        }
        if (move_p1 == RPS_MOVE.SCISSORS && move_p2 == RPS_MOVE.PAPER) {
            return this.moveScissorsPaper.utilityValue;
        }
        console.log("Error: impossible move!");
        return -1;
    }
}

export {
    RPS_MOVE, arrayRPSName, RPS_MOVE_TUPLE, RPS_MOVE_TUPLE_SETUP
}
