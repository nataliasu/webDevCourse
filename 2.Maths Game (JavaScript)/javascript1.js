// if we click on the startreset
// if we are playing
// reload the page
// if we are not playing
// playing mode
// score = 0
// show countdown
// hide gameover
// change button to reset
// reduce time by 1sec - countdown
// time left?
// yes -> continue
// no -> gameover
// generate new QA

var playing = false;
var score;
var timeleft;
var action;

document.getElementById("startreset").onclick = function () {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("timeremaining").style.display = "block";
        timeleft = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeleft;
        document.getElementById("gameover").style.display = "none";
        document.getElementById("startreset").innerHTML = "Reset Game";

        countdown();
        makeQA();
    }
}

function countdown() {
    action = setInterval(function () {
        timeleft -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeleft;
        if (timeleft == 0) {
            stopcounting();
            document.getElementById("gameover").style.display = "block";
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            document.getElementById("timeremaining").style.display = "none";
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopcounting() {
    clearInterval(action);
}

function makeQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    goodAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;
    var goodPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + goodPosition).innerHTML = goodAnswer;

    var answers = [goodAnswer];

    for (i = 1; i < 5; i++) {
        if (i != goodPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }
            while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// if we click on answer
// if we are playing
//correct answer?
// yes
// increase score
// show corrext box for 1sec
// generate new QA
// no
// show try again box for 1sec

for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
        if (playing == true) {
            if (this.innerHTML == goodAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("correct").style.display = "block";
                document.getElementById("wrong").style.display = "none";
                setTimeout(function () {
                    document.getElementById("correct").style.display = "none";
                }, 1000);
                makeQA();
            } else {
                document.getElementById("scorevalue").innerHTML = score;
                document.getElementById("wrong").style.display = "block";
                document.getElementById("correct").style.display = "none";
                setTimeout(function () {
                    document.getElementById("wrong").style.display = "none";
                }, 1000);
            }
        }
    }
}
