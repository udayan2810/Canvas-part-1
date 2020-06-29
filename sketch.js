var database;

var drawing = [];
var currentPath=[];
var isDrawing = false;
function setup(){
canvas = createCanvas(400,400);
canvas.mousePressed(startPath)

canvas.mouseReleased(endPath)

  database = firebase.database();
}
function startPath() {
    isDrawing=true;
  currentPath=[];  
  drawing.push(currentPath);
var drawingposition = database.ref('drawings');
drawingposition.set({
  'x':drawingposition.x+x,
  'y':drawingposition.y+y
})
}

function endPath() {
isDrawing=false;
}

function draw(){
background(0);  
readposition();
if (isDrawing) {
    var point ={
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

stroke(255);
strokeWeight(4);
noFill();
for (var i = 0;i<drawing.length;i++) {
    var path = drawing[i];
    beginShape();
for (var j = 0;j<path.length;j++) {
vertex(path[j].x,path[j].y)

    }
    endShape();
}

  }
  function readposition() {
    database.ref('drawing').on('value',(data)=>{
   drawingposition = data.val();
    })
  }

