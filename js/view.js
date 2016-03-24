'use strict';

function renderField(startX, startY, destinationX, destinationY, size, matr) {
    var mazeField = document.getElementById('maze');
    mazeField.innerHTML = '';
    var cell, row, itemID;

    for (var i = 0; i < size; i++) {
        row = document.createElement('div');
        row.setAttribute('class', 'row-with-cells')
        for (var j = 0; j < size; j++) {
            cell = document.createElement('div');
            if (matr[i][j].isWall) {
                cell.style.background = '#333';
            };
            if (i === startX && j === startY) {
                cell.setAttribute('class', 'start');
            }
            if (i === destinationX && j === destinationY) {
                cell.setAttribute('class', 'finish');
            }
            cell.id = i + '-' + j; //cell.innerHTML = i + '-' + j;
            row.appendChild(cell);
        }
        mazeField.appendChild(row);
    };
};


function displayShortestWay(way) {
    for (var k = 0; k < way.length; k++) {
        var cell, cellId;
        cellId = way[k][0] + '-' + way[k][1];
        cell = document.getElementById(cellId);
        cell.style.background = '#009a00';
    }
};


function highlightUsed(x, y) {
    var cell, cellId;
    cellId = x + '-' + y;
    cell = document.getElementById(cellId);
    //setTimeout(cell.style.background = '#C0F0AE', 300);
    cell.style.background = '#C0F0AE'
};