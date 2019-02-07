$(function () {
    // variables
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMin, timeSec, timeMili, lapMin, lapSec, lapMili;

    //on app load show start and lap buttons
    hideshowButtons("#startbtn", "#lapbtn");
    //click start
    $("#startbtn").click(function () {
        mode = 1;
        hideshowButtons("#stopbtn", "#lapbtn");
        startCounting();

    })

    //click stop
    $("#stopbtn").click(function () {
        hideshowButtons("#resumebtn", "#resetbtn");
        clearInterval(action);
    });

    //click resume
    $("#resumebtn").click(function () {
        hideshowButtons("#stopbtn", "#lapbtn");
        startCounting();
    });

    //click reset
    $("#resetbtn").click(function () {
        location.reload();
    });

    //click on lap
    $("#lapbtn").click(function () {
        if (mode = 1) {
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startCounting();
        }
    });


    //functions

    // shows two buttons
    function hideshowButtons(x, y) {
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //start the counter
    function startCounting() {
        action = setInterval(function () {
            timeCounter++;
            lapCounter++;
            updateTime();
        }, 10);
    }

    // convert counters to min,sec,milisec
    function updateTime() {
        //1min=60*100mili=6000sec  1sec=100centi
        timeMin = Math.floor(timeCounter / 6000);
        timeSec = Math.floor((timeCounter % 6000) / 100);
        timeMili = (timeCounter % 6000) % 100;
        $("#timemin").text(format(timeMin));
        $("#timesec").text(format(timeSec));
        $("#timemilisec").text(format(timeMili));

        lapMin = Math.floor(lapCounter / 6000);
        lapSec = Math.floor((lapCounter % 6000) / 100);
        lapMili = (lapCounter % 6000) % 100;
        $("#lapmin").text(format(timeMin));
        $("#lapsec").text(format(timeSec));
        $("#lapmilisec").text(format(timeMili));
    }

    //format numbers
    function format(number) {
        if (number < 10) {
            return '0' + number
        } else {
            return number
        }
    }

    function addLap() {
        lapNumber++;
        var lapDetails =
            '<div class="lap">' +
            '<div class="laptimetitle">' +
            'Lap ' + lapNumber +
            '</div>' +
            '<div class="laptime">' +
            '<span>' + format(lapMin) + '</span>' +
            ':<span>' + format(lapSec) + '</span>' +
            ':<span>' + format(lapMili) + '</span>' +
            '</div>' +
            '</div>';
        $(lapDetails).prependTo("#laps");
    }

})
