let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

function soundAlarm() {
    let amount = 3;
    let audio = new Audio("https://drive.google.com/file/d/1Ecv7zWZMR8woM8wS4D_6Vu96bN7CVm30/view?usp=sharing");

    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
    for(let i = 0; i<amount; ++i){
        setTimeout(playSound,1200*i);
    }
}


function updateValue(key, value) {
    if(value < 0) {
        value = 0;
        console.log("Positive Numders Only");
    }

    if(key == "seconds") {
        if(value < 10) {
            value = "0" + value;
        }

        if(value > 59){
            value = 59;
        }
    }

    $("#" + key).html(value || 0);
    timerObj[key] = value;


    console.log("Min:",timerObj.minutes);
    console.log("Sec:",timerObj.seconds);
}


(function detectChanges(key) {
    console.log("Detect Changes");

    let input = "#" + key + "-input";

    $(input).change(function() {
        updateValue(key, $(input).val());
    });
    $(input).keyup(function() {
        updateValue(key, $(input).val());
    });

    return arguments.callee;
})("minutes")("seconds");


function startTimer() {
    buttonManager(["start",false],["stop",true],["pause",true]);
    freezeInputs();

    timerObj.timerId = setInterval(function() {
        timerObj.seconds--;
        if(timerObj.seconds<=0) {
            if(timerObj.minutes == 0) {
                soundAlarm();
                finishTime();
                return;
            }
            timerObj.seconds = 59;
            timerObj.minutes--;
        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);
    }, 1000);
}



function finishTime(){
    clearInterval(timerObj.timerId);
    buttonManager(["start",false],["stop",false],["pause",false]);

    updateValue("minutes",0);
    updateValue("seconds",0);
    $("#minutes-input").val(0);
    $("#seconds-input").val(0);
    
    setTimeout(function() {
        buttonManager(["start",true],["stop",false],["pause",false]);

    },3000);
    unfreezeInputs();
}

function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start",true],["stop",false],["pause",false]);
    unfreezeInputs();
    updateValue("minutes",$("#minutes-input").val());
    updateValue("seconds",$("#seconds-input").val());
}

function pauseTimer() {
    buttonManager(["start",true],["stop",false],["pause",false]);
    clearInterval(timerObj.timerId);
}

function buttonManager(...buttonsArray) {
    for(let i = 0 ; i< buttonsArray.length; ++i){
        let button = "#" + buttonsArray[i][0] + "-button";
        if (buttonsArray[i][1]) {
            $(button).removeAttr("disabled");
        }else {
            $(button).attr("disabled","disabled");
        }
    }
}


function freezeInputs() {
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");

}
