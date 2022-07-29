
//Modify Character Stats
var byronHP = 21, byronAC = 13;
var rhunedarHP = 35, rhunedarAC = 12;
var gabrielHP = 18, gabrielAC = 13;
var ronanHP = 20, ronanAC = 20;
//Modify Character HP

const characters = {
    Byron: {
        fName: "Byron",
        lName: "Blackford",
        health: byronHP,
        armorClass: byronAC,
        turnNumber: 4,
        get turn() {return this.turnNumber},
        set nextTurn(val) {
            if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + 1;
            this.turnNumber = this.turnNumber - val;
        },
        set addHP(val) {
            this.health = this.health + val;
        },
        set takeDMG(val) {
            this.health = this.health - val;
        },
        fullName: function(){this.fName + " " + this.lName}
    },
    Gabriel: {
        fName: "Gabriel",
        lName: "Kamban",
        health: gabrielHP,
        armorClass: gabrielAC,
        turnNumber: 2,
        get turn() {return this.turnNumber},
        set nextTurn(val) {
            if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + 1;
            this.turnNumber = this.turnNumber - val;
        },
        set addHP(val) {
            this.health = this.health + val;
        },
        set takeDMG(val) {
            this.health = this.health - val;
        },
        fullName: function(){this.fName + " " + this.lName}
    },
    Rhunedar: {
        fName: "Rhunedar",
        lName: "",
        health: rhunedarHP,
        armorClass: rhunedarAC,
        turnNumber: 1,
        get turn() {return this.turnNumber},
        set nextTurn(val) {
            if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + 1;
            this.turnNumber = this.turnNumber - val;
        },
        set addHP(val) {
            this.health = this.health + val;
        },
        set takeDMG(val) {
            this.health = this.health - val;
        },
        fullName: function(){this.fName + " " + this.lName}
    },
    Ronan: {
        fName: "Ronan",
        lName: "",
        health: ronanHP,
        armorClass: ronanAC,
        turnNumber: 3,
        get turn() {return this.turnNumber},
        set nextTurn(val) {
            if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + 1;
            this.turnNumber = this.turnNumber - val;
        },
        set addHP(val) {
            this.health = this.health + val;
        },
        set takeDMG(val) {
            this.health = this.health - val;
        },
        fullName: function() {this.fName + " " + this.lName}
    }
};

var turnOrderObj = {};

// console.log(characters.Ronan.nextTurn = 1);
// console.log(characters.Ronan.turnNumber);

function arrangeTurnOrder (characters, turnOrderObj) {
    let characterTotal = Object.keys(characters).length;

    let i = 1;
    while (i <= characterTotal) {
       
        let keysA = Object.keys(characters);
        keysA.forEach((key, index) => {
            let orderNum = characters[key].turnNumber;
            if (orderNum == i) {
                turnOrderObj["c" + i] = characters[key].fName;
            }
        });
        i++;
    };


    return turnOrderObj;
}


function defaultCharacterList() {
    orderObj = arrangeTurnOrder(characters, turnOrderObj);
    let listHTML;
    let namesArr = Object.values(orderObj);
    let namesArrAdjusted = [];

    namesArr.forEach((val, index, arr) => {
        let numberedVal;
        if (index == 0) {
            val += " <br> ";
            numberedVal = `${index + 1}. `+ val;
            namesArrAdjusted.push(numberedVal);
        } else if (index != arr.length - 1 && index != 0) {
            val += " <br> " 
            numberedVal = `${index + 1}. `+ val;
            namesArrAdjusted.push(numberedVal);
        } else if(index == arr.length - 1) {
            numberedVal = `${index + 1}. `+ val;
            namesArrAdjusted.push(numberedVal);
        }
    });

    listHTML = namesArrAdjusted.toString();
    let listHTMLFinal = listHTML.replace(/,/g, "")
    
    currentFirst = turnOrderObj.c1;


    document.getElementById("current-characters").innerHTML = listHTMLFinal;
    document.getElementById("cFName").innerHTML = characters[currentFirst].fName;
    document.getElementById("cLName").innerHTML = characters[currentFirst].lName;
    document.getElementById("cHP").innerHTML = characters[currentFirst].health;
    document.getElementById("cAC").innerHTML = characters[currentFirst].armorClass;
    // document.getElementById("cInitiative").innerHTML = characters[currentFirst].turnNumber;

}

defaultCharacterList();

document.getElementById("start-next-turn").addEventListener('click', nextTurn);
document.getElementById("health-button").addEventListener('click', addHealth);
document.getElementById("damage-button").addEventListener('click', takeDamage);


function nextTurn() {
    console.log("next turn");

    characters.Byron.nextTurn = 1;
    characters.Gabriel.nextTurn = 1;
    characters.Rhunedar.nextTurn = 1;
    characters.Ronan.nextTurn = 1;

    defaultCharacterList();
};

function takeDamage() {
    console.log("Took Damage");

    if (characters.Byron.turnNumber == 1) characters.Byron.takeDMG = 1;
    if (characters.Gabriel.turnNumber == 1) characters.Gabriel.takeDMG = 1;
    if (characters.Rhunedar.turnNumber == 1) characters.Rhunedar.takeDMG = 1;
    if (characters.Ronan.turnNumber == 1) characters.Ronan.takeDMG = 1;


    defaultCharacterList();
};

function addHealth() {
    console.log("Added Health");

    if (characters.Byron.turnNumber == 1) characters.Byron.addHP = 1;
    if (characters.Gabriel.turnNumber == 1) characters.Gabriel.addHP = 1;
    if (characters.Rhunedar.turnNumber == 1) characters.Rhunedar.addHP = 1;
    if (characters.Ronan.turnNumber == 1) characters.Ronan.addHP = 1;

    defaultCharacterList();
}

// if (localStorage.characters === undefined) {

// }