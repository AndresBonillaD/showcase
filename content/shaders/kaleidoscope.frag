precision mediump float;

uniform sampler2D texture;
uniform float segments;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// window resolution
uniform vec2 u_resolution;

void main() {
  // remap texcoords2 from [0.0, 0.0] to [-1.0, 1.0] ∈ R
  vec2 coord = 2.0 * texcoords2 - 1.0;
  // same as previous line
  //vec2 st = gl_FragCoord.xy/u_resolution;
  //vec2 coord = 2.0 * st - 1.0;
  float r = length(coord);
  float theta = atan(coord.y, abs(coord.x));
  theta *= segments;
  coord = vec2(r * cos(theta), r * sin(theta));
  // remap coord back to [0.0, 1.0] ∈ R
  coord = (coord + 1.0) / 2.0;
  gl_FragColor = texture2D(texture, coord);
}