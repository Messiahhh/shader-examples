// dissolve 简易溶解效果
precision mediump float;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float uVar;

varying vec2 vUV;
varying vec2 vPos;


float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
    vec4 color1 = texture2D(uTexture1, vUV);
    vec4 color2 = texture2D(uTexture2, vUV);
    vec4 color3 = vec4(vec3(random(vUV)), 1.);

    if (color2.r - uVar < 0.0) {
        discard;
    }

    gl_FragColor = color1;
}

