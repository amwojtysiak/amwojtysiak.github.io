const genderArr = ['Male', 'Female'];
const raceArr = ['Human', 'Human', 'Tiefling', 'Tiefling', 'Orc', 'Orc', 'Half Hum/Tief', 'Half Tief/Hum', 'Half Orc/Hum', 'Half Orc/Tief'];
const heightArr = ['Tiny', 'Short', 'Short', 'Short', 'Average', 'Average', 'Average', 'Average', 'Tall', 'Tall', 'Tall', 'Gigantic'];
const ageArr = ['Child', 'Teen', 'Young Adult', 'Young Adult', 'Adult', 'Adult', 'Adult', 'Late Adulthood', 'Elder'];
const weightArr = ['Skeletal', 'Skinny', 'Skinny', 'Skinny', 'Slim', 'Slim', 'Slim', 'Average', 'Average', 'Average', 'Average', 'Overweight', 'Overweight'];
const hairArr = ['Short', 'Medium', 'Long'];
const facialHairArr = ['Clean-Shaven', 'Clean-Shaven', 'Clean-Shaven', 'Stubble', 'Stubble', 'Stubble', 'Trimmed', 'Trimmed', 'Trimmed', 'Full-Beard', 'Full-Beard', 'Full-Beard', 'Thick-Beard', 'Thick-Beard', 'Huge-Beard'];
const clothesArr = ['Dirt-Poor', 'Dirt-Poor', 'Dirt-Poor', 'Poor', 'Poor', 'Poor', 'Average', 'Average', 'Average', 'Middle-Class', 'Middle-Class', 'Middle-Class', 'Wealthy', 'Wealthy', 'Rich'];




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

function randomNum(maxNum) {
    let getRNum = Math.floor(Math.random() * maxNum);
    return getRNum;
} 

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
menuNpc.addEventListener("click", () => window.open("./npcGenerator.html", "_self"));