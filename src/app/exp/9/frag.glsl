uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;


void main() {
    // normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy * 2. - iResolution) / iResolution.y;

    vec3 col = vec3(1., 0., 0.);     

    float d = length(uv) - .5;
    d = sin(d * 10. + iTime);
    d = abs(d);
    d = 0.04 / d;

    gl_FragColor = vec4(col * d, 1.);
}