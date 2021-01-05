import Utils from './utils.js'
import ModelImporter from './importer.js'
import ModelImporterPLY from './ply_importer.js'
import ModelImporterSTL from './stl_importer.js'
import ModelImporterFBX from './fbx_importer.js'
import Camera from './camera.js'
import black_white_png from './model/black_white_fill.png'
import cheese_png from './model/cheese.png' 
import { mat4 } from 'gl-matrix'

main()

var gl
var renderingProgram

var VBO_vertex_position, VBO_texture_coordinates
var vertex_position_Loc, texture_coordinates_Loc

var myCamera
var myImporter
var myImporterPLY
var myImporterSTL
var myImporterFBX

var pMat, mvMat, mMat, vMat
var pMatLoc, mvMatLoc

var texture_Loc
var black_white_image
var cheese_image

function setupVertices() {

  // myImporter = new ModelImporter()
  // myImporter.parseOBJ()

  //myImporterPLY = new ModelImporterPLY();
  myImporterSTL = new ModelImporterSTL();
  myImporterFBX = new ModelImporterFBX();
  // myImporterPLY.parsePLY()


  VBO_vertex_position = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporterPLY.triangleVerts), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporterSTL.triangleVerts), gl.STATIC_DRAW)

  VBO_texture_coordinates = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates)
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporterPLY.textureCoords), gl.STATIC_DRAW)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myImporterSTL.textureCoords), gl.STATIC_DRAW)

}

function init() {
  renderingProgram = Utils.createShaderProgram(gl)

  vertex_position_Loc = gl.getAttribLocation(renderingProgram, 'pos')
  texture_coordinates_Loc = gl.getAttribLocation(renderingProgram, 'textureCoord')
  texture_coordinates_Loc = 1
  mvMatLoc = gl.getUniformLocation(renderingProgram, 'mv_matrix')
  pMatLoc = gl.getUniformLocation(renderingProgram, 'proj_matrix')

  gl.useProgram(renderingProgram)

  setupVertices()

  myCamera = new Camera()
  myCamera.setAspect(gl.canvas.clientWidth, gl.canvas.clientHeight)

  black_white_image = new Image()
  black_white_image.src = black_white_png
  cheese_image = new Image()
  cheese_image.src = cheese_png
  texture_Loc = gl.createTexture()
}

function display(currentTime) {
  currentTime *= 0.001 // în secunde
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.clear(gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  // matricea de perspectivă
  pMat = mat4.create()
  mat4.perspective(pMat, myCamera.fovy, myCamera.aspect, myCamera.zNear, myCamera.zFar)

  // matricea de view
  vMat = mat4.create()
  mat4.translate(vMat, vMat, myCamera.location)

  // matricea de model
  mMat = mat4.create()
  mat4.translate(mMat, mMat, [0, 0, 0])
  mat4.rotate(mMat, mMat, Utils.toRadians(30), [1, 1, 1]);

  // matricea de model-view
  mvMat = mat4.create()
  mat4.multiply(mvMat, vMat, mMat)

  // copiază matricile model-view, projection în variabilele uniforme corespunzătoare
  gl.uniformMatrix4fv(pMatLoc, false, pMat)
  gl.uniformMatrix4fv(mvMatLoc, false, mvMat)

  // transmite vârfurile piramidei
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_vertex_position)
  gl.enableVertexAttribArray(vertex_position_Loc)
  gl.vertexAttribPointer(vertex_position_Loc, 3, gl.FLOAT, false, 0, 0)

  // transmite coordonatele de textură
  gl.bindBuffer(gl.ARRAY_BUFFER, VBO_texture_coordinates)
  gl.enableVertexAttribArray(texture_coordinates_Loc)
  gl.vertexAttribPointer(texture_coordinates_Loc, 2, gl.FLOAT, false, 0, 0)

  // activează prima unitate de textură (texture unit 0)
  gl.activeTexture(gl.TEXTURE0 + 0)
  // preia punctul de legătură în variabila texture_Loc
  gl.bindTexture(gl.TEXTURE_2D, texture_Loc)
  // trimite imaginea
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cheese_image)
  gl.generateMipmap(gl.TEXTURE_2D)

  //gl.drawArrays(gl.TRIANGLES, 0, myImporterPLY.getNumVertices())
  gl.drawArrays(gl.TRIANGLES, 0, myImporterSTL.getNumVertices())
  requestAnimationFrame(display)
}

function main() {
  const canvas = document.querySelector('#glcanvas')

  gl = canvas.getContext('webgl2')

  if (!gl) {
    alert('Inițializare WebGL eșuată.')
    return
  }

  init()
  display()
}


