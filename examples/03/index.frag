// a图变b图

precision mediump float;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float uVar;

varying vec2 vUV;
varying vec2 vPos;

void main() {
    vec4 color1 = texture2D(uTexture1, vUV);
    vec4 color2 = texture2D(uTexture2, vUV);
    

    gl_FragColor = vec4(mix(color1.rgb, color2.rgb, uVar), 1.);
}

