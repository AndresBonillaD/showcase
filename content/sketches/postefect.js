let pg_1, shader_1;
let pg_2, shader_2;

function preload() {
  shader_1 = loadShader('effect_1.vert', 'effect_1.frag');
  shader_2 = loadShader('effect_2.vert', 'effect_2.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  pg_1 = createGraphics(width, height, WEBGL);
  pg_1.noStroke();
  
  pg_2 = createGraphics(width, height, WEBGL);
  pg_2.noStroke();
  
  shader_1.setUniform('resolution', [width, height]);
  shader_2.setUniform('resolution', [width, height]);
}

function draw() {
  // Render onto pg_1 using shader_1
  pg_1.shader(shader_1);
  shader_1.setUniform('time', millis() / 1000); // Pass any additional uniforms
  
  pg_1.rect(-width / 2, -height / 2, width, height);
  
  // Render onto pg_2 using shader_2
  pg_2.shader(shader_2);
  shader_2.setUniform('time', millis() / 1000); // Pass any additional uniforms
  shader_2.setUniform('texture', pg_1); // Use pg_1 as a texture
  
  pg_2.rect(-width / 2, -height / 2, width, height);
  
  // Display pg_2 on the canvas
  image(pg_2, -width / 2, -height / 2, width, height);
}
