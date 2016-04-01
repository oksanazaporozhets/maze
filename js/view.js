'use strict';
var mazeView = {
    updateMazeInput: function(options){
        document.getElementById("maze-size-input").value = options.size;
        document.getElementById("maze-start-x-input").value = options.startX;
        document.getElementById("maze-start-y-input").value = options.startY;
        document.getElementById("maze-finish-x-input").value = options.destinationX;
        document.getElementById("maze-finish-y-input").value = options.destinationY;
        document.getElementById("searchBtn").style.display = 'block';
        document.getElementById('way-lenght-label').innerHTML = '';
    },

    highlightCell: function(x, y, cls) {
        var cell, cellId;
        cellId = x + '-' + y;
        cell = document.getElementById(cellId);
        cell.setAttribute('class', cls);
    },

    renderField: function (size,  matr) {
        document.getElementById('way-lenght-label').innerHTML = '';
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
                cell.id = i + '-' + j;
                row.appendChild(cell);
            }
            mazeField.appendChild(row);
        }
    },

    displayShortestWay: function(way) {
        if(!way){
            document.getElementById('way-lenght-label').innerHTML = '';
            alert("No way from start to finish!");
            return;
        }
        for (var k = 0; k < way.length; k++) {
            var cell, cellId;
            cellId = way[k][0] + '-' + way[k][1];
            cell = document.getElementById(cellId);
            cell.style.background = '#009a00';
        }
        var stepLabel = document.getElementById('way-lenght-label');
        stepLabel.innerHTML = "Shortest way consist of " + (way.length -1 ) + " steps."
    },

    highlightUsed: function(x, y) {
        var cell, cellId;
        cellId = x + '-' + y;
        cell = document.getElementById(cellId);
        cell.style.background = '#C0F0AE'
    }
};
