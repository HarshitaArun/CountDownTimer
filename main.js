
var initState = {
    min: '00',
    sec: '30', 
    text: ""
};


var state = initState;

var start = document.querySelector('.start');
var pause = document.querySelector('.pause');
var reset = document.querySelector('.reset');

var stopHelper = (function () {
    var unsubscribe;

    return {
        start() {
            unsubscribe = setInterval(init, 1000);
        },
        pause() {
            if (!unsubscribe) return;
            clearInterval(unsubscribe);
        }
    };
})();


start.addEventListener('click', function () {
    stopHelper.start();
});

pause.addEventListener('click', function () {
    stopHelper.pause();
});

reset.addEventListener('click', function () {
    stopHelper.pause();
    state = initState;
    updateTimer(state);
})

function format(val) {
    if (val >= 0 && val <= 9) return '0' + val;
    else return `${val}`;
}


function nextTick({ min, sec, text }) {

    if(sec === '00'){
        text = "TIME UP";
    }
    else{
        sec = format(--sec);
    }

    return {
        min,
        sec, 
        text
    };
}


var updateTimer = (function () {
    var minRef = document.querySelector('.min');
    var secRef = document.querySelector('.sec');
    var textRef = document.querySelector('.text');

    return function ({ min, sec, text }) {
        minRef.textContent = min;
        secRef.textContent = sec;
        textRef.textContent = text;
    }

})();


function init() {
    state = nextTick(state);
    updateTimer(state);
}

updateTimer(state);


