
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
        entryDisplay.style.display = "none"
        
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
                entryDisplay.style.display = "block";
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

// backButton.addEventListener("click", () => window.open("./journal.html", "_self"));

// searchButton.addEventListener("click", toggleSelectionElements);

// selectButton.addEventListener("click", displaySelectedEntry);

//Visual content selector

let campaignContent = document.getElementById("campaign-content");
let partContent = document.getElementById("part-content");
let journalClosed = document.querySelector(".journal-closed");
let journalInstructions = document.getElementById('journal-open-instructions');
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
        if (chosenCampaign == entry.campaign && chosenPart == entry.part) {
            document.getElementById("LItemchapter" + entry.chapter).setAttribute('class', "left-item")
        }
        
        if (chosenCampaign == entry.campaign && chosenPart == entry.part && chosenChapter == entry.chapter) {
            rightPage.innerHTML = '<div class="right-item">' + '<span class="chapter-title-text">' + "Chapter " + entry.chapter + ": " + "\"" + entry.chapterTitle + "\"" + '</span>' + "<br><br>" + entry.summary; '</div>'
            document.getElementById("LItemchapter" + entry.chapter).setAttribute('class', "active left-item");

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
    journalInstructions.style.display = "none";
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
    // entryDisplay.style.display = "none"
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
                        //TODO: Add code to remove previous active tag before running populateSummary
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
    summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
}
// End Journal Template

//Journal Array- add to top

function journal() {
    let journalArray = [
       
        {
            campaign: 1,
            part: 2,
            chapter: 14,
            chapterTitle: "Title TBD",
            date: "10/14/22",
            guests: 0,
            location: "Kemwei Villages",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },
        {
            campaign: 1,
            part: 2,
            chapter: 13,
            chapterTitle: "Title TBD",
            date: "08/06/22",
            guests: 0,
            location: "Kemwei Forest",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },
        {
            campaign: 1,
            part: 2,
            chapter: 12,
            chapterTitle: "Caged Birds & Birds of Prey",
            date: "07/08/22",
            guests: 0,
            location: "Kemwei Forest",
            summary: "The party, beaten black and blue, marched along to the haunting Elven melody, beneath the watchful yellow eyes of Miko. Before long, sacks were wrapped around their heads plunging the already Black Forest into an even deeper darkness, obscuring all sense of direction. At long last, the sacks were finally removed, revealing the party to be standing upon a series of high platforms, built into the thick branches of the tall trees. The canopy loomed ominously above as they were thrust into cages built of polished timber, backed to the platform's edge. The fall was monumental, the forest floor a black abyssal pit from this height. <br><br>" + 
            "Miko, after a taunting conversation left with the intent to bring back food. Two guards, dressed in their eclectic garb, had been left to guard the platform. Ronan, still in rough shape, quickly made it clear that he had no intention to stay, and was planning to break out tonight. After some debate, it was decided. Spying debris outside the cage, Byron attempted to use his mage hands to grab something Gabriel could use as a lock pick. However, before he could grab it, it was plucked from the ground by a young Elven boy, maybe 8 to 10 years old. <br><br>" + 
            "The strange boy was quiet, speaking not a word, though seemingly in possession of an understanding of the language. Byron then exchanged a song in return for the pin, a song the boy seemed to love. They snatched the pin  just as Miko came striding across the bridge with their food. It was then she revealed the boy's name to be Martin, and that he was her son. The boy being named after his grandfather, and being an age matching when last they were together, were details not lost on Byron, and panic began to swell within his soul. <br><br>" +
            "Miko then took from a box a pinch of colored fur, igniting it, inhaling the smoke, soon departing to rejoin the party happening on the platforms. After a time, as the party debated their next move, Martin returned with Byron's cloak in hand. He then pointed out to them the platforms on the far side where their equipment was being held. Now left alone, the party saw and took their chance. They quickly donned random garb found lying about amongst the rubbish on the  platform, after Gabriel picked the lock, popping the door open. Martin climbed up on Rhundar's shoulders, wearing a long cloak so as to give the impression of a regular sized man. <br><br>" +
            "The platforms to the left of this interconnected compound were dark and seemed, for the time being, devoid of life. So the party began to creep that way. One person would cross, then shake the rope bridge rail to indicate it was safe. They slowly moved around the platforms this way, all under the tension and firelight of the party raging on the center platform, the largest platform with a bonfire, in which Miko was using the arcane to dance within the flames. After nearly being caught by a couple of Elves in the throes of passion, the party ran into a problem: a rope bridge that seemed old and severely compromised. Gabriel crossed first, stepping carefully and lightly. As he took his next step, his foot went through the plank, and he only just was able to catch the rope rail, and pull himself back up. Byron, Rhundar and Ronan decided to shimmy across the rope tied to a nearby trunk instead, to avoid the dangerous-looking bridge. Ronan went across without incident. However, as Rhundar began to follow suit, he almost instantly slipped. Byron sprang forward, diving out to save his friend. Rhundar grasped at the rope, slowing his tumble just long enough for Byron to dig his fingers into his shirt, the Dwarf hanging over the black abyss, helpless and terrified. With a burst of adrenaline, Byron heaved him back up and onto the platform. <br><br>" +
            "After this mishap it was determined that this was where Martin's journey with them would end, after they had debated taking him. Meanwhile, on the other side, Gabriel played it cool as an Elf approached him, and drunkenly invited him to join him in retrieving something. He took Gabriel into a tent and showed him a box full of smaller boxes, inside which contained the strange fur that Miko had smoked. As they exited the tent, his companion the Elf drunkenly stumbled to his death. At last, after several more failed attempts, Rhundar and Byron met up with Ronan on the other side. Martin also rejoined, simply walking around and through the party avoiding the rickety bridge, since he had no need for stealth. This enormous platform, anchored into the largest tree any of them had seen, was home to two large tents, and after some scouting by Gabriel, it was revealed the spiral stairs leading down were also anchored into the trees behind the tents. It was decided Rhundar and Martin would stay near the stairs, while Gabriel, Byron and Ronan went and tried to snatch back their gear. <br><br>" +
            "Byron was able to successfully deceive the guards into believing them to be members of Miko's band, and were able to grab their equipment and sneak out the back of the tent amidst the chaos of the party, growing more raucous as the Elves got more and more drunk and high. <br><br>" +
            "Meanwhile, Martin convinced Rhundar to go and have a peek with him at what was under the large tent toward the back of the platform. As far as Rhundar could tell, he was both afraid of it, and endlessly intrigued by it. So, after Martin surprised Rhundar by showing some proficiency in the arcane by calling down lightning that started a small fire, they snuck around behind the tent. Poking their heads under, they were suddenly hit with a wave of nausea, and the deep seated sense that something was wrong.  Inside, contained by the magic of a sweating Elf holding up an arcane shield, was a beast. It looked like a rotting red deer, with chunks of flesh withered away and exposing the bone underneath. Rather than bone though, it had twisted dark roots. Rhundar and Martin both backed out, horrified by what they saw. <br><br>" +
            "As they backed out, they soon reunified with the other three, loaded down with their gear, feeling that their luck was about to run out, and that they needed to leave now. Thick raindrops began to pierce the canopy, thunder rumbling, setting the forest a quiver. Just as they were beginning to descend the spiral stairs, their collective ill feeling came to fruition, as Miko swung down from a higher branch, laughing. She applauded their efforts and stealth, but reminded them that in her forest, she sees all. <br><br>" +
            "Just as she was about to finish off a wounded Rhundar with a blast of arcane energy, little Martin whipped the bottom of the tent up, and with a pulse of his own, toppled the Elven mage keeping the beast contained. It burst forth from the tent, ripping through the top, its terrifying and disharmonious song bleeding out into the night. Byron saw in Miko's eyes a flash of terror that instantly turned into excitement. The beast began to tramp forth, while Miko's warriors rushed over to the scene of the commotion. At that moment another song rang out through the trees and overpowered even the storms. This was a song of haunting beauty. A massive black and white shape came hurtling into view, scaling the tree and landing on the platform, a great wolf illuminated in the rainy night by light of the fire. As Miko's band began to attack, it casually swatted them away, sending bodies careening over the edge. It never lost its focus on the deer-beast, charging towards it with teeth bared, fangs glowing an ethereal blush. Thunder clapped, lightning flashed, the two beats collided in combat, and the platforms began to buckle and scream under their weight. Miko seized Martin and touched Byron's face, promising to see him again. <br><br>" +
            "Ronan advised the group that now would be a good time for a swift exit, and the party agreed. They charged down the spiral staircase, and out into the forest of Kemwei at night, its unknown blackness a far better alternative to the fiery chaos unfolding in their wake… " 
            
        },
        {
            campaign: 1,
            part: 2,
            chapter: 11,
            chapterTitle: "Shadows of Kemwei: Whispers of the Past",
            date: "06/24/22",
            guests: 0,
            location: "Road",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },
        {
            campaign: 1,
            part: 2,
            chapter: 10,
            chapterTitle: "MacMillan's Endless Hare Hunt",
            date: "06/17/22",
            guests: 0,
            location: "Road",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },

        {
            campaign: 1,
            part: 2,
            chapter: 9,
            chapterTitle: "The Hills of Granemore",
            date: "05/27/22",
            guests: 0,
            location: "Road",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },

        {
            campaign: 1,
            part: 1,
            chapter: 8,
            chapterTitle: "The World to Come",
            date: "03/18/22",
            guests: 0,
            location: "Seascape Port",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },

        {
            campaign: 1,
            part: 1,
            chapter: 7,
            chapterTitle: "Dawn March Part II",
            date: "03/06/22",
            guests: 0,
            location: "Seascape Port",
            summary: "~SUMMARY COMING SOON~ <br> (Talk to your DM)"
        },
        
        {
            campaign: 1,
            part: 1,
            chapter: 6,
            chapterTitle: "Dawn March Part I",
            date: "03/04/22",
            guests: 0,
            location: "Seascape Port",
            summary: "Darkness held its grip upon the land for the third straight day. The party made its way to the temple upon rousing from sleep. Bright and terrible bolts of blue and white lightning were the only light source to guide them in that early morning. Inside, the human cost of the devastation was laid bare: pews lined with sick and injured, every corner of cold stone covered with homeless, young and old, the Mannach wrangling ever growing numbers of orphaned children, lost and confused. Kamban and Byron both kneel before the gods. Kamban's prayers are secret and hidden away, unspoken. Byron prays not to the gods, but to his mother. Rhünedâr stood by, as Jantis was also there, praying feverishly, sweating. He arose before the other two, and so quietly spoke with Rhünedâr. He spoke of his terror and love for the people, before at last departing. <br><br>" +
            "As the party left the temple, the morning was theirs to do with as they wished. Byron, remembering the words of the goblins, led the party back to their encampment to inquire about the child one of them had mentioned. Upon arriving, the goblins met them with desperation rather than hostility. As they entered the small goblin village, they were chilled by a wailing that filled the tight caverns, and echoed down the dark corridors. The goblins brought them before a goblin woman, holding in her spindly fingers a human baby, white and stiff, as though chiseled from stone. Without thinking, Byron immediately placed a hand upon its body, and cast Cure Wounds. The magic course through its veins, but alas, the child was dead. The party departed regretfully, as the goblins mournfully buried the baby at sea. <br><br> " +
            "Upon returning to town, Kamban and Rhünedâr made for the Water of Life to pass the time.  Meanwhile, Byron went to Silvain Sambre's store, where he procured all the books he had about arcana, which happened to be only two. <br><br> " +
            "At last, as dusk descended, the party made its way down to the docks. They were joined by Ronan on the way, and eventually met up with Walten, getting the ship underway and heading out into the sea as the veil of night fell slowly over it. <br><br> " +
            "Spying a single lantern of a sailing ship, the party followed it, the seas unusually calm, to a craggy island. Upon the island, they identified Jantis and his men unloading caged prisoners. Hiding the ship behind the tall cliff at the back of the island, they snuck ashore, hiding amidst the low bushes. A time went by, until at last, Jantis's buyer arrived. Kamban recognized them as Elves, Rohyarzhe garbed in the armor of the old Elven armies. Jantis then threatened their leader, claiming that someone named \"Nightshade\" had only one week left to lift the curse, or Jantis would come for them. <br><br> " +
            "After the exchange, they sailed off, and Jantis returned to Seascape. The party and Walten quickly reboarded the vessel, now dubbed \"The Silver Lining\" by Byron, and made chase of the Elves. They followed them back to an Isle, rising from the black and raging sea like the jagged tooth of a Fell Dragon. All about it, the storm clouds snaked and coiled and swirled, blasts of lightning flashing all around, striking the water, geysers of steam rising from the impact sites. The only safe passage was a single corridor of calm leading to the Isle, on which the Elven ship sailed. The party docked their ship away from the mouth of the cave, then decided to sneak in the front, as it appeared unguarded. <br><br> " +
            "Upon entering, they saw a series of tunnels, basalt caverns carved by erosion and time. Inside, the Elves were running some kind of operation, although it was unclear what it was. They at last came upon a single Elf guarding a door. The party quickly ambushed him, and Kamban picked the lock of the door. Inside, the room was full of the lost prisoners, young and old, gaunt and pale. Many had been there mere days, others bordering on months. The party vowed to return and set them free, but at the present moment retreated. Exploring the cavern revealed that many doors and caverns were guarded, but there was clearly no fear of outside intrusion. <br><br> " +
            "The party doubled back to the entrance and where they'd gone left, now they went right. Kamban snuck quietly into a door, the hallways on the right side of the cave darker, more sparse. Inside, they beheld two Elves at work. They were dumping charred bodies into a pool, unnaturally and completely burned away. Choosing not to engage, the party delved deeper, at last discovering a pool of seawater. Emanating from the depths, came flashes of bright blue and yellow, flickering just beneath the surface. Ronan, Byron and Kamban volunteered to plunge into the water, and see if they could locate the source of the light. Rhünedâr and Walten stayed, guarding the pool. <br><br> " +
            "As the three swam through cold black water that seemed to take on the hue of the rock, the flashes became brighter, leading them to a spot where the water surfaced. They entered into a cavernous chamber, a large pool of water opening to the wider sea off to the right. Inside were cages filled with prisoners ringing the room, and two men. They argued about drawing attention to Seascape, and violating the directive of the Dreamer. <br><br> " +
            "Pulling a caged man to the center, the Elf now identified as Nightshade, began a sinister process of burning the flesh from his bones, and collecting the dust that fell into a bin beneath the cage. Upon seeing this, the three stood in horror, screams echoing about the cavern, and finally silenced. Byron sent a hasty message to Rhünedâr requesting their aid, while Kamban began slowly sneaking around the cages, with intent to bar the front entrance from reinforcements. As Rhünedâr and Walten arrived, the next prisoner was already being prepped and the party recognized him as Alpin. <br><br> " +
            "And so, in an impulsive move motivated by a righteous anger, Byron leapt from the shadows. With a flash, the battle deciding the fate of our party, the prisoners and the entire town of Seascape Port, was upon them."
        },
        
        {
            campaign: 1,
            part: 1,
            chapter: 5,
            chapterTitle: "Into The Cursed Black Maw Of The Sea",
            date: "02/25/22",
            guests: 0,
            location: "Seascape Port",
            summary: "It was a chill wind that blew over the party, exhausted from the events of the morning. They lay against the Western gate, dark clouds spiraling and coiling overhead, as Byron plucked on his lute slowly and lowly. Before long they were passing back into town as folk were passing out of it, hope in restoration of an old way now failing.  They briefly met with Raine, who told them the brothers Jantis and Rory had gone out hunting for those who attacked the Manor. She also informed them that her and Rory's timeline of departure had been moved to that very week." + 
            "The party continued on to the docks, seeking the family of Oganta, in search of a ship. <br><br> They met with Aonghaus and his sons, Mandel and Walten. He agreed to lend them one of his fishing vessels, in exchange for a favor. A man left changed by war, the Oganta patriarch was convinced that the rival Fisheries family, the Marin's, were involved with the Rohyarzhe. The night before a ship of theirs had gone out, not to return. Oganta believed it to be a smuggling ship for Elven loyalists, and so tasked our party with finding this vessel and confirming his suspicion." + 
            "Taking his youngest son to guide them, the party set out on the high sea in search of the lost ship. <br><br> A sudden powerful storm assailed them, sending Rhünedâr overboard with the crash of a mighty wave. He was unable to swim and Kamban leapt in after him as Byron threw them a line, hauling them back aboard. " + 
            "They at last reached their destination, discovering the wayward ship to be beached and besieged by Baribantis, small sea predators attacking in hordes. The party stormed ashore and fended off the beasts, the battle ending in a small cabin at the back of the island's woods. Inside, they discovered that Marin was running a secret brothel, sending out ships to peddle this illegal trade in secret. The party and Walten were left with a difficult choice: reveal this crime and likely get all involved arrested and killed, or conceal it, and affront the laws of gods and men. <br><br> The party decided to let Walten make the ultimate decision, though Byron heavily encouraged the boy to let them go free. He at last decided he would not immediately reveal this, but all involved had one week to leave, or be convicted when at last he does reveal Marins crime in the future. " +
            "The party at last sailed back, those lost returning to Marin, who greeted them on the docks, having suffered great anxiety. Walten felt a burden of guilt about his decision. The party then met with Oganta, informing him it had simply been a night fishing vessel that had beached. Disappointed that there were no Rohyarzhe involved, he kept his side of the deal, and the party were now free to use the ship on the morrow. " +
            "The party retired to the moonwatch, but saw in the distance Jantis and Rory returning with their line of prisoners. Kamban and Byron retired inside, while Rhünedâr chose to go and speak briefly with the brothers. <br><br> The night ended with a quiet dinner with Mairi and Conran and the children. At last, the party adjourned for bed. However, before turning in, Rhünedâr paid a quick visit to Byron's room. He made it clear to his new companion that he didn't approve of his meddling in the lawful and moral affairs of Walten and the people of Seascape. The conversation ended friendly enough. At last, our party drifted with heavy eyes and limbs into a deep and dreamless sleep."
            
        },
        
        {
            campaign: 1,
            part: 1,
            chapter: 4,
            chapterTitle: "Shadows Buried Beneath The Prison",
            date: "02/04/22",
            guests: 0,
            location: "Seascape Port",
            summary: "The morning was black, the rain battering the inn, and the wind assaulting the town like a vengeful spirit. Kambam and Rhünedâr awoke to notes beckoning them to meet in Byron's room. Meanwhile, as Byron himself awoke, a flash of lightning revealed a figure, hooded and cloaked, sitting in his midst. It was Ronan. Once the other two arrived, Ronan informed them of the ill happenings that kept him from their meeting. He had taken the fall for the party's dungeon incursion, and was now hunted. They informed him of what they found in the dungeon, and their hopes to infiltrate the lower dungeon. He directed them to a man named Abelard Tuck, and told them to report their findings to him at the home of Magda, the herbalist. <br><br>" +
                "Abelard revealed to the party rumors of a cave system that leads into a secret dungeon, used in the Gozen Wu Gawa campaigns to torture and interrogate elves. He led them to the spot where the caves begin, and his wife is buried. The party chose to venture into the sea cave, where they encountered a band of Sea Goblins. After stealing some gold, Rhünedâr's aggression convinced them conflict wasn't worth it, and they scattered. After a time, they came to the end of the tunnel, discovering a secret door. <br><br>" +
                "On the other side was revealed a large multi- level cavern that opened at the back to the sea. A ship was docked below, along with cages, and soldiers preparing it for sailing. The party sent Kambam in to investigate. He first discovered another prison with people in it, built into the stone above a black pool. He then infiltrated the ship, while Byron and Rhünedâr hid behind the crates. Scanning their manifests, Kambam quickly discovered that the soldiers, and by extension, Jantis himself, were selling the prisoners. The manifest revealed Andreé to be one of those sold, for a hefty sum. With this information in hand, the party entered the ship, and confronted the soldiers. After a quick and bloody battle, the last remaining soldier turned his magic hand to the caged prisoners, promising to end their lives if the party didn't retreat. <br><br>" + 
                "Byron cast a hasty charm-person, and convinced him to surrender. They interrogated him, learning that selling these prisoners was how Jantis had been keeping the town alive. But he knew nothing of who they dealt with, why, or where they would meet. His usefulness now run dry, the party debated what to do with him. Sickened by his behavior, (selling people, even criminals, being a grave affront to the gods, who abhor the treatment of their children as property) Kambam quickly developed his own designs as to the soldiers' fate. Leading him to the black pool, he pushed him in and the massive snapping turtle guarding its depths consumed him in a blink. " +  
                "The party returned to Ronan at the home of the herbalist. They told him of Andreé's fate. The party then renegotiated their terms with Ronan, agreeing to help him further, by rescuing Andreé. <br><br> With their partnership solidified, the party decided on a new course of action, to follow Jantis to the meeting place in hopes of identifying the buyers. Black clouds bringing the unrelenting storms are now a permanent fixture over town. But even in the face of this curse, the fog obscuring the source of Seascape's misfortune is beginning to clear as the party heads off in the direction of the deep, dark sea."
            

        },

        {
            campaign: 1,
            part: 1,
            chapter: 3,
            chapterTitle: "Sins Of The Father, Secrets Of A Son",
            date: "01/14/22",
            guests: 0,
            location: "Seascape Port",
            summary: "With smoke and storms swirling overhead, the party began making its way in search of Ronan, to update him on their findings in the black dungeon. Suddenly, Jantis came storming down the hill, flagging them down, his intentions unclear. Our nervous heroes decided to wait and see what he had to say. To their surprise, he brought before them a heartfelt apology, sincere gratitude for saving Rory and Raine and a small insight into the suffering of Seascape Port and his own personal struggles. After casting a bleak outlook on the future of the town, he advised the party to leave. <br><br>" + 
                "As they left, Kambam felt what seemed to be an attempted pickpocket. It turned out to be a message from Ronan, bidding them meet him at the Fish Oil tavern in an hour. However, he never arrived, so after waiting an extra hour, the party left for the Ard Tierna's manor. Upon arriving, they were greeted by Raine, Rory and his father Tierna Dedrick. He greeted them, before departing the feast. The party spoke with Rory and Raine late into the night. Many drinks and courses in, Rory revealed that he and Raine, wary of Jantis's suspicious behavior, followed him at dawn one morning. He went down to the sea, and received something from a bird flitting over the waves. After persuading him, he offered up the additional information that whatever Jantis received, he had likely stowed it away in his room.<br><br>" + 
                "After dinner, Byron pulled out the lute, and put on a rousing performance that had Rory and Raine dancing on the table, enthralled by the music. During the performance, Kambam snuck out and made his way into Jantis' room. Inside, on the desk, he discovered a letter with a time and a place,along with a small map to a nearby island. He copied the letter, and returned to dinner. <br><br>" + 
                "As the evening wound down, and sleep crept into the thoughts of the party guests, they were shocked from their peaceful gathering by screams and clashes of battle. As the party investigated the cries on the rain soaked winds, they were met with peasants scaling the Manor walls, who sought the deaths of the Ard Tierna, blaming them for the misfortune befalling the port town. Springing into action, the party's night of merriment ended in horror, as they defended Rory and Raine. Exhausted, the party returned rain-soaked and demoralized to the moon-watch inn. Before retiring for much needed sleep, they sat for a while in the moon bath on the roof, cleansing themselves of blood, and pondering, each within his own mind, the events of the past two days."
        },

        {
            campaign: 1,
            part: 1,
            chapter: 2,
            chapterTitle: "A Gathering Of Storms & Strangers & Lost Rangers",
            date: "12/10/21",
            guests: 0,
            location: "Seascape Port",
            summary: "After saving the lives of bride and groom and subduing the assailant, Alpin, our three adventurers were promptly taken into custody. The Captain of the guard, Tierna Jantis Trysil, a man equal parts overwhelmed by the storms and suspicious, questioned them at length, seemingly bent on proving their involvement. However, they were soon cleared by witness testimony, and now free men, headed for the Water of Life tavern for a drink. While sharing an ale, a hooded, shadowy figure arrived, and appeared to be sleeping on the bench. With the storms wreaking havoc upon the town, the mood was low, until Byron Blackford raised spirits with a rousing performance. As the night wore on and the Tavern emptied, the hooded man at last revealed himself. <br><br> His name was Ronan, one of the Diasuile Rangers," +
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
            location: "Seascape Port",
            summary: "In those days, the land was frail like a fledgling. The powers of the world had been shaken, and an uneasy unification between ancient foes was struck. But old hatreds are not so easily cleansed, like a hemorrhage beneath the skin, they eat away at the new foundation of the world. And yet, in days of turmoil, triumph and transformation, it was in truth two small happenings, on a particular day in autumn, that would come to shape the future of the island. <br><br> The first was a nightmare. A nightmare so powerful, it ensnared the minds of all the sleeping, and held them rapt as the world perished in fire and bright, bright light. And when it was over, a thing arguably even more mighty occurred.  In fact, it may be argued to be one of the world's most powerful forces: the meeting of fated men. <br><br>" + 
            "The Bard Byron Blackford arrived in the town of Seascape Port, his services contracted to perform at the wedding of Tierna Rory Trysil, son of the Ard Tierna, and Raine. The town seemed beset by a curse of peculiar and erratic storms that came and went like the bluster of wind in spring. Kambam arrived shortly after, his purpose as secretive as the man himself, and quickly made his way to the Chapel. Across the long meadow, off the road by the sea, Rhünedâr the dwarf buried his father, with the aid of a kind orcish stranger. He was scheduled to be in town to present a commissioned sword to Rory the groom at his wedding. <br><br>" +
            "As our three strangers gathered at the event come evening, a black and withered tree of love bore rotten, jealous fruit. Alpin, the ward of Ard Tierna Trysil, and surrogate younger brother of Rory, attempted to kidnap the bride, Raine: the source of his tainted love. " +
            "The guests fled, and with the guards falling to the Grass Snakes mercenaries, the only thing standing in the way of this tragedy was three wayward strangers. Coming together, Byron, Rhünedâr and Kambam eliminated the threat and subdued the boy Alpin, who was charmed into compliance by the magic of Byron. He was taken into custody by Tierna Jantis, captain of the guard, and elder brother of Rory. Expecting praise and perhaps a gift, the three men were instead rewarded with custody.  As storm clouds billowed overhead, they were escorted to the keep on a high cliff, and unbeknownst to them, a destiny none could have foreseen. "
            
        }

    ]


    return journalArray
}
