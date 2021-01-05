import raw_object from './model/cube.x3d'
import * as FBX from 'fbx-parser'
import * as fs from 'fs'

export default class ModelImporterFBX {
    constructor() {
        // values as read in from OBJ file
        this.vertVals = []
        this.stVals = []
        this.normVals = []

        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []

        this.parseFBX();
    }

    parseFBX() {
        /*let inputFile = raw_object; //fs.readFileSync('./model/Rock_Medium_SPR.fbx', 'utf8')
        let result = FBX.parse(inputFile);
        console.log(result);*/

        let parser = new DOMParser();
        let parsedXml = parser.parseFromString(raw_object,"text/xml");
        console.log(parsedXml);
        console.log(parsedXml.getElementsByTagName('Coordinates'));
        console.log(parsedXml.getElementsByTagName('TextureCoordinates'));


        console.log(parsedXml.getElementsByTagName('Transform'));

        // const X3DLoader = require('three-x3d-loader');
        // X3DLoader.x3dParser(THREE, parsedXml);

        // var FBXLoader = require('three-fbx-loader');
        // var loader = new FBXLoader();
        // loader.load('../src/model/cube.fbx', function (object3d) {
        //     console.log(object3d);
        // });



        /*var lines = raw_object.split("\n")

        for (var i = 1; i < lines.length - 2; i = i+7) {
            this.parseNormal(lines[i])
            this.parseVertex(lines[i+2])
            this.parseVertex(lines[i+3])
            this.parseVertex(lines[i+4])
        }
        this.numVertices = this.triangleVerts.length / 3*/
    }

    parseVertex(line){
        var content = line.split(' ');

        this.triangleVerts.push(content[1])
        this.triangleVerts.push(content[2])
        this.triangleVerts.push(content[3])

    }

    parseNormal(line){
        var content = line.split(' ');

        this.normals.push(content[2])
        this.normals.push(content[3])
        this.normals.push(content[4])
    }

    getNumVertices() {
        return this.triangleVerts.length / 3
    }
}
