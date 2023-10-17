var clickedCells = [];
var cells = [];
var mines = [];
var flags = [];
var firstMove = true;

//God I hate javascript. Thank you ChatGPT for making this for me
function isSubArray(array, arrayOfArrays) {
    for (const subArray of arrayOfArrays) {
      if (arraysAreEqual(array, subArray)) {
        return true;
    }
}
    return false;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
  
    return true;
}


//ChatGPT coming in clutch and I hate javascript. Thank you ChatGPT for making this for me
function countSharedCoordinates(array1, array2) {
    // Create sets to store unique coordinates from each array
    const set1 = new Set(array1.map(coord => JSON.stringify(coord)));
    const set2 = new Set(array2.map(coord => JSON.stringify(coord)));

    // Find the intersection of the two sets
    const sharedCoordinates = new Set([...set1].filter(coord => set2.has(coord)));

    // Return the count of shared coordinates
    return sharedCoordinates.size;
}

function minesNear(x, y) {
    ////////////////////////////////////
    // (x-1, y+1) (x, y+1) (x+1, y+1) //
    // (x-1, y)   (x, y)   (x+1, y)   //
    // (x-1, y-1) (x, y-1) (x+1, y-1) //
    ////////////////////////////////////

    let neighbors = [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1], 
                     [x - 1, y    ],             [x + 1, y    ],
                     [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]];

    return countSharedCoordinates(mines, neighbors);
}

function addFlag(event, x, y) {
    event.preventDefault();
    if (countSharedCoordinates(clickedCells, [[x, y]]) == 1) {
        return 50;
    }
    if (countSharedCoordinates(flags, [[x, y]]) == 1) {
        button.style.backgroundColor = 'white';
        flags = flags.filter(item => item[0]!= x || item[1]!= y);
        return 51;
    }
    button = document.getElementById(x + ',' + y);
    button.style.backgroundColor = 'blue';
    console.log("Flag function was called");
    flags.push([x, y]);
}

function changeCell(x, y){

    if (firstMove === true) {
        let countMe = 0
        while (minesNear(x, y) != 0 || countSharedCoordinates(mines, [[x, y]]) == 1) {
            mines = makeMines(16, 30, 99);
            console.log(countMe + '|| Mines Near: ' + minesNear(x, y));
            countMe++;

        }
        firstMove = false;
    }

    if (countSharedCoordinates(clickedCells, [[x, y]]) == 1) {
        return 112;
    }
    if (!document.getElementById(x + ',' + y)) { //If cell not on board
        return 112;
    }
    if (countSharedCoordinates(flags, [[x, y]]) == 1) {
        return 113;
    }
    button = document.getElementById(x + ',' + y);
    button.style.color = 'black';
    button.style.fontSize = '12pt'
    button.style.fontWeight = 'bold';
    if (countSharedCoordinates(mines, [[x, y]]) == 1) {
        for (let i = 0; i < mines.length; i++) {
            button = document.getElementById(mines[i][0] + ',' + mines[i][1]);
            button.style.backgroundColor = 'red';
        }
        return 114;
    } else if (minesNear(x, y) >= 1) {

        button.textContent = minesNear(x, y);
        let e = minesNear(x, y);
        if (e == 1){
            button.style.color ='blue';
        } else if (e == 2){
            button.style.color ='green';
        } else if (e == 3){
            button.style.color ='red';
        } else if (e == 4){
            button.style.color ='purple';
        } else if (e == 5){
            button.style.color ='darkred';
        } else if (e == 6){
        }
        button.style.backgroundColor = 'transparent';
    } else {
        button.style.backgroundColor = 'transparent';
        let neighbors = [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1], 
                        [x - 1, y    ],             [x + 1, y    ],
                        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]];
        clickedCells.push([x, y]);
        for (let i = 0; i < neighbors.length; i++) {
            changeCell(neighbors[i][0], neighbors[i][1]);
        }
        return 100;
    }


    clickedCells.push([x, y]);
}

function makeCells(length, width) {
    let i = 0;
    cells = [];
    for (let y = 0; y < length; y++) {
        for (let x = 0; x < width; x++) {
            cells[i] = document.createElement('button');
            cells[i].id = x + ',' + y;
            cells[i].setAttribute('onclick', 'changeCell(' + x + ','+ y + ')');
            //cells[i].addEventListener('click', (event) => changeCell(event, x, y));
            cells[i].addEventListener('contextmenu', (event) => addFlag(event, x, y));
            document.getElementById('board').appendChild(cells[i]);
            i += 1;
        }
    }
    
}

function makeMines(length, width, numberOfMines) {
    let mines = [];
    for (let i = 0; i < numberOfMines; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * length);
        while (isSubArray(mines, [[x, y]])) {
            x = Math.floor(Math.random() * length);
            y = Math.floor(Math.random() * width);
        }
        mines.push([x, y]);
    }
    return mines;
}

function main() {
    let length = 16;
    let width = 30;
    let numberOfMines = 99;
    mines = makeMines(length, width, numberOfMines);
    makeCells(length, width);
}

main();