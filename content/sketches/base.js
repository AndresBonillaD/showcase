
// variable declarations

let videos = [];
let currentVideoIndex = 0;


let lens_pg, kaleidoscope_pg;
let kaleidoscope, lens;



let segments;

let magnification;
let lens_radius;

let img;





function preload() {
  
  img = loadImage('/showcase/images/kuma.PNG');
  loadVideos(['/showcase/videos/Digital_Grapes.mp4', '/showcase/videos/Earth_Spin_In_Hands.mp4', '/showcase/videos/hypnotic19.mp4']);

  kaleidoscope = readShader('/showcase/shaders/kaleidoscope.frag', { varyings: Tree.texcoords2 });
  lens = readShader('/showcase/shaders/lens.frag', { varyings: Tree.texcoords2 });



}

function setup() {
  
  createCanvas(500, 500, WEBGL);

  kaleidoscope_pg = createGraphics(width, height, WEBGL);
  kaleidoscope_pg.colorMode(RGB, 1);
  kaleidoscope_pg.textureMode(NORMAL);
  kaleidoscope_pg.shader(kaleidoscope);
  lens_pg = createGraphics(width, height, WEBGL);
  lens_pg.colorMode(RGB, 1);
  lens_pg.textureMode(NORMAL);
  lens_pg.shader(lens);
  


 
}

function draw() {
  background(300);


  kaleidoscope_pg.background(125);
  kaleidoscope.setUniform('texture', angelus);
  kaleidoscope.setUniform('segments', segments.value());
  kaleidoscope_pg.emitResolution(kaleidoscope);
  let graphics = kaleidoscope_pg;
  graphics.quad(-1, 1, 1, 1, 1, -1, -1, -1);
  lens_pg.emitResolution(lens, 'iResolution');
  lens_pg.emitPointerPosition(lens, mouseX, mouseY, 'iMouse');
  lens.setUniform('texture', graphics);
  graphics = lens_pg;
  graphics.quad(-1, 1, 1, 1, 1, -1, -1, -1); 
  image(graphics, 0, 0);

  // Display the current video on the canvas
  //image(videos[currentVideoIndex], 0, 0, width, height);

}






// elements of control

function keyPressed() {
  // Change the current video when a key is pressed
  if (key === ' ') {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videos[currentVideoIndex].play();
  }
}


function loadVideos(videoPaths) {
  for (let i = 0; i < videoPaths.length; i++) {
    // Create a video element for each video file
    let video = createVideo(videoPaths[i]);
    video.hide(); 

    // Add the video to the videos array
    videos.push(video);
  }

  // Start playing the first video
  videos[currentVideoIndex].play();
}