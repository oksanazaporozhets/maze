'use strict';

function initField(size, walls) {
    var matr = new Array(size); // story data about ancestor cell and for marking used cells by bfs algorithm
    for ( i = 0; i < size; i++) {
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

function searchShortestPath(matr, startX, startY, destinationX, destinationY, size) {
    var q = []; //queue containing vertex in which algorithm can go on next step
    var to = {};
    var current = {'x': startX, 'y': startY, 'd': 0, 'used': true, 'parentX': -1, 'parentY': -1};
    q.push(current);
    matr[startX][startY] = current;

    while (q.length > 0) {
        var v = q.shift();
        matr[v.x][v.y].used = true;
        //setInterval(highlightUsed(v.x, v.y), 50);
        highlightUsed(v.x, v.y);
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

    if (!matr[destinationX][destinationY].used || matr[destinationX][destinationY].d === Infinity)
        console.log("No solution!");
    else { //restore and print the shortest path to destination cell
        var path = [];
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
};