import { RPS_MOVE } from "./RPS_Moves.js";

const beatSound = new Audio("../sound/beat.mp4");
const loseSound = new Audio("../sound/lose.mp4");
const tieSound = new Audio("../sound/tie.mp4");
const tieSound2 = new Audio("../sound/207814__zorrobms1001__metallic_cling1.mp3");

const rockBeatSound = new Audio("../sound/530354__danielpodlovics__stone.wav");
const paperBeatSound = new Audio("../sound/416179__inspectorj__book-flipping-through-pages-a.wav");
const scissorsBeatSound = new Audio("../sound/240473__godowan__scissors.wav");

function playBeatSound(move = null) {
    switch (move) {
        case RPS_MOVE.ROCK:
            playSound(rockBeatSound);
            break;
        case RPS_MOVE.PAPER:
            playSound(paperBeatSound);
            break;
        case RPS_MOVE.SCISSORS:
            playSound(scissorsBeatSound);
            break;

        default:
            playSound(beatSound);
    }
}

function playLoseSound() {
    playSound(loseSound);
}

function playTieSound() {
    playSound(tieSound2);
    // playSound(tieSound);
}

function playSound(soundAudio) {
    soundAudio.load();
    soundAudio.play();
}

export { playBeatSound, playLoseSound, playTieSound };