function changeVisual(x, y){
    console.log(x);
    console.log(y);
    console.log('--------------------------------')
}

function makeCells(length, width) {
    let cells = [];
    for (let y = 0; y < length; y++) {
        cells[y] = [];
        for (let x = 0; x < width; x++) {
            tmpButton = document.createElement('button');
            tmpButton.setAttribute('onclick', 'changeVisual(' + x + ','+ y + ')');
            document.getElementById('board').appendChild(tmpButton);
        }
    }
    
}

makeCells(16, 30);