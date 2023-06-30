'use strict';


// p5 graphics buffer objects and their shaders
let lens_pg, kaleidoscope_pg;
let kaleidoscope, lens;



let segments;

let magnification;
let lens_radius;

let angelus;

function preload() {
  kaleidoscope = readShader('/showcase/shaders/kaleidoscope.frag', { varyings: Tree.texcoords2 });
  angelus = loadImage('/showcase/images/kuma.PNG');
  lens = readShader('/showcase/shaders/lens.frag', { varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 600);
  kaleidoscope_pg = createGraphics(width, height, WEBGL);
  kaleidoscope_pg.colorMode(RGB, 1);
  kaleidoscope_pg.textureMode(NORMAL);
  kaleidoscope_pg.shader(kaleidoscope);
  lens_pg = createGraphics(width, height, WEBGL);
  lens_pg.colorMode(RGB, 1);
  lens_pg.textureMode(NORMAL);
  lens_pg.shader(lens);
  magnification = createSlider(0.1, 9, 3, 0.1);
  magnification.position(width - 120, 10);
  magnification.style('width', '80px');
  magnification.input(() => { lens.setUniform('magnification', magnification.value()) });
  lens.setUniform('magnification', magnification.value());
  lens_radius = createSlider(0, 500, 150, 1);
  lens_radius.position(width - 120, 35);
  lens_radius.style('width', '80px');
  lens_radius.input(() => { lens.setUniform('lens_radius', lens_radius.value()) });
  lens.setUniform('lens_radius', lens_radius.value());
  segments = createSlider(1, 20, 1, 1);
  segments.position(10, 10);
}

function draw() {
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
}