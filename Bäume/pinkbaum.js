var angle;
var axiom = "X";
var sentence = axiom;
var len = 150;

var rules = [];
rules[0] = {
  a: "X",
  b: "F-X[FX]-FX-L[+X][-X]LX"
};
rules[1] = {
  a: "F",
  b: "FF"
};

function generate() {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current == "F") {
      stroke(255, 100);
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "L") {
      stroke(255, 105, 180); // Pink color for leaves
      point(0, 0, 5, 5);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES); // Use degrees for angle measurements
  angle = 25.7; // Set angle to 25.7 degrees
  background(51);
  createP(axiom);
  turtle();
  var button = createButton("generate");
  button.mousePressed(generate);
}
