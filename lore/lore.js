document.querySelector('.open-gloss').addEventListener("click", openGlossary);
document.querySelector('#locations-tab').addEventListener("click", () => {displayTopic('locations')});
document.querySelector('#characters-tab').addEventListener("click", () => {displayTopic('characters')});


function openGlossary() {
    let titlePage = document.querySelector('.title-page');
    titlePage.style.display = "none";

    let glossPage = document.querySelector('.glossary-page-locations');
    glossPage.style.display = "flex";

    let glossHead = document.querySelector('.glossary-head');
    glossHead.style.display = "flex";

    displayTopic('locations');
}

// function displayLocations() {
//     let locations = Appendix().locations;
//     let glossLoc = document.querySelector(".glossary-page-locations")

//     for (let loc in locations) {
//         let name = locations[loc].name;
//         let info = locations[loc].info;

//         glossLoc.innerHTML +=
//             "<div class='term-box'>" +
//                 "<div class='word-name'>" +
//                         "<h2 class='term'>"+name+" -</h2>" +
//                 "</div>" +
//                 "<div class='word-description'>" +
//                         "<p class='term-description'>"+info+"</p>" +
//                 "</div>" +
//             "</div> <br/> <br/>";
        
//     }
// }

function displayTopic(topic) {
    let topicObj = Appendix()[topic];
    let glossLoc = document.querySelector(".glossary-page-locations");
    glossLoc.innerHTML = "";

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
                info: "A dwarf from dahlduhn village. He is a barbarian class and favors a warhammer."
            },

        },
    };

    return appendix;
}