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


//SEARCH FUNCTION
var useResultLimit = true;
var searchValStored = '';

var searchInput = document.querySelector('.input');
var searchText = document.querySelector('#search');
var clearButton = document.querySelector('#clear-button');
var list = document.querySelector('#list');
var searchName = document.querySelector('#search-name');
var searchInfo = document.querySelector('#search-info');
var showAllButton = document.querySelector('.show-all');
var resultsDefinition = document.querySelector('.results-definition');



searchInput.addEventListener("input", (e) => {
    let value = e.target.value;
    searchValStored = value;

    if (value.trim()){
        value = value.trim().toLowerCase();

        // let locationsArr = [];

        // Object.keys(Appendix().locations).forEach((key, index) => {
        //    let entry = Appendix().locations[key];
        //    locationsArr.push(entry);
        // })
        let resultsArr = getArrOfAppendixEntriesObjs(Appendix())
        // console.log(locationsArr);
        clearList();
        let resultNum = setList(resultsArr.filter(term => {
            
            return term.name.toLowerCase().includes(value);
        }), useResultLimit)

        if (resultNum > 10) {
            showAllButton.style.visibility = 'visible';
        }
    } else {
        clearList();
    }

});

clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearList();
    searchValStored = ''; 
    showAllButton.style.visibility = 'hidden';
    toggleResultsLimit();
       
});

function setList(results, useResultLimit) {
    var abbrevResults;
    if (useResultLimit && results.length > 10) {
       abbrevResults = results.slice(0, 10);
    } else {
        abbrevResults = results;
    }

    for (let term of abbrevResults) {
        const resultItem = document.createElement('li');
        let text;
        resultItem.classList.add('result-item');
        resultItem.setAttribute('value', term.name + '|' + term.info);

        text = document.createTextNode(term.name);

        resultItem.append(text);
        list.append(resultItem);

        resultItem.addEventListener('click', (e) => {
            renderSelectedTerm(e);
        });
    }

    if (results.length === 0 ){
        noResults();
    };

    return results.length;
}

showAllButton.addEventListener('click', toggleResultsLimit);

function toggleResultsLimit() {

    //toggle shaded background color
    //toggle words (show all terms => shorten term list)
    

    if (useResultLimit) {
        useResultLimit = false;
        showAllButton.innerHTML = "Shrink Terms List";
        showAllButton.classList.toggle("full-list");

    } else {
        useResultLimit = true;
        showAllButton.innerHTML = "Show All Terms";
        showAllButton.classList.toggle("full-list");
    }

    valFromStored = searchValStored;

    if (valFromStored.trim()){
        value = valFromStored.trim().toLowerCase();


        let resultsArr = getArrOfAppendixEntriesObjs(Appendix());
        
        clearList();
        setList(resultsArr.filter(term => {

            return term.name.toLowerCase().includes(value);
        }), useResultLimit);
    }
}

function noResults(){
    const error = document.createElement('li');
    error.classList.add('error-message');

    const text = document.createTextNode('No results found. Sorry!');
    error.append(text);
    list.append(error);
}

function clearList(e) {
    list.innerHTML = "";
    resultsDefinition.style.display = "none";
}

function renderSelectedTerm(e) {
    let nameFromSplit, infoFromSplit;
    if (e.target) {
        let termAtr = e.target.getAttribute('value');
        let termArr = termAtr.split('|');
        nameFromSplit = termArr[0];
        infoFromSplit = termArr[1];        
    };

    searchName.innerHTML = nameFromSplit;
    searchInfo.innerHTML = infoFromSplit;
    resultsDefinition.style.display = "flex";

}

function getArrOfAppendixEntriesObjs(appendix) {
    let entriesArr = [];

    let topicsArr = Object.keys(appendix);
    
    topicsArr.forEach((topic, index) => {
        if (topic + "" == "cultures") {
            let subTopicsArr = Object.keys(appendix[topic]);

            subTopicsArr.forEach((subTopic, index) => {

                Object.keys(appendix[topic][subTopic]).forEach((key, index) => {
                    let entry = Appendix()[topic][subTopic][key];
                    entriesArr.push(entry);
                 })
                    
            });


        } else {
            Object.keys(appendix[topic]).forEach((key, index) => {
                let entry = Appendix()[topic][key];
                entriesArr.push(entry);
            })
        }
    });

    console.log("ENTRIESARR",entriesArr);
    return entriesArr;
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
            granemore: {
                name: "Granemore",
                info: "Description Coming Soon.."
            },
            honedao: {
                name: "Shichi Honedao",
                info: "Description Coming Soon.."
            },
            innisfjalmor: {
                name: "Innisfjalmor",
                info: "The name given the island by its human inhabitants. It translates to 'Isle of Fell Dragons'. This is the island on which the campaign begins."
            },
            kemwei: {
                name: "Kemwei Forest",
                info: "Description Coming Soon.."
            },
            luanpeir: {
                name: "Luanpeir",
                info: "Description Coming Soon.."
            },
            vassaNathair: {
                name: "Inheritor City of Vassa Nathair",
                info: "The capital city of the Human, Tiefling, and Orc territories on Innisfjalmor."
            },
            seascape: {
                name: "Seascape Port",
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
         
        cultures: {
            human: {
                mannach: {
                    name: "Mannach",
                    info: "An order of warrior monks dedicated to the human gods."
                },
                fianmannach: {
                    name: "Fianmannach",
                    info: "Coming Soon.."
                },
                soldiersToTheSea: {
                    name: "Soldiers to the Sea",
                    info: "A popular folk song about war. A lament for fallen men, and a metaphor for the journey to the sea representing a soldier's acceptance and embracing of his death."
                },
            },
            elf: {
                kojimeling: {
                    name: "Kojimeling",
                    info: "The name given to the island by its Elven inhabitants. In Old Elvish, it translates to “Island of First Elves."
                },
                rohyarzhe: {
                    name: "Rohyarzhe",
                    info: "Not representative of any single organization, this name is used colloquially to refer to any Elven group large or small, that stands athwart the new world, and seeks a return to days of Elvish independence."
                },
            },
            dwarf: {
                hrothgar: {
                    name: "Hrothgar",
                    info: "The dwarven creator-god who formed the earth and the dwarven people."
                },
                durgarn: {
                    name: "Durgarn",
                    info: "Rhünedâr's pony. His name means 'dragon' in dwarvish."
                },
            },
            misc: {
                macmillan: {
                    name: "Ole MacMillan",
                    info: "A mysterious figure who leads a mythical hare-hunt over the moors of Granemoor. He is said to lure young men out to join his endless hunt with enchanted music."
                },
                dustSweets: {
                    name: "Dust Sweets",
                    info: "A powerful narcotic and drug of choice on the island. It's developed by grinding to dust the bones of Tuasith or Aos Dannan, concentrating them with heat and pressure, and mixing it with the right amount of the Higanbana flower."
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
            fellDragons: {
                name: "Fell Dragons",
                info: "Description Coming Soon.."
            },

        }
    };

    sortAlphabetically(appendix);


    return appendix;
}

function sortAlphabetically(appendix) {
    let topicsArr = Object.keys(appendix);
    
    topicsArr.forEach((topic, index) => {
        if (topic + "" == "cultures") {
            let subTopicsArr = Object.keys(appendix[topic]);

            subTopicsArr.forEach((subTopic, index) => {

                let sortedSubTopic = Object.keys(appendix[topic][subTopic])
                    .sort()
                    .reduce((acc, key) => ({
                        ...acc, [key]: appendix[topic][subTopic][key]
                    }), {})

                appendix[topic][subTopic] = sortedSubTopic;
            });


        } else {
            let sortedTopic = Object.keys(appendix[topic])
                .sort()
                .reduce((acc, key) => ({
                    ...acc, [key]: appendix[topic][key]
                }), {})

            appendix[topic] = sortedTopic;
        }
    });
    
}