(async function () {
  const [vsSource, fsSource] = await Promise.all([
    fetch("index.vert").then((res) => res.text()),
    fetch("index.frag").then((res) => res.text()),
  ]);

  const image = new Image();
  image.src = "/assets/touxiang.JPG";
  image.onload = function () {
    const aka = new WebGL(document.querySelector("canvas"));
    const { gl } = aka;

    aka
      .init(vsSource, fsSource)
      .loadBuffer(
        new Float32Array([
          1.0, 1.0, 1, 1, -1.0, 1.0, 0, 1, -1.0, -1.0, 0, 0, -1.0, -1.0, 0, 0,
          1.0, -1.0, 1, 0, 1.0, 1.0, 1, 1,
        ])
      )
      .setAttrib("aPosition", 2, gl.FLOAT, false, 16, 0)
      .setAttrib("aUV", 2, gl.FLOAT, false, 16, 8)
      .loadTexture(image)
      .setUniform("uTexture", "uniform1i", 0);

    let value = 0.0;
    function draw() {
      const uniform2 = gl.getUniformLocation(aka.program, "uVar");
      if (value <= 1.0) {
        gl.uniform1f(uniform2, (value += 0.01));
      } else {
        value = -1.0;
        gl.uniform1f(uniform2, value);
      }

      aka.draw(aka.gl.TRIANGLES, 6);

      requestAnimationFrame(draw);
    }
    draw();
  };
})();
