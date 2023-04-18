
//Countdown Clock
let mo = 04, dat = 30, hr = 19, mins = 30, yr= 23; 
//Enter next chapter date above
//Current Location
let currentLocation = "Kemwei Forest";
//New Content Notification
var newPart = 2, newChapter = 18;
var notifyYear = "2023", notifyMonth = 03, notifyDate = 28;
//Enter new content location  and date(YYYY, MM, DD) above

//Add spell Favorites indexes here
var spellFavorites = [
    "bane",
    "charm-person",
    "cure-wounds",
    "invisibility",
    "thunderwave"
];

document.querySelector("#current-location").innerHTML = currentLocation;
document.querySelector("#next-chapter-date").innerHTML = mo + "/" + dat + "/" + yr;

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

if (document.querySelector("#notification-part")) {
    document.querySelector("#notification-part").innerHTML = newPart;
    document.querySelector("#notification-chapter").innerHTML = newChapter;
}

if (now <= notificationEndDate) {
    document.getElementById("new-content").style.display = "flex"; 
}

let spellBox = document.querySelector(".spellName");
let spellButton = document.querySelector("#spell-button");
let hideSpellButton = document.querySelector("#hide-spell-button");
let favBox = document.querySelector(".fav-spells");
let favTitle = document.querySelector(".fav-title");
let closeBtn = document.querySelector(".close-button");
let descDiv = document.querySelector(`.spellDetail`);
let textDiv = document.querySelector(`.detail-text`);

closeBtn.addEventListener("click", closeDetailBox);
spellButton.addEventListener("click", getSpellNames);
hideSpellButton.addEventListener("click", hideSpells);

function closeDetailBox() {
    descDiv.style.display = "none";
}

function hideSpells() {
    spellBox.style.display = "none";
    favBox.style.display = "none";
    favTitle.style.display = "none";
    hideSpellButton.style.display = "none";
    spellButton.style.display = "block";
    spellBox.innerHTML = "";
    favBox.innerHTML = "";
}


// getSpellNames();

//API TESTING
function getSpellNames() {
    let api = `https://www.dnd5eapi.co/api/spells`;

    fetch(api)
    .then(function(response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        data.results.forEach(spell => {
            if (spellFavorites.includes(spell.index)) {
                favBox.innerHTML += 
                `<div class="spellFav spellItem" data-index="${spell.index}" data-url="${spell.url}" > ${spell.name}</div>`;
            }
            
            spellBox.innerHTML += 
            `<div class="spellItem" data-index="${spell.index}" data-url="${spell.url}" > ${spell.name}</div>`;
        });
    })
    .then(function() {
        favBox.style.display = "flex";
        favTitle.style.display = "flex";
        hideSpellButton.style.display = "block";
        spellButton.style.display = "none";
        spellBox.style.display = "flex";

        let spellList = document.querySelectorAll(".spellItem");
        console.log(spellList.length)
        spellList.forEach(spell => {
            let url = spell.getAttribute("data-url");
            let index = spell.getAttribute("data-index");

            spell.addEventListener("click", function() {
                getSpellDetail(index, url)
            })
        })
    })
}

function getSpellDetail(spellIndex, spellUrl) {
    
    let api = `https://www.dnd5eapi.co${spellUrl}`;
    fetch(api)
    .then(function(response) {
        let data = response.json();
        return data;
    })
    .then(function(data) {
        console.log(data)
        // let descDiv = document.querySelector(`.spellDetail-${spellIndex}`);
        // let descDiv = document.querySelector(`.spellDetail`);
        // let textDiv = document.querySelector(`.detail-text`);
        descDiv.style.display = "flex";
        textDiv.innerHTML = data.desc + "<br/>" + data.higher_level;
    })
}


