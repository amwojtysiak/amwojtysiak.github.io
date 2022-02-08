
const monTypeArr = ["Gold", "Silver", "Copper"];

function randomNum(maxNum) {
    let getRNum = Math.floor(Math.random() * maxNum);
    return getRNum;
} 

function randomMoneyType() {
    let getRNum = Math.floor(Math.random() * monTypeArr.length);
    let ranMonType = monTypeArr[getRNum];
    return ranMonType;
}


function randomMoneyGenerate(maxNum) {
    let monAmount = randomNum(maxNum);
    let monTypeString = randomMoneyType();
    let finalString = monAmount + " " + monTypeString;

    return finalString;
}

function fillDisplayfield() {
    document.getElementById("tierMonGen").innerHTML = randomMoneyGenerate(100);
}

document.getElementById("randomMoneyButton").addEventListener("click", fillDisplayfield);



let sizes = ['tiny', 'small', 'medium', 'large', 'hoard'];
let size_amounts = {
    tiny: {
        min: 1,
        max: 6
    },
    small: {
        min: 1,
        max: 16
    },
    medium: {
        min: 15,
        max: 36
    },
    large: {
        min: 25,
        max: 101
    },
    hoard: {
        min: 50,
        max: 101
    }
}

function getRandomNumFromSize(sizeOfMoney) {
    let min = size_amounts[sizeOfMoney].min;
    let max = size_amounts[sizeOfMoney].max;
    let diff = max - min;

    let rand = Math.floor(Math.random()*diff) + min;
    return rand;
}

sizes.forEach(function(size) {
    let callRandomNumFromSize = function() {
        let rand = getRandomNumFromSize(size);
        let typeText = "Gold";
        if (size == "tiny") {
            typeText = randomMoneyType();
        }
        document.querySelector('#tierMonGen').innerHTML = rand + " " + typeText;
    }

    document.querySelector('[data-size="'+size+'"]').addEventListener('click', callRandomNumFromSize);
})


//Menu Navigation
var menuHome = document.querySelector("#go-to-home");
var menuLoot = document.querySelector("#go-to-lootgen");
var menuNpc = document.querySelector("#go-to-npcgen");
var menuMap = document.querySelector("#go-to-map");
var menuJournal = document.querySelector("#go-to-journal");
var menuLore = document.querySelector("#go-to-lore");

menuHome.addEventListener("click", () => window.open("../../index.html", "_self"));
menuLoot.addEventListener("click", () => window.open("./lootGenerator.html", "_self"));
menuNpc.addEventListener("click", () => window.open("../npc/npcGenerator.html", "_self"));
menuJournal.addEventListener("click", () => window.open("../../journal/journal.html", "_self"));