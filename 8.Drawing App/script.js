$(function () {

    //declare variables

    var paint = false;
    var paintErase = "paint";
    var canvas = document.getElementById("paint");
    var context = canvas.getContext("2d");
    var container = $("#container");
    var mouse = {
        x: 0,
        y: 0
    };

    //onload load saced work from localStorage
    if (localStorage.getItem("imgCanvas") != null) {
        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas")
    };

    //set drawing parameters (lineWidth, lineJoin, lineCap)
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    //click inside container
    container.mousedown(function (e) {
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y);
    });

    //move the mouse while holding mouse key
    container.mousemove(function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if (paintErase == "paint") {
                // get color input
                context.strokeStyle = $("#paintColor").val();
            } else {
                //white color
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });

    //mouse up - we are not paintingerasing anymore
    container.mouseup(function () {
        paint = false;
    });

    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function () {
        paint = false;
    });

    //click on reset button
    $("#reset").click(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        paintErase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    //click on save button
    $("#save").click(function () {
        if (typeof (localStorage) != null) {
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        } else {
            window.alert("Your browser does not support local storage...");
        }
    });

    //click on the rease button
    $("#erase").click(function () {
        if (paintErase == "paint") {
            paintErase = "erase";
        } else {
            paintErase = "paint";

        }
        $(this).toggleClass("eraseMode")
    });

    //change color input
    $("#paintColor").change(function () {
        $("#circle").css("background-color", $(this).val());
    });

    //change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });
});
