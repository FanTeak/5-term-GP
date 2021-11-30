var coordinateCount = 20;
var lengthX = 15;
var lengthY = 15;
var startX = {num: 1, suf: ''};
var startY = {num: 1, suf: ''};

var canvas = document.getElementById("canvas-move");
/** @type {CanvasRenderingContext2D} */

var canvasData = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

function DrawGrid(){
    canvasData.setTransform(1, 0, 0, 1, 0, 0);
    canvasData.clearRect(0, 0, canvasWidth, canvasHeight);

    var linesX = Math.floor(canvasHeight / coordinateCount);
    var linesY = Math.floor(canvasWidth / coordinateCount);

    for (let index = 0; index <= linesX; index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;

        if (index == lengthX) {
            canvasData.strokeStyle = "#000000";
        }
        else{
            canvasData.strokeStyle = "#E0D6FF";
        }

        if(index == linesX){
            canvasData.moveTo(0, coordinateCount * index);
            canvasData.lineTo(canvasWidth, coordinateCount * index);
        }
        else{
            canvasData.moveTo(0, coordinateCount * index + 0.5);
            canvasData.lineTo(canvasWidth, coordinateCount * index + 0.5);
        }

        canvasData.stroke();
    }

    for (let index = 0; index <= linesY; index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;

        if(index == lengthY){
            canvasData.strokeStyle = "#000000";
        }
        else{
            canvasData.strokeStyle = "#E0D6FF";
        }

        if(index == linesY){
            canvasData.moveTo(coordinateCount * index, 0);
            canvasData.lineTo(coordinateCount * index, canvasHeight);
        }
        else{
            canvasData.moveTo(coordinateCount * index + 0.5, 0);
            canvasData.lineTo(coordinateCount * index + 0.5, canvasHeight);
        }
        canvasData.stroke();
    }

    canvasData.translate(lengthY * coordinateCount, lengthX * coordinateCount);

    for (let index = 1; index < (linesY - lengthY); index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;
        canvasData.strokeStyle = "#000000";
        
        canvasData.moveTo(coordinateCount * index + 0.5, -3);
        canvasData.lineTo(coordinateCount * index + 0.5, 3);
        canvasData.stroke();

        canvasData.font = '9px Arial';
        canvas.textAlign = 'start';

        canvasData.fillText(startX.num * index + startX.suf, coordinateCount * index - 2, 15);
    }

    for (let index = 1; index < lengthY; index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;
        canvasData.strokeStyle = "#000000";
        
        canvasData.moveTo(-coordinateCount * index + 0.5, -3);
        canvasData.lineTo(-coordinateCount * index + 0.5, 3);
        canvasData.stroke();

        canvasData.font = '9px Arial';
        canvasData.textAlign = 'end';

        canvasData.fillText(-startX.num * index + startX.suf, -coordinateCount * index + 3, 15);
    }

    for (let index = 1; index < (linesX - lengthX); index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;
        canvasData.strokeStyle = "#000000";

        canvasData.moveTo(-3, coordinateCount * index + 0.5);
        canvasData.lineTo(3, coordinateCount * index + 0.5);
        canvasData.stroke();

        canvasData.font = '9px Arial';
        canvasData.textAlign = 'start';
        canvasData.fillText(-startY.num * index + startY.suf, 8, coordinateCount * index + 3);
    }

    for (let index = 1; index < lengthX; index++) {
        canvasData.beginPath();
        canvasData.lineWidth = 1;
        canvasData.strokeStyle = "#000000";

        canvasData.moveTo(-3, -coordinateCount * index + 0.5);
        canvasData.lineTo(3, -coordinateCount * index + 0.5);
        canvasData.stroke();

        canvasData.font = '9px Arial';
        canvas.textAlign = 'start';
        canvasData.fillText(startY.num * index + startY.suf, 8, -coordinateCount * index + 3);
    }
}

DrawGrid();

var squarePoints = [[],[],[],[]];

function coordinatesDiagonal(){
    let diagonalX1 = parseFloat(document.getElementById('X1-square').value);
    let diagonalY1 = parseFloat(document.getElementById('Y1-square').value);
    let diagonalX2 = parseFloat(document.getElementById('X2-square').value);
    let diagonalY2 = parseFloat(document.getElementById('Y2-square').value);

    squarePoints[0][0] = diagonalX1;
    squarePoints[0][1] = diagonalY1;
    squarePoints[1][0] = diagonalX1;
    squarePoints[1][1] = diagonalY2;
    squarePoints[2][0] = diagonalX2;
    squarePoints[2][1] = diagonalY2;
    squarePoints[3][0] = diagonalX2;
    squarePoints[3][1] = diagonalY1;

    return squarePoints;
}

function DrawSquare(color){
    canvasData.beginPath();
    canvasData.moveTo(squarePoints[0][0] / startX.num * coordinateCount, -squarePoints[0][1] / startY.num * coordinateCount);
    for (let index = 1; index < squarePoints.length; index++) {
        canvasData.lineTo(squarePoints[index][0] / startX.num * coordinateCount, -squarePoints[index][1] / startY.num * coordinateCount);
    }
    canvasData.closePath();
    canvasData.strokeStyle = color;
    canvasData.stroke();
}

function MoveSquare() {
    let moveX = parseFloat(document.getElementById('X1-move').value);
    let moveY = parseFloat(document.getElementById('Y1-move').value);
    for (let index = 0; index < squarePoints.length; index++) {
        squarePoints[index][0] += moveX;
        squarePoints[index][1] += moveY;
    }
    return squarePoints;
}

function MoveSquareArray(squarePoints, moveX, moveY) {
    for (let index = 0; index < squarePoints.length; index++) {
        squarePoints[index][0] += moveX;
        squarePoints[index][1] += moveY;
    }
    return squarePoints;
}

function ScaleSquare() {
    let scaleX = parseFloat(document.getElementById('X1-scale').value);
    let scaleY = parseFloat(document.getElementById('Y1-scale').value);
    let scaleMatrix = [[scaleX, 0], [0, scaleY]];
    let moveX = squarePoints[0][0];
    let moveY = squarePoints[0][1];

    MoveSquareArray(squarePoints, -moveX, -moveY);
    squarePoints = MulMatrix(squarePoints, scaleMatrix);
    MoveSquareArray(squarePoints, moveX, moveY);

    return squarePoints;
}

function AngleSquare() {
    let angle = parseFloat(document.getElementById('X1-clock').value);
    let radians = angle * Math.PI / 180;
    var angleMatrix = [[Math.cos(radians), Math.sin(radians)], [-Math.sin(radians), Math.cos(radians)]];
    squarePoints = MulMatrix(squarePoints, angleMatrix);
}

function MulMatrix(matrix1, matrix2) {
    let result = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[i].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
        
    }
    return result;
}

document.querySelector('.input-enter').addEventListener('keyup', ()=>{
    DrawGrid();
    coordinatesDiagonal();
    MoveSquare();
    ScaleSquare();
    AngleSquare();
    DrawSquare('hotpink');
});

document.querySelector('.input-move').addEventListener('keyup', ()=>{
    DrawGrid();
    coordinatesDiagonal();
    MoveSquare();
    ScaleSquare();
    AngleSquare();
    DrawSquare('hotpink');
});

document.querySelector('.input-scale').addEventListener('keyup', ()=>{
    DrawGrid();
    coordinatesDiagonal();
    MoveSquare();
    ScaleSquare();
    AngleSquare();
    DrawSquare('hotpink');
});

document.querySelector('.input-angle').addEventListener('keyup', ()=>{
    DrawGrid();
    coordinatesDiagonal();
    MoveSquare();
    ScaleSquare();
    AngleSquare();
    DrawSquare('hotpink');
});

function RedrawSquare(){
    DrawGrid();
    coordinatesDiagonal();
    MoveSquare();
    ScaleSquare();
    AngleSquare();
    DrawSquare('hotpink');
}

RedrawSquare();

function Wheel(event) {
    if(event.originalEvent.wheelDelta / 120 > 0){
        coordinateCount = (coordinateCount + 3).between(1, 200) ? (coordinateCount + 3) : coordinateCount;
        lengthX = canvasWidth / coordinateCount / 2;
        lengthY = canvasHeight / coordinateCount / 2;
        startX.num = (startX.num - 2).between(1, 10, true) ? (startX.num - 2) : startX.num;
        startY.num = (startY.num - 2).between(1, 10, true) ? (startY.num - 2) : startY.num;
    }
    else{
        coordinateCount = (coordinateCount - 3).between(1, 200) ? (coordinateCount -3) : coordinateCount;
        lengthX = canvasWidth / coordinateCount / 2;
        lengthY = canvasHeight / coordinateCount / 2;
        startX.num = (startX.num + 2).between(1, 10, true) ? (startX.num + 2) : startX.num;
        startY.num = (startY.num + 2).between(1, 10, true) ? (startY.num + 2) : startY.num;
    }

    RedrawSquare();
    return false;
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('canvas-move').addEventListener('mousewheel', Wheel)
});

Number.prototype.between = function(a, b, checker) {
    var min = Math.min.apply(Math, [a, b]);
    var max = Math.max.apply(Math, [a, b]);
    return checker ? this >= min && this <= max : this > min && this < max;
}