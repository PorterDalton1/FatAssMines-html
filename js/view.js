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

class AssSweeper {
    constructor(length, width, mines) {
        this.length = length;
        this.width = width;
        this.numberOfMines = mines;
        this.mines = this.makeMines();
        this.makeCells();
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.length; y++) {
            cells[y] = [];
            for (let x = 0; x < this.width; x++) {
                tmpButton = document.createElement('button');
                tmpButton.id = x + ',' + y;
                tmpButton.setAttribute('onclick', 'this.changeVisual(' + x + ','+ y + ')');
                document.getElementById('board').appendChild(tmpButton);
            }
        }
        
    }

    makeMines(mines) {
        let mines = [];
        for (let i = 0; i < this.numberOfMines; i++) {
            let x = Math.floor(Math.random() * this.length);
            let y = Math.floor(Math.random() * this.width);
            while (isSubArray(mines, [[x, y]])) {
                x = Math.floor(Math.random() * this.length);
                y = Math.floor(Math.random() * this.width);
            }
            mines.push([x, y]);
        }
        return mines;
    }

    changeVisual(x, y){
        document.getElementById(x + ',' + y).style.backgroundColor = 'blue';
    }

};

x = AssSweeper(16, 30, 99);
x.makeCells();