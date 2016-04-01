'use strict';

function Maze() {
    var startX,
        startY, // start point
        destinationX,
        destinationY, //destination point
        size = 10,
        matr = [], // story data about ancestor cell and for marking used cells by bfs algorithm
        walls = [],
        shortestWay = [];

    function initField(size, walls) {
        var matr = new Array(size);
        for (i = 0; i < size; i++) {
            matr[i] = new Array(size);
            for (var j = 0; j < size; j++) {
                matr[i][j] = {};
                matr[i][j].used = false;
                matr[i][j].isWall = false;
            }
        }
        for (var i = 0; i < walls.length; i++) { // sign walls on matr ( can't go in this cell)
            matr[walls[i][0]][walls[i][1]].isWall = true;
        }
        return matr;
    }

    this.loadExample = function(options) {
        size = options.size;
        startX = options.startX;
        startY = options.startY; // start point
        destinationX = options.destinationX;
        destinationY = options.destinationY; //destination point
        walls = options.walls;
        mazeView.updateMazeInput(options);
        matr = initField(size, walls);
        mazeDisplay();
    };

    this.loadCustomMaze = function() {
        size = parseInt(document.getElementById("maze-size-input").value, 10);
        startX = parseInt(document.getElementById("maze-start-x-input").value, 10);
        startY = parseInt(document.getElementById("maze-start-y-input").value, 10);
        destinationX = parseInt(document.getElementById("maze-finish-x-input").value, 10);
        destinationY = parseInt(document.getElementById("maze-finish-y-input").value, 10);
        document.getElementById("searchBtn").style.display = 'block';
        matr = initField(size, walls);
        mazeDisplay();
    };

    function setWall(x, y) {
        walls.push([x, y]);
        matr[x][y].isWall = true;
        mazeView.highlightCell(x, y, 'wall');
    }

    function mazeDisplay() {
        mazeView.renderField(size, matr);
        mazeView.highlightCell(startX, startY, 'start');
        mazeView.highlightCell(destinationX, destinationY, 'finish');
        setListeners();
    }

    this.deleteAllWalls = function() {
        walls = [];
        matr = initField(size, walls);
        mazeView.renderField(size, matr);
        mazeView.highlightCell(startX, startY, 'start');
        mazeView.highlightCell(destinationX, destinationY, 'finish');
        setListeners();
    };

    function setListeners() {
        var current;
        var cells = document.querySelectorAll('#maze .row-with-cells div');
        for (var i = 0; i < cells.length; i++) {
            current = cells[i];
            current.addEventListener('click', function() {
                var x, y, coordinates;
                coordinates = this.id.split('-');
                x = coordinates[0];
                y = coordinates[1];
                setWall(x, y);
            })
        }
    }

    this.runSearch = function() {
        shortestWay = searchShortestPath();
        mazeView.displayShortestWay(shortestWay);
    };

    function searchShortestPath() {
        var q = []; //queue containing vertex in which algorithm can go on next step
        var to = {};
        var current = {'x': startX, 'y': startY, 'd': 0, 'used': true, 'parentX': -1, 'parentY': -1};
        q.push(current);
        matr[startX][startY] = current;

        while (q.length > 0) {
            var v = q.shift();
            matr[v.x][v.y].used = true;
            mazeView.highlightUsed(v.x, v.y);
            if (v.x == destinationX && v.y == destinationY) {
                break;
            }

            if(v.x + 1 < size && !matr[v.x + 1][v.y].isWall && !matr[v.x + 1][v.y].used ){
                to = {'x': v.x + 1, 'y': v.y, 'd': v.d + 1, 'used': true, 'parentX': v.x,'parentY': v.y};
                q.push(to);
                matr[v.x + 1][v.y ] = to;
            }
            if(v.x - 1 >= 0 && !matr[v.x - 1][v.y].isWall && !matr[v.x - 1][v.y].used ){
                to = {'x': v.x - 1, 'y': v.y, 'd': v.d + 1, 'used': true,  'parentX': v.x,'parentY': v.y};
                q.push(to);
                matr[v.x - 1][v.y] = to;
            }

            if(v.y + 1 < size && !matr[v.x ][v.y + 1].isWall && !matr[v.x ][v.y + 1].used ){
                to = {'x': v.x , 'y': v.y +1, 'd': v.d + 1, 'used': true,  'parentX': v.x,'parentY': v.y};
                q.push(to);
                matr[v.x ][v.y + 1] = to;
            }

            if(v.y - 1 >= 0 && !matr[v.x ][v.y - 1].isWall && !matr[v.x ][v.y - 1].used ){
                to = {'x': v.x , 'y': v.y -1, 'd': v.d + 1, 'used': true,  'parentX': v.x,'parentY': v.y};
                q.push(to);
                matr[v.x ][v.y - 1] = to;
            }
        } //while
        return restorePath();
    }

    function restorePath(){
        var path = [];
        if (!matr[destinationX][destinationY].used || matr[destinationX][destinationY].d === Infinity)
            return path;
        else { //restore and print the shortest path to destination cell
            var x1 = destinationX;
            var y1 = destinationY;
            var lenPath = 0;
            while (x1 !== -1 && y1 !== -1) {
                lenPath++;
                path.push([x1, y1]);
                var tmpX = matr[x1][y1].parentX;
                var tmpY = matr[x1][y1].parentY;
                x1 = tmpX;
                y1 = tmpY;
            }
            path.reverse();
            console.log("Length of shortest way is  ", lenPath - 1, "  steps.");
            console.log("(" + path.join(") ---> (") + ")");
            return path;
        }
    }
}