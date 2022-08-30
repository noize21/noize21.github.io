function setup() {
  createCanvas(screen.width, getCustomHeight());
}

function draw() {
  //background(200);
   if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }

  var xscale = 1
  if(mouseX<screen.width/2){
    xscale = 2*mouseX/screen.width
  } else if(mouseX>screen.width/2){
    xscale = 2*(screen.width-mouseX)/screen.width
  }

  var yscale = 1
  var customheight = getCustomHeight()
  if(mouseY<customheight/2){
    yscale = 2*mouseY/customheight
  } else if(mouseY>customheight/2){
    yscale = 2*(customheight-mouseY)/customheight
  }
  ellipse(mouseX, mouseY, 240*xscale, 240*yscale);
}

function getCustomHeight(){
  return screen.height*0.85;
}