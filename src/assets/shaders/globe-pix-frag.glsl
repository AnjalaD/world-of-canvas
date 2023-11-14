uniform sampler2D globeTexture;

varying vec2 vertexUv;
varying vec3 vertexNormal;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1));
    
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    float fracX = 1. / 300.;
    float fracY = 1. / 150.;

    float x = vertexUv.x - mod(vertexUv.x, fracX);
    float uvX = x + (fracX / 2.);

    float y = vertexUv.y - mod(vertexUv.y, fracY);
    float uvY = y + (fracY / 2.);


    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vec2(uvX, uvY)).xyz, 1.0);
}