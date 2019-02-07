var playing = false;
var score;
var trialsLeft;
var step;
var move;
var fruits = ["apple", "banana", "blueberries", "cherry", "grapes", "orange", "pineapple", "rapsberry", "watermelon"];

$(function () {
    // click on start/reset button
    $("#startreset").click(function () {
        // are we playing?
        if (playing == true) {
            // reload the page
            location.reload();
        } else { // not playing
            playing = true;
            // score to 0
            score = 0;
            $("#scorevalue").html(score);
            // show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            //hide game over box
            $("#gameover").hide();
            $("#startreset").html("Reset Game");
            startGame();
        }
    });

    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score); // update score
        $("#sliceSound")[0].play(); // play sound
        clearInterval(move); // stop fruit
        setTimeout(startGame, 800); // send new fruit
        $("#fruit1").hide("explode", 200);
    });

    // functions

    // fill trialsLeft with hearts
    function addHearts() {
        $("#trialsLeft").empty();
        for (i = 0; i < trialsLeft; i++) {
            $("#trialsLeft").append('<i class="fas fa-heart"></i>');
        }
    }

    function startGame() {
        $("fruit1").show();
        chooseFruit(); // choose a random fruit
        $("#fruit1").css({
            'left': Math.round(550 * Math.random()), // random position
            'top': -40
        });

        // random step
        step = 1 + Math.round(5 * Math.random()); // change step
        // 2. Move fruit down
        move = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            // check if the fruit is too low
            if ($("#fruit1").position().top > $("#fruits").height()) {
                // any trials left?
                if (trialsLeft > 1) {
                    $("fruit1").show();
                    chooseFruit(); // choose a random fruit
                    $("#fruit1").css({
                        'left': Math.round(550 * Math.random()), // random position
                        'top': -40
                    });

                    // random step
                    step = 1 + Math.round(5 * Math.random()); // change step
                    trialsLeft--; // reduce
                    addHearts(); // populate trialsLeft box
                } else { // game over
                    playing = false;
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + ' </p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }

    // 1. generate a random fruit

    function chooseFruit() {
        //    $("#fruit1").attr('src', 'images/apple.png')
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }


    function stopAction() {
        clearInterval(move);
        $("#fruit1").hide();
    }
});
