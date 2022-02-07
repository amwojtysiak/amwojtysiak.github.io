//Menu
var menuHome = document.querySelector("#go-to-home");
var menuLoot = document.querySelector("#go-to-lootgen");
var menuNpc = document.querySelector("#go-to-npcgen");
var menuMap = document.querySelector("#go-to-map");
var menuJournal = document.querySelector("#go-to-journal");
var menuLore = document.querySelector("#go-to-lore");

menuHome.addEventListener("click", () => window.open("./index.html", "_self"));
menuLoot.addEventListener("click", () => window.open("./lootGenerator.html", "_self"));
menuNpc.addEventListener("click", () => window.open("./npcGenerator.html", "_self"));
menuJournal.addEventListener("click", () => window.open("./journal.html", "_self"));

//Journal Template
let journalObjTemplate = {
    campaign: 1,
    part: 1,
    chapter: 4,
    chapterTitle: "Shadows Buried Beneath The Prison",
    date: "02/04/22",
    guests: 0,
    summary: "this is the summary of the fourth chapter"
}
// End Journal Template

//journal.length - chapter

function filterByCategory(filterCategory, filterByVal, returnCategory) {
    let journalArr = journal();
    journalArr = journalArr.slice().reverse();
    let arrOfFilteredItems =[];
    for (let entry of journalArr) {
        if (entry[filterCategory] === filterByVal) {
            arrOfFilteredItems.push(entry[returnCategory]);
        }
    }

    return arrOfFilteredItems;
}

function populateCategoryInSelect(filterCategory, filterByVal, returnCategory, container) {
    let arrOfFilteredItems = filterByCategory(filterCategory, filterByVal, returnCategory);
    let arrOfUniqueItems = [];
    for (let item of arrOfFilteredItems) {
        if (arrOfUniqueItems.indexOf(item) == -1) {
            arrOfUniqueItems.push(item);
        }
    }
    console.log(arrOfUniqueItems);

    for (let el of arrOfUniqueItems) {
        container.innerHTML += `<option value="${el}">${returnCategory} ${el}</option>`
    }

    container.style.visibility = "visible";
    selectButton.style.visibility = "visible";
    console.log(container.innerHTML);
}

function showSelectionElements() {
    campaignSelect.style.visibility = "visible";
    populateCategoryInSelect("campaign", 1, "part", partSelect);
    populateCategoryInSelect("part", 1, "chapter", chapterSelect);
}

function displaySelectedEntry() {
    let journalArr = journal();
    journalArr = journalArr.slice().reverse();
    console.log(campaignSelect.value);
    console.log(partSelect.value);
    console.log(chapterSelect.value);

    for (let entry of journalArr) {
        if (
            entry.campaign == campaignSelect.value &&
            entry.part == partSelect.value &&
            entry.chapter == chapterSelect.value 
            ) {
                
             entryDisplay.innerHTML = entry.summary;
             break;
        }
    }
    // entryDisplay.innerHTML = "SELECTION NOT FOUND";
}

let selectButton = document.getElementById("selectButton");
let campaignSelect = document.getElementById("campaignSelect");
let partSelect = document.getElementById("partSelect"); 
let chapterSelect = document.getElementById("chapterSelect");
let entryDisplay = document.getElementById("journal-entry-display")

document.getElementById("testButton").addEventListener("click", showSelectionElements);

selectButton.addEventListener("click", displaySelectedEntry);




//Journal Array- add to top

function journal() {
    let journalArray = [
        {
            campaign: 1,
            part: 1,
            chapter: 4,
            chapterTitle: "Shadows Buried Beneath The Prison",
            date: "02/04/22",
            guests: 0,
            summary: "this is the summary of the fourth chapter"

        },

        {
            campaign: 1,
            part: 1,
            chapter: 3,
            chapterTitle: "Sins Of The Father, Secrets Of A Son",
            date: "01/14/22",
            guests: 0,
            summary: "this is the summary of the third chapter"
        },

        {
            campaign: 1,
            part: 1,
            chapter: 2,
            chapterTitle: "A Gathering Of Storms & Strangers & Lost Rangers",
            date: "12/10/21",
            guests: 0,
            summary: "this is the summary of the second chapter"
        },
        
        {
            campaign: 1,
            part: 1,
            chapter: 1,
            chapterTitle: "Mighty Dreams, Mighty Meetings",
            date: "12/04/21",
            guests: 0,
            summary: "In those days, the land was frail like a fledgling. The powers of the world had been shaken, and an uneasy unification between ancient foes was struck. But old hatreds are not so easily cleansed, like a hemorrhage beneath the skin, they eat away at the new foundation of the world. And yet, in days of turmoil, triumph and transformation, it was in truth two small happenings, on a particular day in autumn, that would come to shape the future of the island. The first was a nightmare. A nightmare so powerful, it ensnared the minds of all the sleeping, and held them rapt as the world perished in fire and bright, bright light. And when it was over, a thing arguably even more mighty occurred.  In fact, it may be argued to be one of the world's most powerful forces: the meeting of fated men. " + 
            "The Bard Byron Blackford arrived in the town of Seascape Port, his services contracted to perform at the wedding of Tierna Rory Trysil, son of the Ard Tierna, and Raine. The town seemed beset by a curse of peculiar and erratic storms that came and went like the bluster of wind in spring. Kambam arrived shortly after, his purpose as secretive as the man himself, and quickly made his way to the Chapel. Across the long meadow, off the road by the sea, Rhünedâr the dwarf buried his father, with the aid of a kind orcish stranger. He was scheduled to be in town to present a commissioned sword to Rory the groom at his wedding. " +
            "As our three strangers gathered at the event come evening, a black and withered tree of love bore rotten, jealous fruit. Alpin, the ward of Ard Tierna Trysil, and surrogate younger brother of Rory, attempted to kidnap the bride, Raine: the source of his tainted love. " +
            "The guests fled, and with the guards falling to the Grass Snakes mercenaries, the only thing standing in the way of this tragedy was three wayward strangers. Coming together, Byron, Rhünedâr and Kambam eliminated the threat and subdued the boy Alpin, who was charmed into compliance by the magic of Byron. He was taken into custody by Tierna Jantis, captain of the guard, and elder brother of Rory. Expecting praise and perhaps a gift, the three men were instead rewarded with custody.  As storm clouds billowed overhead, they were escorted to the keep on a high cliff, and unbeknownst to them, a destiny none could have foreseen. "
            
        }

    ]


    return journalArray
}
