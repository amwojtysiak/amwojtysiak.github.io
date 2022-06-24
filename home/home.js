
//Countdown Clock
let mo = 6, dat = 24, hr = 20, mins = 0; 
//Enter next chapter date above

document.querySelector("#next-chapter-date").innerHTML = mo + "/" + dat + "/22" 

const nextChapterDate = new Date();
nextChapterDate.setMonth(mo - 1);
nextChapterDate.setDate(dat);
nextChapterDate.setHours(hr);
nextChapterDate.setMinutes(mins);
nextChapterDate.setSeconds(0);

var currentDate = new Date();
console.log(currentDate);

let nextChapterMsec = Date.parse(nextChapterDate);
let currentMsec = Date.parse(currentDate);
console.log(nextChapterMsec);
console.log(currentMsec);

function getTimeRemaining(nextChapterDate){
    currentDate = new Date();
    let total = (Date.parse(nextChapterDate)) - (Date.parse(currentDate)); 
    var seconds = Math.floor( (total/1000) % 60 );
    var minutes = Math.floor( (total/1000/60) % 60);
    var hours = Math.floor( (total/(1000*60*60)) % 24 );
    var days = Math.floor( total/(1000*60*60*24) );

    return{
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id="countdownClock", nextChapterDate) {
    var clock = document.getElementById("countdownClock");
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
    function updateClock(){

        var timeRemaining = getTimeRemaining(nextChapterDate);
            daysSpan.innerHTML = timeRemaining.days;
            hoursSpan.innerHTML = timeRemaining.hours;
            minutesSpan.innerHTML = timeRemaining.minutes;
            secondsSpan.innerHTML = timeRemaining.seconds;
        
        if (timeRemaining.total <= 0) {
            clearInterval(timeinterval);
            document.querySelector("#countdownClock").innerHTML = "Let's Play!! (unless the Wojos are late)"
        }
    }
    
    updateClock();
    var timeinterval = setInterval(updateClock);
}

initializeClock("countdownClock", nextChapterDate);

//async practice

