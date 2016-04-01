'use strict';

var maze = new Maze();

maze.testExample1 = {
    size : 15,
    startX : 0,
    startY : 0, // start point
    destinationX : 7,
    destinationY : 14, //destination point
    walls : [
        [1, 1], [1, 0], [2, 2], [2, 3], [7, 5], [7, 6], [7, 7],
        [7, 8], [7, 9], [7, 10], [5, 7], [6, 7], [8, 7], [6, 13], [7, 13],
        [5, 13], [4, 13], [3, 13], [2, 13], [1, 13], [0,13], [0, 14], [1, 10]
    ]
};

maze.testExample2 = {
    size : 5,
    startX : 1,
    startY : 1, // start point
    destinationX : 4,
    destinationY : 3, //destination point
    walls : [
        [1, 0], [1, 2], [2, 2], [2, 3], [4,1], [3,1]
    ]
};


document.getElementById('loadMaze1').addEventListener('click', function() {
    maze.loadExample(maze.testExample1);
});
document.getElementById('loadMaze2').addEventListener('click', function() {
    maze.loadExample(maze.testExample2);
});
document.getElementById('searchBtn').addEventListener('click', maze.runSearch);
document.getElementById('initiateMaze').addEventListener('click', maze.loadCustomMaze);
document.getElementById('clear-walls-btn').addEventListener('click', maze.deleteAllWalls);