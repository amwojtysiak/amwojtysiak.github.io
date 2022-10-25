document.querySelector('.open-gloss').addEventListener("click", openGlossary);
var glossHead = document.querySelector('.glossary-head');
var subTopCultures = document.querySelector('.sub-topics-cultures');
var subTopicTabs = document.getElementsByClassName("sub-topic-tab");
var topicTabs = document.getElementsByClassName("topic-tab");
document.querySelector('#human-tab').addEventListener("click", (event) => {displayTopic('cultures', event, 'human')});
document.querySelector('#elf-tab').addEventListener("click", (event) => {displayTopic('cultures', event, 'elf')});
document.querySelector('#dwarf-tab').addEventListener("click", (event) => {displayTopic('cultures', event, 'dwarf')});
document.querySelector('#misc-tab').addEventListener("click", (event) => {displayTopic('cultures', event, 'misc')});
document.querySelector('#locations-tab').addEventListener("click", (event) => {displayTopic('locations', event)});
document.querySelector('#characters-tab').addEventListener("click", (event) => {displayTopic('characters', event)});
document.querySelector('#beasts-tab').addEventListener("click", (event) => {displayTopic('beasts', event)});
document.querySelector('#cultures-tab').addEventListener("click", (event) => {
    let activeSub = "human";
    for (let topic of subTopicTabs) {
        //topic.setAttribute("class", "sub-topic-tab");   used to start with human every time
        if (topic.classList.contains("active-tab")) {
            activeSub = topic.getAttribute("value");
        }
    };
    //document.querySelector('#human-tab').setAttribute("class", "sub-topic-tab active-tab");  used to start with human every time
    displayTopic('cultures', event, activeSub);
    //subTopCultures.style.display = "flex";
    subTopCultures.style.visibility = "visible";
    glossHead.style.height = "10em";


});


function openGlossary() {
    let titlePage = document.querySelector('.title-page');
    titlePage.style.display = "none";

    let glossPage = document.querySelector('.glossary-page-locations');
    glossPage.style.display = "flex";

    glossHead.style.display = "flex";

    displayTopic('locations', event);
}

function displayTopic(topic, event, subTopic) {
    let topicObj;
    subTopic ? topicObj = Appendix()[topic][subTopic] : topicObj = Appendix()[topic];
    let glossLoc = document.querySelector(".glossary-page-locations");
    glossLoc.innerHTML = "";

    if (event.target.classList.contains("topic-tab")) {
        for (let topic of topicTabs) {
            topic.setAttribute("class", "topic-tab");
        };
        event.target.setAttribute("class", "topic-tab active-tab");
    }

    if (event.target.classList.contains("sub-topic-tab")) {
        for (let topic of subTopicTabs) {
            topic.setAttribute("class", "sub-topic-tab");
        };
        event.target.setAttribute("class", "sub-topic-tab active-tab");
    }
    
    for (let item in topicObj) {
        let name = topicObj[item].name;
        let info = topicObj[item].info;

        glossLoc.innerHTML +=
            "<div class='term-box'>" +
                "<div class='word-name'>" +
                        "<h2 class='term'>"+name+" -</h2>" +
                "</div>" +
                "<div class='word-description'>" +
                        "<p class='term-description'>"+info+"</p>" +
                "</div>" +
            "</div> <br/> <br/>";
        
    }
    if (!subTopic) {
        //subTopCultures.style.display = "none";
        subTopCultures.style.visibility = "hidden";
        //glossHead.style.height = "5em";
    }
}

function Appendix() {
    const appendix = {

  //      location: {
  //         name: " ",
  //         info: " "
  //       },
        locations: {
    
            dahlduhn: {
                name: "Dahlduhn Village",
                info: "A small dwarven village northwest of Seascape Port. It's primary exports are tools and weapons made by the dwarven smiths in the town. Not much is known about the culture and political standing of the dwarves who populate Dahlduhn Village. It is notable only for being the birthplace of the dwarf Rhünedâr."
            },
            honedao: {
                name: "Shichi Honedao",
                info: "Description Coming Soon.."
            },
            kemwei: {
                name: "Kemwei Forest",
                info: "Description Coming Soon.."
            },
            luanpeir: {
                name: "Luanpeir",
                info: "Description Coming Soon.."
            },
            seascape: {
                name: "Seascape Port",
                info: "Description Coming Soon.."
            },
            vassaNathair: {
                name: "Inheritor City of Vassa Nathair",
                info: "Description Coming Soon.."
            },
        },
        // character: {
        //     name: " ",
        //     info: " "
        // },
        characters: {

            byron: {
                name: "Byron Blackford",
                info: "A bard of some renown, Byron is also recoginized by his performing name 'The Starling'. He is a half-elf half-man, and has done a good deal of travelling and performing. He is a bard class and favors a bow, although he is a user of magic as well."
            },
            gabriel: {
                name: "Gabriel Kamban",
                info: "A man from Luanpeir, he fought in the wars between elves and men prior to the current peace for many years. He is a mysterious figure who does not reveal much personal information, but seems to be a man of faith. He is a rogue class who uses dual daggers and a bow with the skill of one trained in the arts of war."
            },
            miko: {
                name: "Miko",
                info: "Coming Soon.."
            },
            rhunedar: {
                name: "Rhünedâr",
                info: "A dwarf from Dahlduhn village. He is a barbarian class and favors a warhammer."
            },

        },
        // culturalTerm: {
        //     name: " ",
        //     info: " "
        // },
        cultures: {
            human: {
                monock: {
                    name: "Monock",
                    info: "An order of warrior monks dedicated to the human gods."
                },
            },
            elf: {
                royarje: {
                    name: "Royarje",
                    info: "Elven nobles appointed by the emporer to rule a town, village, or city."
                },
            },
            dwarf: {
                hrothgar: {
                    name: "Hrothgar",
                    info: "The dwarven creator-god who formed the earth and the dwarven people."
                },
            },
            misc: {
                macmillan: {
                    name: "Ole MacMillan",
                    info: "A mysterious figure who leads a mythical hare-hunt over the moors of Granemoor. He is said to lure young men out to join his endless hunt with enchanted music."
                },
            },

            
        },
        // character: {
        //     name: " ",
        //     info: " "
        // },
        beasts: {
            stormSerpent: {
                name: "Storm Serpent",
                info: "A water dragon who controls the weather of a large area, freqeuntly causing violent and unpredictable storms. The party fought and killed one that was causing horrible storms in the bay of Seascape Port."
            },

        }
    };

    return appendix;
}