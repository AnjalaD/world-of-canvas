uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

// https://iquilezles.org/articles/palettes/
// generate gradient palette
vec3 palettes(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy * 2. - iResolution) / iResolution.y - ((iMouse / iResolution.y - 0.5) * vec2(1., -1.));

    vec2 uv0 = uv;
    vec3 finalCol = vec3(0.0);

    for (float i = 0.; i < 4.0; i++){
        uv = uv * 2. - .5;

        float d = length(fract(uv) - 0.5);

        vec3  col = palettes(length(uv0) + iTime * .5);

        d = sin(d * 4. + iTime);
        d = abs(d);
        d = pow(0.01 / d, .8);
        
        finalCol += col * d;
    }

    gl_FragColor = vec4(finalCol, 1.0);
}

