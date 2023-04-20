//Add spell Favorites indexes here
var spellFavorites = [
    "bane",
    "charm-person",
    "cure-wounds",
    "invisibility",
    "thunderwave"
];


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
