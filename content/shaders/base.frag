// p5.js fragment shader

// Uniforms
uniform sampler2D uTexture;

// Varying variables
varying vec2 vTexCoord;

void main() {
  // Sample the texture
  vec4 texColor = texture2D(uTexture, vTexCoord);

  // Output the color
  gl_FragColor = texColor;
}
