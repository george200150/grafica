import raw_object from './model/cube.stl'

export default class ModelImporterSTL {
    constructor() {
        // values as read in from OBJ file
        this.vertVals = []
        this.stVals = []
        this.normVals = []

        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []

        this.parseSTL();
    }

    parseSTL() {
        var lines = raw_object.split("\n")

        for (var i = 1; i < lines.length - 2; i = i+7) {
            this.parseNormal(lines[i])
            this.parseVertex(lines[i+2])
            this.parseVertex(lines[i+3])
            this.parseVertex(lines[i+4])
        }
        this.numVertices = this.triangleVerts.length / 3
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
