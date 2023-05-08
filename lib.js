class WebGL {
  gl;
  program;
  vs;
  fs;
  buffer;

  constructor(el) {
    if (el instanceof HTMLCanvasElement) {
      this.gl = el.getContext("webgl");
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

      return this;
    } else {
      throw new Error("please pass canvas element");
    }
  }

  init(vsSource, fsSource) {
    const vs = (this.vs = this.gl.createShader(this.gl.VERTEX_SHADER));
    this.gl.shaderSource(vs, vsSource);
    this.gl.compileShader(vs);

    const fs = (this.fs = this.gl.createShader(this.gl.FRAGMENT_SHADER));
    this.gl.shaderSource(fs, fsSource);
    this.gl.compileShader(fs);

    const program = (this.program = this.gl.createProgram());
    this.gl.attachShader(program, vs);
    this.gl.attachShader(program, fs);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return this;
  }

  loadBuffer(typedArray) {
    const buffer = (this.buffer = this.gl.createBuffer());
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, typedArray, this.gl.STATIC_DRAW);

    return this;
  }

  loadTexture(image) {
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image
    );

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    return this;
  }

  setAttrib(name, size, type, normalized, stride, offset) {
    const location1 = this.gl.getAttribLocation(this.program, name);
    this.gl.vertexAttribPointer(
      location1,
      size,
      type,
      normalized,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(location1);

    return this;
  }

  setUniform(name, type, value) {
    const location = this.gl.getUniformLocation(this.program, name);
    this.gl[type](location, value)
  }

  draw(type, count) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(type, 0, count);
  }
}

