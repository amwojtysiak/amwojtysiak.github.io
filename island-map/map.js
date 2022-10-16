var islandMap = document.querySelector(".map-container"),
    mapPoint = document.getElementsByClassName("map-point"),
    mapPointText = document.getElementsByClassName("map-point-text");


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