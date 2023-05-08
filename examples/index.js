(async function () {
  const [vsSource, fsSource] = await Promise.all([
    fetch("index.vert").then((res) => res.text()),
    fetch("./01/index.frag").then((res) => res.text()), // 切换fs
  ]);

  const [banana, xeno] = await Promise.all([
    loadImage("/assets/banana.jpg"),
    loadImage("/assets/noise.png"),
  ]);
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
    .loadTexture(banana)
    .setUniform("uTexture1", "uniform1i", 0)
    .loadTexture(xeno)
    .setUniform("uTexture2", "uniform1i", 1);

  let value = 0.0;
  let reverse = false;
  draw();

  const gui = new dat.GUI();
  gui
    .add(
      {
        value: 0,
      },
      "value",
      0,
      1,
      0.01
    )
    .onChange((newValue) => {
      value = newValue
    });

  function draw() {
    const uniform2 = gl.getUniformLocation(aka.program, "uVar");
    gl.uniform1f(uniform2, reverse ? (value -= 0.01) : (value += 0.01));

    if (value >= 1) {
      reverse = true;
    }

    if (value <= 0) {
      reverse = false
    }
    
    aka.draw(aka.gl.TRIANGLES, 6);

    requestAnimationFrame(draw);
  }
})();

function loadImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = path;
    image.onload = function () {
      resolve(image);
    };
  });
}
