
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


function arrangeTurnOrder (characters, turnOrderObj) {
    // turnOrderObj = {};
    let characterTotal = Object.keys(characters).length;
    
    let i = 1;
    while (i <= characterTotal) {
       
        let keysA = Object.keys(characters);
        
        keysA.forEach((key, index) => {
            let orderNum = characters[key].turnNumber;
            if (orderNum == i) {
                turnOrderObj["c" + i] = characters[key].fName;
            };
        });
        i++;
    };

    console.log(turnOrderObj)
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

    let keysA = Object.keys(characters);
    let quarterhealth;    

    keysA.forEach((key, index) => {

        if (characters[key].turnNumber == 1) {
            quarterhealth = Math.floor(characters[key].originalHealth * .25)

            if (characters[key].health <= quarterhealth) {
                document.getElementById("health-stat").style.color = "red";
                console.log("Low health");
            } else {
                document.getElementById("health-stat").style.color = "black";
                console.log("High health");
            }
        }
    });

};

document.getElementById("initialize-list").addEventListener('click', defaultCharacterList);

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
};

function takeDamage() {
    console.log("Took Damage");

    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        if (characters[key].turnNumber == 1) {
            characters[key].takeDMG = 1;
        };
    });
    console.log(characters);
    defaultCharacterList();
};

function addHealth() {
    console.log("Added Health");

    let keysA = Object.keys(characters);
        
    keysA.forEach((key, index) => {
        if (characters[key].turnNumber == 1) {
            characters[key].addHP = 1;
        };
    });

    defaultCharacterList();
}


//Form submit control
document.getElementById('characterSubmitBtn').onclick = function (e) {
    e.preventDefault();
   
    let characterInputs = document.querySelectorAll("input.charInfo");

    let charNew = new CombatContributor(characterInputs[0].value, characterInputs[1].value, characterInputs[2].value, characterInputs[3].value, characterInputs[4].value);

    characters[charNew.fName] = charNew;

    console.log(characters);

    document.getElementById("character-form").reset();
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

    console.log(characters);

    document.getElementById("party-form").reset();
};
