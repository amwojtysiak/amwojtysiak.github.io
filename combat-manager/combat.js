
//Modify Character Stats
var byronHP = 21, byronAC = 13;
var rhunedarHP = 35, rhunedarAC = 12;
var gabrielHP = 18, gabrielAC = 13;
var ronanHP = 31, ronanAC = 13;
//Modify Character HP

// window.localStorage.clear();

if (localStorage.saveData) {
   var characters = JSON.parse(window.localStorage.getItem('saveData'));

   let keysFromSave = Object.keys(characters);
        
    keysFromSave.forEach((key, index) => {

        Object.defineProperty(characters[key], "turn", {
            get : function () {return this.turnNumber}
        });
        Object.defineProperty(characters[key], "fullName", {
            get : function () {return this.fName + " " + this.lName}
        });
        Object.defineProperty(characters[key], "setInitiative", {
            set : function (val) {this.turnNumber = val}
        });
        Object.defineProperty(characters[key], "nextTurn", {
            set : function (val) {
                if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + val;
                this.turnNumber = this.turnNumber - val;
            }
        });
        Object.defineProperty(characters[key], "addHP", {
            set : function (val) {this.health = this.health + val}
        });
        Object.defineProperty(characters[key], "takeDMG", {
            set : function (val) {this.health = this.health - val}
        });
    });

} else {
    var characters = {};
};


// const characters = {
//     Rhunedar: {
//         fName: "Rhunedar",
//         lName: "",
//         health: rhunedarHP,
//         armorClass: rhunedarAC,
//         turnNumber: 3,
//         get turn() {return this.turnNumber},
//         set nextTurn(val) {
//             if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + 1;
//             this.turnNumber = this.turnNumber - val;
//         },
//         set addHP(val) {
//             this.health = this.health + val;
//         },
//         set takeDMG(val) {
//             this.health = this.health - val;
//         },
//         fullName: function(){this.fName + " " + this.lName}
//     },
    
// };

var turnOrderObj = {};

// Buttons to save and delete local storage data
document.getElementById('save-button').addEventListener('click', function () {
    window.localStorage.setItem("saveData", JSON.stringify(characters));
    console.log("Data saved");
});

document.getElementById('clear-button').addEventListener('click', function () {
    window.localStorage.clear();
    console.log("Data Erased");
    location.reload();
})

//Character Object Constructor
function CombatContributor(firstName, lastName, hp, ac, turnOrder) {
    this.fName = firstName;
    this.lName = lastName;
    this.health = hp;
    this.armorClass = ac;
    this.turnNumber = turnOrder;
    this.originalHealth = hp;
}
Object.defineProperty(CombatContributor.prototype, "turn", {
    get : function () {return this.turnNumber}
});
Object.defineProperty(CombatContributor.prototype, "fullName", {
    get : function () {return this.fName + " " + this.lName}
});
Object.defineProperty(CombatContributor.prototype, "setInitiative", {
    set : function (val) {this.turnNumber = val}
});
Object.defineProperty(CombatContributor.prototype, "nextTurn", {
    set : function (val) {
        if (this.turnNumber == 1) this.turnNumber = Object.keys(characters).length + val;
        this.turnNumber = this.turnNumber - val;
    }
});
Object.defineProperty(CombatContributor.prototype, "addHP", {
    set : function (val) {this.health = this.health + val}
});
Object.defineProperty(CombatContributor.prototype, "takeDMG", {
    set : function (val) {this.health = this.health - val}
});


function arrangeTurnOrder(characters, turnOrderObj, isFirstArrangement) {
    let initiativeArr = [];

    for (let char in characters) {
        initiativeArr.push({
            name: characters[char].fName,
            init: characters[char].turnNumber
        });
    }

    initiativeArr = handleInitTies(initiativeArr); //handle tie fxn
    if (isFirstArrangement) {
        initiativeArr = initiativeArr.sort((a, b) => b.init - a.init);
    } else {
        initiativeArr = initiativeArr.sort((a, b) => a.init - b.init); // was a.init - b.init which reversed orders
    }
    for (let i=1; i<=initiativeArr.length; i++) {
        let orderNum = initiativeArr[i-1];
        turnOrderObj["c" + i] = orderNum.name;
        characters[orderNum.name].turnNumber = i;
    }

    console.log(turnOrderObj);
    return turnOrderObj;
}
//TESTING
// function arrangeTurnOrderFirst(characters, turnOrderObj) {
//     let initiativeArr = [];
// 

//     for (let char in characters) {
//         initiativeArr.push({
//             name: characters[char].fName,
//             init: characters[char].turnNumber
//         });
//     }

// 
//     initiativeArr = handleInitTies(initiativeArr); //handle tie fxn
// 
//     initiativeArr = initiativeArr.sort((a, b) => b.init - a.init); // was a.init - b.init which reversed orders
// 
//     for (let i=1; i<=initiativeArr.length; i++) {
//         let orderNum = initiativeArr[i-1];
//         turnOrderObj["c" + i] = orderNum.name;
//         characters[orderNum.name].turnNumber = i;
//     }

//     console.log(turnOrderObj);
//     return turnOrderObj;
// }
//TESTING

function handleInitTies(initArr) {
    let initNums = [];
    
    for (let i=0; i<initArr.length; i++) {
        initNums = [];
        for (let n=0; n<initArr.length; n++) {
            if (n != i) initNums.push(Math.floor(Number(initArr[n].init))); 
        };
        let match = initNums.includes(Number(initArr[i].init));
        
        if (match) {
            let randomDecimal = Math.random();
            initArr[i].init = Number(initArr[i].init) + Number(randomDecimal);
        } else {
            initArr[i].init = Number(initArr[i].init);
        }
    }

    return initArr;
}


function defaultCharacterList() {
    let orderObj = arrangeTurnOrder(characters, turnOrderObj);
    let listHTML;
    let namesArr = Object.values(orderObj);
    let namesArrAdjusted = [];

    namesArr.forEach((val, index, arr) => {
        let numberedVal;
        
            numberedVal = `<li id='listItem${val}' class='listHTMLItem' data-key='${val}'>` + val + '</li>';
            namesArrAdjusted.push(numberedVal);
        
    });

    listHTML = namesArrAdjusted.toString();
    let listHTMLNoComma = listHTML.replace(/,/g, "");

    let listHTMLFinal = `<ol id='prelim-char-list'> ${listHTMLNoComma} </ol>`;
    
    currentFirst = turnOrderObj.c1;

    document.getElementById("current-characters").innerHTML = listHTMLFinal;
    document.getElementById("cFName").innerHTML = characters[currentFirst].fName;
    document.getElementById("cLName").innerHTML = characters[currentFirst].lName;
    document.getElementById("cHP").innerHTML = characters[currentFirst].health;
    document.getElementById("cAC").innerHTML = characters[currentFirst].armorClass;

    console.log(currentFirst);
    assessHealth(currentFirst, "left");

    let keysA = Object.keys(characters);
        
        keysA.forEach((key, index) => {
            let charHealthNum = characters[key].health;
            if (charHealthNum <= 0) {
                document.getElementById(`listItem${key}`).style.textDecoration = "line-through";
            };
        });

    makeCharListClickable();

};

document.getElementById("initialize-list").addEventListener('click', () => {
    arrangeTurnOrder(characters, turnOrderObj, true);
    defaultCharacterList();
});

document.getElementById("start-next-turn").addEventListener('click', nextTurn);
document.getElementById("health-button").addEventListener('click', addHealth);
document.getElementById("damage-button").addEventListener('click', takeDamage);


function nextTurn() {
    console.log("next turn");
       
    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        characters[key].nextTurn = 1;

    });

    defaultCharacterList();
    updateCharacterHealth();
};

function takeDamage() {
    let currentHealthChar = document.getElementById("healthFName").innerHTML;
    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        if (characters[key].fName == currentHealthChar) {
            characters[key].takeDMG = 1;
        };
    });

    
    updateCharacterHealth();
    defaultCharacterList();
};

function addHealth() {
    let currentHealthChar = document.getElementById("healthFName").innerHTML;
    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        if (characters[key].fName == currentHealthChar) {
            characters[key].addHP = 1;
        };
    });

    
    updateCharacterHealth();
    defaultCharacterList();
}

function makeCharListClickable() {
    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        document.getElementById(`listItem${key}`).onclick = function (e) {
            manageCharacterHealth(e);
        }
    });
}

// Displays clicked character's stats in Health Manager
function manageCharacterHealth(e) {
    let targetChar = e.target.getAttribute('data-key');

    document.getElementById("healthFName").innerHTML = characters[targetChar].fName;
    document.getElementById("healthLName").innerHTML = characters[targetChar].lName;
    document.getElementById("healthHP").innerHTML = characters[targetChar].health;
    document.getElementById("healthAC").innerHTML = characters[targetChar].armorClass;
    document.getElementById("healthInitiative").innerHTML = characters[targetChar].turnNumber;

    
    assessHealth(targetChar, "middle");
}

// Updates health display after adding HP or taking DMG
function updateCharacterHealth() {
    let targetChar = document.getElementById("healthFName").innerHTML;

    document.getElementById("healthFName").innerHTML = characters[targetChar].fName;
    document.getElementById("healthLName").innerHTML = characters[targetChar].lName;
    document.getElementById("healthHP").innerHTML = characters[targetChar].health;
    document.getElementById("healthAC").innerHTML = characters[targetChar].armorClass;
    document.getElementById("healthInitiative").innerHTML = characters[targetChar].turnNumber;


    assessHealth(targetChar, "middle");
}

//Controls Display effects based on Health amount
function assessHealth(characterControl, healthStatLocation) {
    let keysA = Object.keys(characters);
    let quarterhealth;    

    keysA.forEach((key, index) => {

        if (characters[key].fName == characterControl) {
            quarterhealth = Math.floor(characters[key].originalHealth * .25)

            if (characters[key].health <= 0) {
                document.querySelectorAll(`.character-info-${healthStatLocation}`).forEach(function (value){
                    value.style.color = "red";
                    if (value.style.visibility == 'hidden') value.style.visibility = "visible";
                }); 
            } else if (characters[key].health > 0 ) {
                document.querySelectorAll(`.character-info-${healthStatLocation}`).forEach(function (value){
                    value.style.color = "black";
                    if (value.style.visibility == 'visible') value.style.visibility = "hidden"; 
                }); 
            }

            if (characters[key].health <= quarterhealth) {
                document.getElementById(`health-stat-${healthStatLocation}`).style.color = "red";
                console.log("low health");
            } else {
                document.getElementById(`health-stat-${healthStatLocation}`).style.color = "black";
                console.log("high health");
            };
            
            
        }
    });
}


//Form submit control
document.getElementById('characterSubmitBtn').onclick = function (e) {
    e.preventDefault();
   
    let characterInputs = document.querySelectorAll("input.charInfo");

    let charNew = new CombatContributor(characterInputs[0].value, characterInputs[1].value, characterInputs[2].value, characterInputs[3].value, characterInputs[4].value);

    characters[charNew.fName] = charNew;

    document.getElementById("character-form").reset();
    makePrelimList();
};

document.getElementById('partySubmitBtn').onclick = function (e) {
    e.preventDefault();
   
    let partyInputs = document.querySelectorAll("input.partyInfo");

    let charByron = new CombatContributor("Byron", "Blackford", byronHP, byronAC, partyInputs[0].value);
    let charGabriel = new CombatContributor("Gabriel", "Kamban", gabrielHP, gabrielAC, partyInputs[1].value);
    let charRhunedar = new CombatContributor("Rhunedar", "", rhunedarHP, rhunedarAC, partyInputs[2].value);
    let charRonan = new CombatContributor("Ronan", "", rhunedarHP, rhunedarAC, partyInputs[3].value);

    characters[charByron.fName] = charByron;
    characters[charGabriel.fName] = charGabriel;
    characters[charRhunedar.fName] = charRhunedar;
    characters[charRonan.fName] = charRonan;

    document.getElementById("party-form").reset();
    makePrelimList();
};


//Show added characters

function makePrelimList() {
    
    if (Object.keys(characters).length) {
        prelimCharacters = "";
        let keysA = Object.keys(characters);
        
        keysA.forEach((key, index) => {
            let name = characters[key].fullName;
            let initiativeNum = characters[key].turn;

            prelimCharacters += "<li> " + name + " - Initiative: " + initiativeNum + "</li>";
        });
    } else {
        prelimCharacters = "<li> None Added </li>";
    };

    document.getElementById('characters-preliminary-list').innerHTML = `<ul id='prelim-char-list'> ${prelimCharacters} </ul>`;
}

makePrelimList();
