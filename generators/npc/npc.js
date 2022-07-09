const genderArr = ['Male', 'Female'];
const raceArr = ['Human', 'Human', 'Tiefling', 'Tiefling', 'Orc', 'Orc', 'Half Hum/Tief', 'Half Tief/Hum', 'Half Orc/Hum', 'Half Orc/Tief'];
const heightArr = ['Tiny', 'Short', 'Short', 'Short', 'Average', 'Average', 'Average', 'Average', 'Tall', 'Tall', 'Tall', 'Gigantic'];
const ageArr = ['Child', 'Teen', 'Young Adult', 'Young Adult', 'Adult', 'Adult', 'Adult', 'Late Adulthood', 'Elder'];
const weightArr = ['Skeletal', 'Skinny', 'Skinny', 'Skinny', 'Slim', 'Slim', 'Slim', 'Average', 'Average', 'Average', 'Average', 'Overweight', 'Overweight'];
const hairArr = ['Short', 'Medium', 'Long'];
const facialHairArr = ['Clean-Shaven', 'Clean-Shaven', 'Clean-Shaven', 'Stubble', 'Stubble', 'Stubble', 'Trimmed', 'Trimmed', 'Trimmed', 'Full-Beard', 'Full-Beard', 'Full-Beard', 'Thick-Beard', 'Thick-Beard', 'Huge-Beard'];
const clothesArr = ['Dirt-Poor', 'Dirt-Poor', 'Dirt-Poor', 'Poor', 'Poor', 'Poor', 'Average', 'Average', 'Average', 'Middle-Class', 'Middle-Class', 'Middle-Class', 'Wealthy', 'Wealthy', 'Rich'];
const fNameMaleArr = ['Austi', 'Bragi', 'Braka', 'Brobek', 'Brulin', 'Coalak', 'Dagurt', 'Digroi', 'Eiki', 'Eilivur', 'Floki', 'Frostar', 'Fundar', 'Gogu', 'Gremin', 'Gusak', 'Heptin', 'Horar', 'Hungus', 'Ingivald', 'Jodis', 'Killin', 'Lipith', 'Lofar', 'Malok', 'Noi', 'Oddfinnur', 'Prodos', 'Ragriel', 'Randil', 'Rotnam', 'Salvor', 'Slyvek', 'Throar', 'Toki', 'Virfi', 'Voggur', 'Withil', 'Zazfa'
];
const fNameFemaleArr = ['Amerstal', 'Aqrilla', 'Bellesta', 'Bonnwynn', 'Brilbelle', 'Chalia', 'Daernip', 'Devella', 'Dimlinn', 'Edmyla', 'Erthel', 'Fada', 'Gembelle', 'Ithi', 'Jaderyn', 'Jinvia', 'Kezda', 'Kystal', 'Lija', 'Minelle', 'Misi', 'Misma', 'Mistmael', 'Mysris', 'Nalra', 'Narvari', 'Pondral', 'Ragna', 'Saphil', 'Sola', 'Soldelle', 'Tazlen', 'Tisnip', 'Tisthel', 'Tiznys', 'Vinelle', 'Wiska', 'Wispmaral', 'Yrsa', 'Ygritte', 'Zika'];
const lNameArr = ['Amana', 'Barlowe', 'Caddel', 'Fox', 'Francis', 'Hart', 'Hendrix', 'Katz', 'Laurier', 'Madden', 'Sai', 'Villarreal', 'Viotto', 'Abraham', 'Ashford', 'Benjamin','Boone', 'Elrod', 'Frederick', 'Hale', 'Langston', 'Levisay', 'McElfresh', 'Trevino', 'Whitlock', 'Yarbrough', 'Amos', 'Beam', 'Dash', 'Duke', 'Fleet', 'Jian', 'Moses', 'Pierce', 'Remington', 'Sharp', 'Singh', 'Stallard', 'West', 'Abernathy', 'Cornelius', 'Crawford', 'Cunningham', 'Driscoll', 'Ellis', 'Finch', 'Menken', 'Ninomae', 'Simmons', 'Undergrove', 'Vandenberg', 'Webb', 'Abednego', 'Cyprus', 'Dagon', 'Damaris', 'Einar', 'Festus', 'Gallio', 'Griffin', 'Kami', 'Lightfoot', 'Luna', 'Priestley', 'Sierra', 'Aberra', 'Agapov', 'Albertine', 'Angelo', 'Cherith', 'Desai', 'Godfrey', 'Greathouse', 'Knight', 'Lozano', 'Luz', 'Prince', 'Rossi', 'Alastair', 'Aphelion', 'Callisto', 'Chrysalis', 'Furi', 'Gibbethon', 'Gregorios', 'Nadir', 'Omega', 'Sapphirus', 'Silvius', 'Umbra', 'Zibia'];


//TODO: Add First and last name, make last name delete from array when used, make alert if last name arr is low


let npcDisplayField = document.querySelector("#ranNpcGen");
let npcButton = document.querySelector("#randomNpcButton");

let npcDescriptorObj = {
    fName: "Bilbo",
    lName: "Baggins",
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
//Gender Specific
    if (npcDescriptorObj.gender === "FEMALE") {
        this.fName = generateRandomDescriptor(fNameFemaleArr).toUpperCase();
    } else {
        this.fName = generateRandomDescriptor(fNameMaleArr).toUpperCase();
    }

    this.lName = generateRandomDescriptor(lNameArr).toUpperCase();
    
}

function populateNpcField() {
    npcDescriptorObj.randomize();
    npcDisplayField.innerHTML = "Name:  " + npcDescriptorObj.fName + " " + npcDescriptorObj.lName + "<br>" + "Race:  " + npcDescriptorObj.race + "<br>" + "Gender:  " + npcDescriptorObj.gender + "<br>" +
        "Height:  " + npcDescriptorObj.height + "<br>" + "Age:  " + npcDescriptorObj.age + "<br>" +
        "Clothes:  " + npcDescriptorObj.clothes + "<br>" + "Weight:  " + npcDescriptorObj.weight + "<br>" + 
        "Hair:  " + npcDescriptorObj.hair + "<br>" + "FacialHair:  " + npcDescriptorObj.facialHair;
}

npcButton.addEventListener('click', populateNpcField);

