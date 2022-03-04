//Menu
var menuHome = document.querySelector("#go-to-home");
var menuLoot = document.querySelector("#go-to-lootgen");
var menuNpc = document.querySelector("#go-to-npcgen");
var menuMap = document.querySelector("#go-to-map");
var menuJournal = document.querySelector("#go-to-journal");
var menuLore = document.querySelector("#go-to-lore");

menuHome.addEventListener("click", () => window.open("../index.html", "_self"));
menuLoot.addEventListener("click", () => window.open("../generators/loot/lootGenerator.html", "_self"));
menuNpc.addEventListener("click", () => window.open("../generators/npc/npcGenerator.html", "_self"));
menuJournal.addEventListener("click", () => window.open("./journal.html", "_self"));



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
    if (container.innerHTML != 0) container.innerHTML = 0; 
    for (let item of arrOfFilteredItems) {
        if (arrOfUniqueItems.indexOf(item) == -1) {
            arrOfUniqueItems.push(item);
        }
    }
    console.log(container.innerHTML == 0);

    for (let el of arrOfUniqueItems) {
        container.innerHTML += `<option value="${el}">${returnCategory} ${el}</option>`
    }

    container.style.display = "inline-block";
    selectButton.style.display = "inline-block";
    console.log(container.innerHTML == 0);
}

function toggleSelectionElements() {
    if (searchButton.innerHTML == "Search Journal") {
        campaignSelect.style.display = "inline-block";
        camLabel.style.display = "inline-block";
        parLabel.style.display = "inline-block";
        chaLabel.style.display = "inline-block";
        searchButton.innerHTML = "Hide Search";
        populateCategoryInSelect("campaign", 1, "part", partSelect);
        populateCategoryInSelect("part", 1, "chapter", chapterSelect);
        
    } else if (searchButton.innerHTML == "Hide Search") {
        campaignSelect.style.display = "none";
        partSelect.style.display = "none";
        chapterSelect.style.display = "none";
        camLabel.style.display = "none";
        parLabel.style.display = "none";
        chaLabel.style.display = "none";
        searchButton.innerHTML = "Search Journal";
        selectButton.style.display = "none";
        
    }
    
}

function displaySelectedEntry() {
    let journalArr = journal();
    journalArr = journalArr.slice().reverse();

    for (let entry of journalArr) {
        if (
            entry.campaign == campaignSelect.value &&
            entry.part == partSelect.value &&
            entry.chapter == chapterSelect.value 
            ) {
                
             entryDisplay.innerHTML = "Chapter " + entry.chapter + ": " + "\"" + entry.chapterTitle + "\"" + "<br>" + entry.summary;
             break;
        }
    }
    // entryDisplay.innerHTML = "SELECTION NOT FOUND";
}

let selectButton = document.getElementById("selectButton");
let searchButton = document.getElementById("searchButton");
let backButton = document.getElementById("backButton");
let campaignSelect = document.getElementById("campaignSelect");
let partSelect = document.getElementById("partSelect"); 
let chapterSelect = document.getElementById("chapterSelect");
let entryDisplay = document.getElementById("journal-entry-display")
let camLabel = document.getElementById("selectLabelsCam");
let parLabel = document.getElementById("selectLabelsPar");
let chaLabel = document.getElementById("selectLabelsCha");

backButton.addEventListener("click", () => window.open("./journal.html", "_self"));

searchButton.addEventListener("click", toggleSelectionElements);

selectButton.addEventListener("click", displaySelectedEntry);

//Visual content selector

let campaignContent = document.getElementById("campaign-content");
let partContent = document.getElementById("part-content");
let journalClosed = document.querySelector(".journal-closed");
let journalOpen = document.querySelector(".journal-open");
let leftPage = document.getElementById("left-page");
let rightPage = document.getElementById("right-page");

//For campaign and parts
function populateContentVisual(filterCategory, filterByVal, returnCategory, container) {
    let arrOfFilteredItems = filterByCategory(filterCategory, filterByVal, returnCategory);
    let arrOfUniqueItems = [];
    // if (container.innerHTML != 0) container.innerHTML = 0; 
    for (let item of arrOfFilteredItems) {
        if (arrOfUniqueItems.indexOf(item) == -1) {
            arrOfUniqueItems.push(item);
        }
    }

    for (let el of arrOfUniqueItems) {
        if (container.innerHTML == 0){
            container.innerHTML = `<div class="contents-item" id="con${returnCategory}${el}">~ ${returnCategory} ${el} ~</div>`
        }else {
            container.innerHTML += `<div class="contents-item" id="con${returnCategory}${el}">~ ${returnCategory} ${el} ~</div>`
        }
    }
}

//For chapters
function populateChaptersVisual(filterCategory, filterByVal, returnCategory, container) {
    let arrOfFilteredItems = filterByCategory(filterCategory, filterByVal, returnCategory);
    let arrOfUniqueItems = [];
    // if (container.innerHTML != 0) container.innerHTML = 0; 
    for (let item of arrOfFilteredItems) {
        if (arrOfUniqueItems.indexOf(item) == -1) {
            arrOfUniqueItems.push(item);
        }
    }

    for (let el of arrOfUniqueItems) {
        if (container.innerHTML == 0) {
            container.innerHTML = `<div class="left-item" id="LItem${returnCategory}${el}">~ ${returnCategory} ${el} </div>`
        }else {
            container.innerHTML += `<div class="left-item" id="LItem${returnCategory}${el}">~ ${returnCategory} ${el} </div>`
        }
        
    }
}

function findNumberOf_In_(subcontent, content, contentNum) {
    let arrOfFilteredItems = filterByCategory(content, contentNum, subcontent);
    let arrOfUniqueItems = [];
    // if (container.innerHTML != 0) container.innerHTML = 0; 
    for (let item of arrOfFilteredItems) {
        if (arrOfUniqueItems.indexOf(item) == -1) {
            arrOfUniqueItems.push(item);
        }
    }
    
    let resultArr = [];
    let startingItemNum = arrOfUniqueItems[arrOfUniqueItems.length - 1];
    let endingItemNum = arrOfUniqueItems[0];
    resultArr.push(endingItemNum);
    resultArr.push(startingItemNum);
    console.log(resultArr);
    return resultArr;
}

function populateSummary(chosenCampaign, chosenPart, chosenChapter) {
    let journalArr = journal();
    journalArr = journalArr.slice().reverse();

    for (let entry of journalArr) {
        if (chosenCampaign == entry.campaign && chosenPart == entry.part && chosenChapter == entry.chapter) {
            rightPage.innerHTML = '<div class="right-item">' + "Chapter " + entry.chapter + ": " + "\"" + entry.chapterTitle + "\"" + "<br>" + entry.summary; '</div>'
           
        } else '<div class="right-item">' + 'Entry Not Found' + '</div>'
    }
}


function useJournal() {
    journalClosed.addEventListener("click", chooseJournalSelection);
}

useJournal();

function showCampaignChoices() {
    chosenCampaign = 1;  
    journalClosed.style.display = "none";
    campaignContent.style.display = "flex";
    return chosenCampaign;  
}

function showPartChoices(chosenCampaign) {
    console.log("CCam: " + chosenCampaign);
    populateContentVisual("campaign", chosenCampaign, "part", partContent);

    campaignContent.style.display = "none";
    partContent.style.display = "flex";
}

function choosePartShowChapters(chosenPart) {
    console.log("CP: " + chosenPart)
    populateChaptersVisual("part", chosenPart, "chapter", leftPage);

    partContent.style.display = "none";
    journalOpen.style.display = "flex";
    console.log("chapters shown");
}



function chooseJournalSelection() {
    console.log("calling");
    let chosenCampaign = showCampaignChoices();
    
    document.getElementById("conCamp" + chosenCampaign).addEventListener("click", () => {
        chosenCampaign = idStringToNumber(event.target.id);
        showPartChoices(chosenCampaign);
        //Fn to loop over parts list and add event listeners to each one
        let numOfParts = findNumberOf_In_("part", "campaign", chosenCampaign);
        
        for (let i = numOfParts[0]; i <= numOfParts[1]; i++) {
            document.getElementById("conpart" + i).addEventListener("click", () => {
                chosenPart = idStringToNumber(event.target.id);
                choosePartShowChapters(chosenPart);
                //Fn to loop over chapter list and add event listeners
                let numOfChapters = findNumberOf_In_("chapter", "part", chosenPart);
                
                for (let i = numOfChapters[0]; i <= numOfChapters[1]; i++) {
                    document.getElementById("LItemchapter" + i).addEventListener("click", () => {
                        chosenChapter = idStringToNumber(event.target.id);
                        populateSummary(chosenCampaign, chosenPart, chosenChapter);
                    })
                }
            });
        }
        
    });
    

}

//Helper Functions
function idStringToNumber(elementID) {
   result = Number(elementID.match(/\d+/)[0]);
   return result;
}



//Journal Template
let journalObjTemplate = {
    campaign: 1,
    part: 1,
    chapter: 4,
    chapterTitle: "Shadows Buried Beneath The Prison",
    date: "02/04/22",
    guests: 0,
    summary: "   Chapter 5 summary coming soon"
}
// End Journal Template

//Journal Array- add to top

function journal() {
    let journalArray = [
        {
            campaign: 1,
            part: 1,
            chapter: 5,
            chapterTitle: "Into The Cursed Black Maw Of The Sea",
            date: "02/25/22",
            guests: 0,
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },
        
        {
            campaign: 1,
            part: 1,
            chapter: 4,
            chapterTitle: "Shadows Buried Beneath The Prison",
            date: "02/04/22",
            guests: 0,
            summary: "The morning was black, the rain battering the inn, and the wind assaulting the town like a vengeful spirit. Kambam and Rhünedâr awoke to notes beckoning them to meet in Byron's room. Meanwhile, as Byron himself awoke, a flash of lightning revealed a figure, hooded and cloaked, sitting in his midst. It was Ronan. Once the other two arrived, Ronan informed them of the ill happenings that kept him from their meeting. He had taken the fall for the party's dungeon incursion, and was now hunted. They informed him of what they found in the dungeon, and their hopes to infiltrate the lower dungeon. He directed them to a man named Abelard Tuck, and told them to report their findings to him at the home of Magda, the herbalist." +
                "Abelard revealed to the party rumors of a cave system that leads into a secret dungeon, used in the Gozen Wu Gawa campaigns to torture and interrogate elves. He led them to the spot where the caves begin, and his wife is buried. The party chose to venture into the sea cave, where they encountered a band of Sea Goblins. After stealing some gold, Rhünedâr's aggression convinced them conflict wasn't worth it, and they scattered. After a time, they came to the end of the tunnel, discovering a secret door." +
                "On the other side was revealed a large multi- level cavern that opened at the back to the sea. A ship was docked below, along with cages, and soldiers preparing it for sailing. The party sent Kambam in to investigate. He first discovered another prison with people in it, built into the stone above a black pool. He then infiltrated the ship, while Byron and Rhünedâr hid behind the crates. Scanning their manifests, Kambam quickly discovered that the soldiers, and by extension, Jantis himself, were selling the prisoners. The manifest revealed Andreé to be one of those sold, for a hefty sum. With this information in hand, the party entered the ship, and confronted the soldiers. After a quick and bloody battle, the last remaining soldier turned his magic hand to the caged prisoners, promising to end their lives if the party didn't retreat." + 
                "Byron cast a hasty charm-person, and convinced him to surrender. They interrogated him, learning that selling these prisoners was how Jantis had been keeping the town alive. But he knew nothing of who they dealt with, why, or where they would meet. His usefulness now run dry, the party debated what to do with him. Sickened by his behavior, (selling people, even criminals, being a grave affront to the gods, who abhor the treatment of their children as property) Kambam quickly developed his own designs as to the soldiers' fate. Leading him to the black pool, he pushed him in and the massive snapping turtle guarding its depths consumed him in a blink." +  
                "The party returned to Ronan at the home of the herbalist. They told him of Andreé's fate. The party then renegotiated their terms with Ronan, agreeing to help him further, by rescuing Andreé. With their partnership solidified, the party decided on a new course of action, to follow Jantis to the meeting place in hopes of identifying the buyers. Black clouds bringing the unrelenting storms are now a permanent fixture over town. But even in the face of this curse, the fog obscuring the source of Seascape's misfortune is beginning to clear as the party heads off in the direction of the deep, dark sea."
            

        },

        {
            campaign: 1,
            part: 1,
            chapter: 3,
            chapterTitle: "Sins Of The Father, Secrets Of A Son",
            date: "01/14/22",
            guests: 0,
            summary: "With smoke and storms swirling overhead, the party began making its way in search of Ronan, to update him on their findings in the black dungeon. Suddenly, Jantis came storming down the hill, flagging them down, his intentions unclear. Our nervous heroes decided to wait and see what he had to say. To their surprise, he brought before them a heartfelt apology, sincere gratitude for saving Rory and Raine and a small insight into the suffering of Seascape Port and his own personal struggles. After casting a bleak outlook on the future of the town, he advised the party to leave. <br>" + 
                "As they left, Kambam felt what seemed to be an attempted pickpocket. It turned out to be a message from Ronan, bidding them meet him at the Fish Oil tavern in an hour. However, he never arrived, so after waiting an extra hour, the party left for the Ard Tierna's manor. Upon arriving, they were greeted by Raine, Rory and his father Tierna Dedrick. He greeted them, before departing the feast. The party spoke with Rory and Raine late into the night. Many drinks and courses in, Rory revealed that he and Raine, wary of Jantis's suspicious behavior, followed him at dawn one morning. He went down to the sea, and received something from a bird flitting over the waves. After persuading him, he offered up the additional information that whatever Jantis received, he had likely stowed it away in his room.<br>" + 
                "After dinner, Byron pulled out the lute, and put on a rousing performance that had Rory and Raine dancing on the table, enthralled by the music. During the performance, Kambam snuck out and made his way into Jantis' room. Inside, on the desk, he discovered a letter with a time and a place,along with a small map to a nearby island. He copied the letter, and returned to dinner. <br>" + 
                "As the evening wound down, and sleep crept into the thoughts of the party guests, they were shocked from their peaceful gathering by screams and clashes of battle. As the party investigated the cries on the rain soaked winds, they were met with peasants scaling the Manor walls, who sought the deaths of the Ard Tierna, blaming them for the misfortune befalling the port town. Springing into action, the party's night of merriment ended in horror, as they defended Rory and Raine. Exhausted, the party returned rain-soaked and demoralized to the moon-watch inn. Before retiring for much needed sleep, they sat for a while in the moon bath on the roof, cleansing themselves of blood, and pondering, each within his own mind, the events of the past two days."
        },

        {
            campaign: 1,
            part: 1,
            chapter: 2,
            chapterTitle: "A Gathering Of Storms & Strangers & Lost Rangers",
            date: "12/10/21",
            guests: 0,
            summary: "After saving the lives of bride and groom and subduing the assailant, Alpin, our three adventurers were promptly taken into custody. The Captain of the guard, Tierna Jantis Trysil, a man equal parts overwhelmed by the storms and suspicious, questioned them at length, seemingly bent on proving their involvement. However, they were soon cleared by witness testimony, and now free men, headed for the Water of Life tavern for a drink. While sharing an ale, a hooded, shadowy figure arrived, and appeared to be sleeping on the bench. With the storms wreaking havoc upon the town, the mood was low, until Byron Blackford raised spirits with a rousing performance. As the night wore on and the Tavern emptied, the hooded man at last revealed himself. His name was Ronan, one of the Diasuile Rangers," +
            "and he had for them a proposition. After witnessing their handiwork at the wedding, he hired the three men to infiltrate the prison, and locate his partner Andreé, a Tiefling woman with raven black hair and midnight purple skin. The party accepted the offer. The following morning they made their way to the prison, where they ran into Rory who had been denied entry to see Alpin. He thanked them and invited them to dinner that evening. Following this, they snuck into the lower dungeons. After battling a small group of Drowners, it quickly became clear that Andreé was not here, though in their investigation, they also discovered a hidden door, seemingly leading to a secret lower dungeon. The door was sealed shut however, and required a special key." +
            "Their exit from the dungeons was covered as the bell tower of the keep caught fire from an errant bolt of lightning, and the party helped extinguish it. So with smoke rising into the air, and leaving chaos in their wake, Byron, Rhünedâr and Kambam left in search of Ronan to deliver the bad news..."
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
