let audioIn;
let micButton;
let canvasWidth = 600;
let canvasHeight = 70;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  micButton = createButton('Activate Microphone');
  micButton.position(10, 10);
  micButton.mousePressed(initAudio);
}

function draw() {
  background(0);
  
  if (audioIn && audioIn.enabled) {
    let level = audioIn.getLevel(); // Get the current audio level
    let lineHeight = map(level, 0, 1, canvasHeight, 0); // Map the audio level to the height of the canvas
    
    // Draw the line representing the volume
    stroke(255);
    strokeWeight(3);
    line(0, lineHeight, width, lineHeight);
  }
}

function initAudio() {
  audioIn = new p5.AudioIn();
  audioIn.start();
}
