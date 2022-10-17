var islandMap = document.querySelector(".map-container"),
    mapPoint = document.getElementsByClassName("map-point"),
    mapPointText = document.getElementsByClassName("map-point-text");


const islandInfo = {
    dahlduhn: ["Dahlduhn Village", "A small dwarven village northwest of Seascape Port. It's primary exports are tools and weapons made by the dwarven smiths in the town. Not much is known about the culture and political standing of the dwarves who populate Dahlduhn Village. It is notable only for being the birthplace of the dwarf Rhünedâr."],
    honedao: ["Shichi Honedao", "Description Coming Soon.."],
    kemwei: ["Kemwei Forest", "Description Coming Soon.."],
    luanpeir: ["Luanpeir", "Description Coming Soon.."],
    seascape: ["Seascape Port", "Description Coming Soon.."],
    vassaNathair: ["Inheritor City of Vassa Nathair", "Description Coming Soon.."]
}

function zoomIn() {
    
    var currWidth = islandMap.clientWidth;
    
    islandMap.style.minWidth = 1173 + "px";
    islandMap.style.width = 1173 + "px";

    islandMap.style.minHeight = 1563 + "px";
    islandMap.style.height = 1563 + "px";

    for (let i = 0; i < mapPoint.length; i++) {
        
        mapPoint[i].style.fontSize = 4 + "em";
    };

    for (let i = 0; i < mapPointText.length; i++) {
        
        mapPointText[i].style.fontSize = 18 + "px";
    };
    
    //mapPoint.style.fontSize = 4 + "em";
    //mapPointText.style.fontSize = 18 + "px";
    console.log("zoomin");
}

function zoomOut() {
    var currWidth = islandMap.clientWidth;

    islandMap.style.minWidth = 500 + "px";
    islandMap.style.width = 500 + "px";

    islandMap.style.minHeight = 700 + "px";
    islandMap.style.height = 700 + "px";

    for (let i = 0; i < mapPoint.length; i++) {
        
        mapPoint[i].style.fontSize = 2 + "em";
    };

    for (let i = 0; i < mapPointText.length; i++) {
        
        mapPointText[i].style.fontSize = 7 + "px";
    };

    
    //mapPoint.style.fontSize = 3 + "em";
    //mapPointText.style.fontSize = 12 + "px";
    console.log("zoomout");
}

const modal = document.querySelector(".city-modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const modalTitle = document.querySelector(".city-name-modal");
const modalText = document.querySelector(".city-description-modal");


function toggleModal(event) {
    
    if (!modal.classList.contains("show-modal")) {
        let locName = event.target.getAttribute("value");
        let storageObj = islandInfo[locName];
   
        modalTitle.innerHTML = storageObj[0];
        modalText.innerHTML = storageObj[1];
    }
    
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {  

    if (event.target === modal) {
        toggleModal();
    }
}

for (let i = 0; i < mapPoint.length; i++) {
        
    mapPoint[i].addEventListener("click", toggleModal);
};

for (let i = 0; i < mapPointText.length; i++) {
    
    mapPointText[i].addEventListener("click", toggleModal);
};

//trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);