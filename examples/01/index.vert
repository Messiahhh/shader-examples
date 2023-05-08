precision mediump float;

attribute vec2 aPosition;
attribute vec2 aUV;

varying vec2 vUV;
varying vec2 vPos;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vUV = aUV;
    vPos = aPosition;
}