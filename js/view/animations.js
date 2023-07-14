function animateResult(winnerText) {
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

export {
    animateResult, animateAddition
}
