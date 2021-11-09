//adapted from Allison Parish's walk through here 
// https://creative-coding.decontextualize.com/changes-over-time/


// this is from me testing out why the backgrounds are keeping their history and drawing on top of each other! still haven't figured this out... 

let origC1, origC2, origN, origNewC, c1, c2, n, newc, myCanvas;

// This may go away when I use NeDB 
let prayerArray = [
  "I pray that I get a supporting and loving dog this year.", 
  "I pray that my grandma's flight goes well.",
  "I pray that I find a TV for cheap.",
  "I pray I find more time with my daughter.",
  "I want to travel more!",
  "I pray that my mom's travels don't make her knee pain worse and she has peace of mind.",
  "My son just started a job, and I pray that he continues to feel motivation and joy in it.",
  "I want to maintain my health for the rest of my life and stay out of the hospital.",
  "I want to go to sleep soon and stay asleep for a whole night!",
  "I'm praying for unity in my family."
]

// create global variables that allow me to make my random function move slower 
let timeLastUpdated = Date.now()
const TIME_BETWEEN_RANDOMIZATIONS = 1000; // milliseconds between new randoms

function setup() {
    let myCanvas = createCanvas(window.innerWidth,window.innerHeight);
  
    //Set the parent of the canvas to an exisitng html element's id value 
    myCanvas.parent("canvas-container");
    origC1 = color(255);
    origC2 = color(63, 191, 191);
    for(let y=0; y<height; y++){
      origN = map(y,0,height,0,1);
      origNewC = lerpColor(origC1,origC2,origN);
      stroke(origNewC);
      line(0,y,width, y);
    }
  }


// Because our for loop, looping through backgrounds starts at 0 (button 1) The homepage is -1 and can be drawn like this 

function draw() {
    colorMode(HSB, 100);
    // Home page dots moving sketch
    if (pageNumber == -1) {
      // *** TO-DO: How to make the path that the circles follow fade as the sketch continues? 
      for (let i = 0; i < 10; i++) {
        fill(frameCount % 255);
        ellipse(
          (window.innerWidth/2)+(sin(frameCount/(i+15))*(window.innerWidth/8)),
          210+(i*50),
          60,
          60);
        }
      }
  
    if (pageNumber == 2) {
      colorMode(RGB);
  
      let arrayLength = prayerArray.length;
      let randomPrayer = (Math.floor(random(0,arrayLength)));
      
      // in the p5 code, background is in set up 
      textSize(24);
      noStroke();
      fill(random(80),random(80),random(200), 70);
      if (Date.now() - timeLastUpdated > TIME_BETWEEN_RANDOMIZATIONS) {
        text(prayerArray[randomPrayer], random(window.innerWidth)-300, random(window.innerHeight));
      timeLastUpdated = Date.now();
      }
    }
  }

  function mouseReleased() {
    drawFlower(random(50))
      //Grab mouse position
    let mousePos = { x: mouseX, y: mouseY };
    //Send mouse position object to the server
    socket.emit('position', mousePos);
    console.log(mousePos);
   }

   function drawFlower(size) {
     push();
      fill("yellow")
      socket.on('coordinates', function(position) {
        ellipse(position.x, position.y, 30);
        translate (position.x,position.y);
        fill(random(180,260), random(20,60), 100, .5);
        for (let i = 0; i < 10; i ++) {
          ellipse(0, 30, 20, size);
          rotate(PI/5);
        }
    })  
    pop();
  }