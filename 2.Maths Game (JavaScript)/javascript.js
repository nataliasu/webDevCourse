var playing = false;
var score;
var action;
var timeremaining;

// klikajac na start/reset
document.getElementById("startreset").onclick = function () {
    // jesli gramy
    if (playing == true) {
        location.reload(); // przeladuj strone
    } else { // jesli nie gramy
        playing = true; // tryb grania
        score = 0; // ustawienie wyniku na 0
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("timeremaining").style.display = "block";
        // pokaz odliczanie
        timeremaining = 60;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;

        //hide gameover box;
        document.getElementById("gameover").style.display = "none";

        document.getElementById("startreset").innerHTML = "Reset Game"; // zmien przycisk na reset

        startCountdown(); // odliczanie

        generateQA(); // generuj nowe pytania
    }
}

// FUNCTIONS

// rozpoczęcie odliczania
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            document.getElementById("gameover").style.display = "block";
            document.getElementById('gameover').innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            document.getElementById("timeremaining").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

// zakonczenie odliczania
function stopCountdown() {
    clearInterval(action);
}

//generowanie pytan i odpowiedzi
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // wypełnienie jednego pudełka odpowiednią odpowiedzią

    // wypełnienie pozostałych złymi odpowiedziami
    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); // wrong answer
            }
            while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }

}

// klikajac answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    if(playing == true){ // sprawdzamy czy gramy
       if(this.innerHTML == correctAnswer){ // dobra odpowiedz?
           score++;
           document.getElementById("scorevalue").innerHTML = score; // zwiekszamy wynik o 1
           
           //hide wrong box i show correct box
           document.getElementById("wrong").style.display = "none";
           document.getElementById("correct").style.display = "block";
           // pokazujemy dobry wynik przez sekunde
           setTimeout(function(){
               document.getElementById("correct").style.display = "none";
           }, 1000);
           
           //generuj nowe QA
           
           generateQA();
           
       } else { //zla odpowiedz
           document.getElementById("correct").style.display = "none";
           document.getElementById("wrong").style.display = "block";
           // pokazujemy dobry wynik przez sekunde
           setTimeout(function(){
               document.getElementById("wrong").style.display = "none";
           }, 1000);
       }
    }
}
}
