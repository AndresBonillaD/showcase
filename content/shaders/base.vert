// p5.js vertex shader

// Uniforms
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// Attributes
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Varying variables
varying vec2 vTexCoord;

void main() {
  // Set varying variables
  vTexCoord = aTexCoord;

  // Apply transformations
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
