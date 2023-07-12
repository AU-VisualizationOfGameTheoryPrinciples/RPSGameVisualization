const beatSound = new Audio("./sound/beat.mp4");
const loseSound = new Audio("./sound/lose.mp4");
const tieSound = new Audio("./sound/tie.mp4");

function playBeatSound() {
    playSound(beatSound);
}

function playLoseSound() {
    playSound(loseSound);
}

function playTieSound() {
    playSound(tieSound);
}

function playSound(soundAudio) {
    soundAudio.load();
    soundAudio.play();
}

export { playBeatSound, playLoseSound, playTieSound };