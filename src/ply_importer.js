import raw_object from './model/cube.ply'

export default class ModelImporterPLY {
    constructor() {
        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []

        this.parsePLY()

        /*console.log("PLY")
        console.log(this.triangleVerts)
        console.log(this.textureCoords)
        console.log(this.normals)*/
    }

    parsePLY() {
        var lines = raw_object.split("\n")
        var noVertex
        var content
        var i;
        for(i = 0; i < lines.length; i++){
            if(lines[i].includes("end_header")){
                i++;
                break;
            }
            content = lines[i].split(" ")
            if(content[0].includes("element") && content[1].includes("vertex")){
                noVertex = parseInt(content[2])
            }
        }
        var limitRight = i + noVertex
        for(i; i < limitRight; i++){
            content = lines[i].split(" ")
            this.triangleVerts.push(parseFloat(content[0]))
            this.triangleVerts.push(parseFloat(content[1]))
            this.triangleVerts.push(parseFloat(content[2]))
            this.normals.push(parseFloat(content[3]))
            this.normals.push(parseFloat(content[4]))
            this.normals.push(parseFloat(content[5]))
            this.textureCoords.push(parseFloat(content[6]))
            this.textureCoords.push(parseFloat(content[7]))
        }
    }

    getNumVertices() {
        return this.triangleVerts.length / 3
    }
}
