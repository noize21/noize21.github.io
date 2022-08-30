let cellsize;
let columns;
let rows;
let board;
let next;
var selected_cell = new Array(2);

function setup() {
	//disable scrollbar
	document.body.style.overflow = 'hidden';

	createCanvas(screen.width, screen.height);
	//create empty board with number of cells based on how many fit on screen with given pixel dimension (cellsize)
	cellsize = 20;
	createEmptyBoard(cellsize);

	//placePatternOnBoard(42,16,Patterns.pulsar);

	frameRate(20);

  button = createButton('insert Glider');
  button.position(0, 0);
  button.mousePressed(insertGlider);
  
  button = createButton('insert Spaceship');
  button.position(100, 0);
  button.mousePressed(insertSpaceship);

  button = createButton('insert Gosperglidergun');
  button.position(390, 0);
  button.mousePressed(insertGosperglidergun);
  
  button = createButton('insert Heavyspaceship');
  button.position(225, 0);
  button.mousePressed(insertHSS);
  
}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if(i == selected_cell[0] && j == selected_cell[1]) fill(0, 255, 0);
      else if ((board[i][j] == 1)) fill(220);
      else fill(0);
      stroke(50);
      rect(i * cellsize, j * cellsize, cellsize, cellsize);
    }
  }

}

function placePatternOnBoard(x, y, matrix, invertX=false, invertY=false){
  if(x==undefined){
    alert("select a cell first!");
  } else {
    for(let i=0; i<matrix.length; i++){
      for(let j=0;j<matrix[0].length;j++){
        if(invertX==true){
          board[(matrix[0].length-j)+x][i+y] = matrix[i][j];
        } else {
          board[j+x][i+y] = matrix[i][j];
        }
      }
    }
  }
}

function createEmptyBoard(size){
  // Calculate columns and rows
  columns = floor(width / size);
  rows = floor(height / size);

  // Wacky way to make a 2D array in JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  fillBoardBlank();
}

//get cell at mouse position on click
function mousePressed() {
  if(mouseY>40 && mouseX>20){
    selected_cell[0] = Math.floor(mouseX/cellsize);
    selected_cell[1] = Math.floor(mouseY/cellsize);
  }
}

// Fill board randomly
function fillBoardRandom() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// fill board with 0's
function fillBoardBlank() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

function insertGlider(){
  placePatternOnBoard(selected_cell[0], selected_cell[1], Patterns.glider);
}

function insertSpaceship(){
  placePatternOnBoard(selected_cell[0], selected_cell[1], Patterns.spaceship);
}

function insertGosperglidergun(){
  placePatternOnBoard(selected_cell[0], selected_cell[1], Patterns.gosperglidergun);
}

function insertHSS(){
    placePatternOnBoard(selected_cell[0], selected_cell[1], Patterns.hwss, true, false);
}