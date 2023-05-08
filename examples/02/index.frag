// 类九宫格
precision mediump float;

uniform sampler2D uTexture;
uniform float uVar;

varying vec2 vUV;
varying vec2 vPos;

void main() {
    vec2 uv = vUV;
    if(uv.x <= 2.0 / 7.0) {
        uv.x = uv.x * 3.5;
    } else if(uv.x <= 4.0 / 7.0) {
        uv.x = (uv.x - 2.0 / 7.0) * 3.5;
    } else if(uv.x <= 6.0 / 7.0) {
        uv.x = (uv.x - 4.0 / 7.0) * 3.5;
    } else {
        uv.x = (uv.x - 6.0 / 7.0) * 3.5;
    }

    if(uv.y <= 2.0 / 7.0) {
        uv.y = uv.y * 3.5;
    } else if(uv.y <= 4.0 / 7.0) {
        uv.y = (uv.y - 2.0 / 7.0) * 3.5;
    } else if(uv.y <= 6.0 / 7.0) {
        uv.y = (uv.y - 4.0 / 7.0) * 3.5;
    } else {
        uv.y = (uv.y - 6.0 / 7.0) * 3.5;
    }

    // gl_FragColor = texture2D(uTexture, uv);

    vec4 sample_color = texture2D(uTexture, uv);
    if(vPos.x > (uVar * 2.) - 1.0) {
        gl_FragColor = vec4(sample_color.xyz, 0.9);
    } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
    }
}