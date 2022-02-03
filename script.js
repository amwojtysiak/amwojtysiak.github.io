
const monTypeArr = ["Gold", "Silver", "Copper"];
const genderArr = ['Male', 'Female'];
const raceArr = ['Human', 'Human', 'Tiefling', 'Tiefling', 'Orc', 'Orc', 'Half Hum/Tief', 'Half Tief/Hum', 'Half Orc/Hum', 'Half Orc/Tief'];
const heightArr = ['Tiny', 'Short', 'Short', 'Short', 'Average', 'Average', 'Average', 'Average', 'Tall', 'Tall', 'Tall', 'Gigantic'];
const ageArr = ['Child', 'Teen', 'Young Adult', 'Young Adult', 'Adult', 'Adult', 'Adult', 'Late Adulthood', 'Elder'];
const weightArr = ['Skeletal', 'Skinny', 'Skinny', 'Skinny', 'Slim', 'Slim', 'Slim', 'Average', 'Average', 'Average', 'Average', 'Overweight', 'Overweight'];
const hairArr = ['Short', 'Medium', 'Long'];
const facialHairArr = ['Clean-Shaven', 'Clean-Shaven', 'Clean-Shaven', 'Stubble', 'Stubble', 'Stubble', 'Trimmed', 'Trimmed', 'Trimmed', 'Full-Beard', 'Full-Beard', 'Full-Beard', 'Thick-Beard', 'Thick-Beard', 'Huge-Beard'];
const clothesArr = ['Dirt-Poor', 'Dirt-Poor', 'Dirt-Poor', 'Poor', 'Poor', 'Poor', 'Average', 'Average', 'Average', 'Middle-Class', 'Middle-Class', 'Middle-Class', 'Wealthy', 'Wealthy', 'Rich'];


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

//NPC GENERATOR

let npcDisplayField = document.querySelector("#ranNpcGen");
let npcButton = document.querySelector("#randomNpcButton");

let npcDescriptorObj = {
    gender: "Male",
    race: "Human",
    height: "Average",
    age: "Adult",
    weight: "Average",
    hair: "Medium",
    facialHair: "Trimmed",
    clothes: "Middle-class",
    randomize: fillDescriptorObj
};

function generateRandomDescriptor(descriptorArr) {
    let rNum = randomNum(descriptorArr.length);
    let randomDescriptor = descriptorArr[rNum];
    
    return randomDescriptor;
}

function fillDescriptorObj() {
    this.gender = generateRandomDescriptor(genderArr).toUpperCase();
    this.race = generateRandomDescriptor(raceArr).toUpperCase();
    this.height = generateRandomDescriptor(heightArr).toUpperCase();
    this.age = generateRandomDescriptor(ageArr).toUpperCase();
    this.weight = generateRandomDescriptor(weightArr).toUpperCase();
    this.hair = generateRandomDescriptor(hairArr).toUpperCase();
    this.clothes = generateRandomDescriptor(clothesArr).toUpperCase();
    if (this.gender == 'MALE' && this.age != 'CHILD' && this.age != 'TEEN') {
        this.facialHair = generateRandomDescriptor(facialHairArr).toUpperCase();
    } else {
        this.facialHair = 'NONE'
    }
}

function populateNpcField() {
    npcDescriptorObj.randomize();
    npcDisplayField.innerHTML = "Race:  " + npcDescriptorObj.race + "<br>" + "Gender:  " + npcDescriptorObj.gender + "<br>" +
        "Height:  " + npcDescriptorObj.height + "<br>" + "Age:  " + npcDescriptorObj.age + "<br>" +
        "Clothes:  " + npcDescriptorObj.clothes + "<br>" + "Weight:  " + npcDescriptorObj.weight + "<br>" + 
        "Hair:  " + npcDescriptorObj.hair + "<br>" + "FacialHair:  " + npcDescriptorObj.facialHair;
}

npcButton.addEventListener('click', populateNpcField);

//Menu Navigation
var menuHome = document.querySelector("#go-to-home");
var menuLoot = document.querySelector("#go-to-lootgen");
var menuNpc = document.querySelector("#go-to-npcgen");
var menuMap = document.querySelector("#go-to-map");


menuHome.addEventListener("click", () => window.open("./index.html", "_self" ));
menuLoot.addEventListener("click", () => window.open("./lootGenerator.html", "_self"));