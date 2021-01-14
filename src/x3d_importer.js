import raw_object from './model/cube.x3d'

export default class ModelImporterX3D {
    constructor() {
        // values as read in from OBJ file
        this.vertVals = []
        this.stVals = []
        this.normVals = []

        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []

        this.parseX3D();

        console.log("X3D")
        console.log(this.vertVals)
        console.log(this.stVals)
        console.log(this.normVals)
        console.log(this.triangleVerts)
        console.log(this.textureCoords)
        console.log(this.normals)
    }

    parseX3D() {
        /*let inputFile = raw_object; //fs.readFileSync('./model/Rock_Medium_SPR.fbx', 'utf8')
        let result = FBX.parse(inputFile);
        console.log(result);*/

        let parser = new DOMParser();
        let parsedXml = parser.parseFromString(raw_object,"text/xml");
        console.log("console.log(parsedXml);");
        console.log(parsedXml);

        let base = parsedXml.getElementsByTagName('Transform').item(0).getElementsByTagName("Transform")
            .item(0).getElementsByTagName("Group").item(0).getElementsByTagName("Shape").item(0)
            .getElementsByTagName("IndexedFaceSet").item(0);

        this.triangleVerts = base.getElementsByTagName("Coordinate").item(0).getAttribute("point").split(" ") // 24
        this.textureCoords = base.getElementsByTagName("TextureCoordinate").item(0).getAttribute("point").split(" ") // 72


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
