let angle = 0; // Start angle
let radius = 0; // Start radius

function setup() {
  createCanvas(500, 500);

}

function draw() {
  stroke('salmon');
  strokeWeight(5);
  
  // Center of the canvas
  let cx = width / 2;
  let cy = height / 2;


  // Convert the current angle to radians
  let radian = radians(angle);

  // Calculate x and y based on polar coordinates
  let x = cx + radius * cos(radian);
  let y = cy + radius * sin(radian);

  // Draw the point
  rect(x, y,70);
  
  // Increment the angle and radius to create the spiral effect
  angle += 7; // Adjust the speed of rotation
  radius += 0.5; // Adjust the rate of spiral expansion
}
