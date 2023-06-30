precision mediump float;

// texture is sent by the sketch
uniform sampler2D texture;
uniform vec2 iResolution;
uniform vec2 iMouse;

const float radius=1.0;
const float depth=radius/2.0;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

//const float magnification = 1.5;
uniform float magnification;
//const float lens_radius = 150;
uniform float lens_radius;
const float border_thickness = 0.01;

void main() {
  float pct = distance(gl_FragCoord.xy, iMouse);
  if (pct >= lens_radius) {
    gl_FragColor = texture2D(texture, texcoords2);
  }
  else {
    //gl_FragColor = vec4(0.0);
    // /*
    vec2 uv = texcoords2;
    //vec2 uv = gl_FragCoord.xy / iResolution.y;
    
    //at the beginning of the sketch, center the magnifying glass.
    //Thanks to FabriceNeyret2 for the suggestion
    vec2 mouse = iMouse.xy;
    if (mouse == vec2(0.0)) {
      mouse = iResolution.xy / 2.0;
    }
    
    //UV coordinates of mouse
    //vec2 mouse_uv = mouse / iResolution.y;
    vec2 mouse_uv = mouse / iResolution.xy;
    mouse_uv.y = 1.0-mouse_uv.y;
    gl_FragColor = texture2D(texture, mouse_uv + (uv - mouse_uv) / magnification);
    // */
  }
  /*
  //Convert to UV coordinates, accounting for aspect ratio
  vec2 uv = texcoords2;
  //vec2 uv = gl_FragCoord.xy / iResolution.y;
    
  //at the beginning of the sketch, center the magnifying glass.
  //Thanks to FabriceNeyret2 for the suggestion
  vec2 mouse = iMouse.xy;
  if (mouse == vec2(0.0)) {
    mouse = iResolution.xy / 2.0;
  }
    
  //UV coordinates of mouse
  //vec2 mouse_uv = mouse / iResolution.y;
  vec2 mouse_uv = mouse / iResolution.xy;
  mouse_uv.y = 1.0-mouse_uv.y;
    
  //Distance to mouse
  float mouse_dist = distance(uv, mouse_uv);
    
  //Draw the texture
  gl_FragColor = texture2D(texture, uv);
    
  //Draw the outline of the glass
  if (mouse_dist < lens_radius + border_thickness) {
    gl_FragColor = vec4(0.1, 0.1, 0.1, 1.0);
  }
    
  //Draw a zoomed-in version of the texture
  if (mouse_dist < lens_radius) {
    gl_FragColor = texture2D(texture, mouse_uv + (uv - mouse_uv) / magnification);
  }
  //*/
  /*
  vec2 uv = gl_FragCoord.xy/iResolution.xy;
  vec2 center = iMouse.xy/iResolution.xy;
  float ax = ((uv.x - center.x) * (uv.x - center.x)) / (0.2*0.2) + ((uv.y - center.y) * (uv.y - center.y)) / (0.2/ (  iResolution.x / iResolution.y )) ;
  float dx = 0.0 + (-depth/radius)*ax + (depth/(radius*radius))*ax*ax;
  float f =  (ax + dx );
  if (ax > radius) f = ax;
  vec2 magnifierArea = center + (uv-center)*f/ax;
  //gl_FragColor = vec4(texture2D(texture, vec2(1.0,-1.0) * magnifierArea).rgb, 1.0); 
  gl_FragColor = vec4(texture2D(texture, magnifierArea).rgb, 1.0);
  //*/
  /*
  vec2 uv = gl_FragCoord.xy/iResolution.xy;
  //vec2 uv = texcoords2;
  vec2 center = iMouse.xy/iResolution.xy;
  //center.y = 1.0 - center.y;
  float ax = ((uv.x-center.x)*(uv.x-center.x))/(0.2*0.2)+((uv.y-center.y)*(uv.y-center.y))/(0.2/(iResolution.x/iResolution.y));
  float dx = 0.0 + (-depth/radius)*ax + (depth/(radius*radius))*ax*ax;
  float f =  (ax + dx);
  if (ax > radius) {
    f = ax;
  }
  vec2 magnifierArea = center+(uv-center)*f/ax;
  gl_FragColor = vec4(texture2D(texture, magnifierArea).rgb, 1.0);
  //*/
}

/*
const float radius=2.;
const float depth=radius/2.;


// === main loop ===
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy/iResolution.xy;
  vec2 center = iMouse.xy/iResolution.xy;
  float ax = ((uv.x - center.x) * (uv.x - center.x)) / (0.2*0.2) + ((uv.y - center.y) * (uv.y - center.y)) / (0.2/ (  iResolution.x / iResolution.y )) ;
  float dx = 0.0 + (-depth/radius)*ax + (depth/(radius*radius))*ax*ax;
    float f =  (ax + dx );
  if (ax > radius) f = ax;
    vec2 magnifierArea = center + (uv-center)*f/ax;
    fragColor = vec4(texture( iChannel0, vec2(1,-1) * magnifierArea ).rgb, 1.);  
}

*/