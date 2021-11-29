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