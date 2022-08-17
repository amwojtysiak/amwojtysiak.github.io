
//Countdown Clock
let mo = 8, dat = 19, hr = 20, mins = 0; 
//Enter next chapter date above
//New Content Notification
var newPart = 2, newChapter = 12;
var notifyYear = "2022", notifyMonth = 08, notifyDate = 01;
//Enter new content location  and date(YYYY, MM, DD) above

document.querySelector("#next-chapter-date").innerHTML = mo + "/" + dat + "/22" 

const nextChapterDate = new Date();
nextChapterDate.setMonth(mo - 1);
nextChapterDate.setDate(dat);
nextChapterDate.setHours(hr);
nextChapterDate.setMinutes(mins);
nextChapterDate.setSeconds(0);

var currentDate = new Date();

let nextChapterMsec = Date.parse(nextChapterDate);
let currentMsec = Date.parse(currentDate);

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

console.log("now updated again");

var notificationStartDate = new Date(notifyYear + "-" + notifyMonth + "-" + notifyDate); 
var notificationEndDate = notificationStartDate.setDate(notificationStartDate.getDate() + 5);
var now = new Date();
console.log(notificationStartDate);
console.log(notificationEndDate)

document.querySelector("#notification-part").innerHTML = newPart;
document.querySelector("#notification-chapter").innerHTML = newChapter;

if (now <= notificationEndDate) {
    document.getElementById("new-content").style.display = "flex"; 
}


//async practice

