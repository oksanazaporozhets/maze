'use strict';

var startX,startY, destinationX, destinationY ; //destination point
var walls = [];
var size, matr ;

document.getElementById('loadMaze1').addEventListener('click', loadTest1);
document.getElementById('searchBtn').addEventListener('click', runSearch );

function runSearch(){
    var shortestWay = searchShortestPath(matr, startX, startY, destinationX, destinationY, size);
    displayShortestWay(shortestWay);
};

function loadTest1(){
    startX = 0;
    startY = 0; // start point
    destinationX = 7;
    destinationY = 15; //destination point
    walls = [
        [1, 1],
        [1, 0],
        [2, 2],
        [2, 3],
        [7, 5],
        [7, 6],
        [7, 7],
        [7, 8],
        [7, 9],
        [7, 10],
        [5, 7],
        [6, 7],
        [8, 7],
        [6, 13],
        [7, 13],
        [5, 13], [4, 13], [3, 13], [2, 13], [1, 13], [0,13], [0, 14], [1, 10]
    ];
    size = 20;
    matr = initField(size, walls);
    renderField(startX, startY, destinationX, destinationY, size, matr);
}
