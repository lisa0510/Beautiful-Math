let x, y; // the current position of the turtle
let currentangle = 0; // which way the turtle is pointing
let step = 10; // how much the turtle moves with each 'F'
let angle = 50; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'FX'; // "axiom" or start of the string
let numloops = 5; // how many iterations to pre-compute
let therules = []; // array for rules
therules[0] = ['X', 'FY']; // first rule
therules[1] = ['Y', '-FX+Y-Y']; // second rule

let whereinstring = 0; // where in the L-system are we?
let colors = []; // array to store random colors

function setup() {
  createCanvas(900, 700);
  background('black');

  // start the x and y position at lower-left corner
  x = 300;
  y = height - 400;

  // COMPUTE THE L-SYSTEM
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }

  // Generate random colors for each iteration
  for (let i = 0; i < thestring.length; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
  }
}

function draw() {

  // draw the current character in the string:
  drawIt(thestring[whereinstring]);

  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;
  if (whereinstring > thestring.length - 1) whereinstring = 0;

}

// interpret an L-system
function lindenmayer(s) {
  let outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // by default, no match
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0]) {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring += s[i];
  }

  return outputstring; // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(k) {

  if (k == 'F') { // draw forward
    // polar to cartesian based on step and currentangle:
    let x1 = x + step * cos(radians(currentangle));
    let y1 = y + step * sin(radians(currentangle));
    stroke(colors[whereinstring]); // Use color from the colors array
    line(x, y, x1, y1); // connect the old and the new

    // update the turtle's position:
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // turn left
  } else if (k == '-') {
    currentangle -= angle; // turn right
  }
}