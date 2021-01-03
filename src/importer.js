import raw_object from './model/cube.obj'

export default class ModelImporter {
    constructor() {
        // values as read in from OBJ file
        this.vertVals = []
        this.stVals = []
        this.normVals = []
        // values stored for later use as vertex attributes
        this.triangleVerts = []
        this.textureCoords = []
        this.normals = []

        this.parseOBJ()
        // for(var i = 0; i < this.numVertices; i++){
        //     console.log(this.triangleVerts[i * 3] + " " + 
        //     this.triangleVerts[i * 3 + 1] + " " + this.triangleVerts[i * 3 + 2] + " " + 
        //     this.normals[i * 3] + " " + this.normals[i * 3 + 1] + " " + 
        //     this.normals[i * 3 + 2] + " " + this.textureCoords[i * 2] + " " + this.textureCoords[i * 2 + 1])
        // }
        // console.log(this.triangleVerts)
        // console.log(this.textureCoords)
        // console.log(this.normals)
    }

    parseOBJ() {
        var lines = raw_object.split("\n")

        var i, content
        for (i = 0; i < lines.length; i++) {
            content = lines[i].split(" ")

            if (!content[0].localeCompare("v")) {
                this.vertVals.push(parseFloat(content[1]))
                this.vertVals.push(parseFloat(content[2]))
                this.vertVals.push(parseFloat(content[3]))
            }

            if (!content[0].localeCompare("vt")) {
                this.stVals.push(parseFloat(content[1]))
                this.stVals.push(parseFloat(content[2]))
            }

            if (!content[0].localeCompare("vn")) {
                this.normVals.push(parseFloat(content[1]))
                this.normVals.push(parseFloat(content[2]))
                this.normVals.push(parseFloat(content[3]))
            }

            if (!content[0].localeCompare("f")) {
                var j, oneCorner, v, t, n, vertRef, tcRef, normRef
                for (j = 1; j <= 3; j++) {
                    oneCorner = content[j].split("/")

                    v = parseInt(oneCorner[0])
                    t = parseInt(oneCorner[1])
                    n = parseInt(oneCorner[2])



                    vertRef = (v - 1) * 3
                    tcRef = (t - 1) * 2
                    normRef = (n - 1) * 3


                    // listă de vârfuri
                    this.triangleVerts.push(this.vertVals[vertRef])
                    this.triangleVerts.push(this.vertVals[vertRef + 1])
                    this.triangleVerts.push(this.vertVals[vertRef + 2])

                    // listă de texturi de coordonate
                    this.textureCoords.push(this.stVals[tcRef])
                    this.textureCoords.push(this.stVals[tcRef + 1])

                    // listă de normale
                    this.normals.push(this.normVals[normRef])
                    this.normals.push(this.normVals[normRef + 1])
                    this.normals.push(this.normVals[normRef + 2])
                }
            }
        }
        this.numVertices = this.triangleVerts.length / 3
    }

    getNumVertices() {
        return this.triangleVerts.length / 3
    }
}
